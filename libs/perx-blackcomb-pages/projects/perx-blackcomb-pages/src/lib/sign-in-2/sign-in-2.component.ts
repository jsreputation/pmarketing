import {
  AuthenticationService,
  NotificationService,
  Config,
  ITheme,
  ThemesService,
  ConfigService,
  IConfig,
  GeneralStaticDataService,
  ICountryCode
} from '@perxtech/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, Navigation } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { oc } from 'ts-optchain';

interface ISigninConfig {
  redirectAfterLogin: string;
}

@Component({
  selector: 'perx-blackcomb-pages-login',
  templateUrl: './sign-in-2.component.html',
  styleUrls: ['./sign-in-2.component.scss']
})
export class SignIn2Component implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public errorMessage: string | null;
  public preAuth: boolean;
  public failedAuth: boolean;
  private destroy$: Subject<void> = new Subject();
  public theme: Observable<ITheme>;
  public appConfig: IConfig<ISigninConfig>;
  public appAccessTokenFetched: boolean;
  private custId: string;
  public countryCodePrefix: string | undefined;
  public countryCode: string;
  public countriesList$: Observable<ICountryCode[]>;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private notificationService: NotificationService,
    private themesService: ThemesService,
    private config: Config,
    private configService: ConfigService,
    public translate: TranslateService,
    public generalStaticDataService: GeneralStaticDataService
  ) {
    this.preAuth = this.config.preAuth ? this.config.preAuth : false;
    const nav: Navigation | null = this.router.getCurrentNavigation();
    this.custId = oc(nav).extras.state.pi('');
  }

  public ngOnInit(): void {
    this.initForm();
    this.configService.readAppConfig<ISigninConfig>().subscribe((conf) => {
      this.appConfig = conf;
      this.countryCodePrefix = conf.countryCodePrefix;
    });
    this.countriesList$ = this.generalStaticDataService.getCountriesList([
      'Hong Kong',
      'Philippines',
      'Singapore'
    ]);
    const token = this.authService.getAppAccessToken();
    if (token) {
      this.appAccessTokenFetched = true;
      this.theme = this.themesService.getThemeSetting();
    } else {
      this.authService.getAppToken().subscribe(() => {
        this.appAccessTokenFetched = true;
        this.theme = this.themesService.getThemeSetting();
      }, (err) => {
        console.error(`Error${err}`);
      });
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public redirectAfterLogin(): void {
    this.router.navigateByUrl(this.authService.getInterruptedUrl() ? this.authService.getInterruptedUrl()
      : this.appConfig.custom && this.appConfig.custom.redirectAfterLogin as string || 'wallet');
  }

  public initForm(): void {
    this.loginForm = this.fb.group({
      customerID: [this.custId, Validators.required],
      password: ['', Validators.required]
    });
  }

  public onSubmit(): void {
    const customerIdField = this.loginForm.get('customerID');
    const username: string = customerIdField !== null &&
      customerIdField.value ? `${this.countryCodePrefix ? this.countryCodePrefix : this.countryCode.substring(1)}${customerIdField.value}` : '';
    const pwdField = this.loginForm.get('password');
    const password: string = pwdField ? pwdField.value : '';
    this.errorMessage = null;
    this.authService.login(username, password)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        () => {
          // set global userID var for GA tracking
          if (!((window as any).primaryIdentifier)) {
            (window as any).primaryIdentifier = username;
            this.authService.saveAnonymous(false);
          }
          this.redirectAfterLogin();
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 0) {
              this.notificationService.addPopup({
                title: 'We could not reach the server',
                text: 'Please try again soon'
              });
            } else if (err.status === 401) {
              [this.loginForm.controls.customerID, this.loginForm.controls.password]
                .forEach(c => c.setErrors({
                  invalid: true
                }));
              this.translate.get('INVALID_CREDENTIALS')
                .subscribe(t => this.errorMessage = t);
            } else {
              this.errorMessage = err.error || 'Invalid Credentials';
            }
          } else {
            this.errorMessage = err;
          }
        }
      );
  }

  public updateCoutryCode(value: string): void {
    this.countryCode = value.substring(1);
  }
}
