import {
  AuthenticationService,
  NotificationService,
  ITheme,
  ThemesService,
  ConfigService,
  IConfig,
  GeneralStaticDataService,
  ICountryCode
} from '@perxtech/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
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
  public failedAuth: boolean;
  public theme: Observable<ITheme>;
  public appConfig: IConfig<ISigninConfig>;
  public appAccessTokenFetched: boolean;
  public countryCodePrefix: string;
  public countriesList$: Observable<ICountryCode[]>;
  public loading: boolean = false;

  private custId: string = '';
  private destroy$: Subject<void> = new Subject();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private notificationService: NotificationService,
    private themesService: ThemesService,
    private configService: ConfigService,
    public translate: TranslateService,
    public generalStaticDataService: GeneralStaticDataService
  ) {
    const nav: Navigation | null = this.router.getCurrentNavigation();
    this.custId = oc(nav).extras.state.phoneNumber('');
    this.countryCodePrefix = oc(nav).extras.state.countryCode.code('');
  }

  public ngOnInit(): void {
    this.countriesList$ = this.route.data.pipe(
      map((dataObj) => dataObj.countryList),
      switchMap((countriesList) => this.generalStaticDataService.getCountriesList(countriesList)),
      takeUntil(this.destroy$)
    );
    this.configService.readAppConfig<ISigninConfig>()
      .pipe(takeUntil(this.destroy$))
      .subscribe((conf) => {
        this.appConfig = conf;
        if (conf.countryCodePrefix) {
          this.countryCodePrefix = conf.countryCodePrefix;
        }
        this.initForm();
      });
    // todo: make this a input
    const token = this.authService.getAppAccessToken();
    if (token) {
      this.appAccessTokenFetched = true;
      this.theme = this.themesService.getThemeSetting();
    } else {
      this.authService.getAppToken()
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          () => {
            this.appAccessTokenFetched = true;
            this.theme = this.themesService.getThemeSetting();
          },
          (err) => console.error(`Error${err}`)
        );
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public get identifier(): string {
    const customerIdField = this.loginForm.get('customerID');
    const countryCode = this.loginForm.get('countryCode');
    if (customerIdField && customerIdField.value && countryCode && countryCode.value) {
      return `${countryCode.value}${customerIdField.value}`;
    }
    return '';
  }

  public onSubmit(): void {
    if (!this.loginForm.valid) {
      return;
    }

    const username: string = this.identifier;
    const pwdField = this.loginForm.get('password');
    const password: string = pwdField ? pwdField.value : '';
    this.errorMessage = null;
    this.loading = true;
    this.authService.login(username, password)
      .pipe(takeUntil(this.destroy$))
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
          this.loading = false;
          if (err instanceof HttpErrorResponse) {
            if (err.status === 0) {
              this.translate.get(['LOGIN_PAGE.POPUP_TITLE', 'LOGIN_PAGE.POPUP.TXT'])
                .subscribe(res => {
                  this.notificationService.addPopup({
                    title: res['LOGIN_PAGE.POPUP_TITLE'],
                    text: res['LOGIN_PAGE.POPUP.TXT']
                  });
                });
            } else if (err.status === 401 || err.status === 403) {
              this.translate.get('LOGIN_PAGE.INVALID_CREDENTIALS')
                .subscribe(t => this.errorMessage = t);
            } else {
              this.translate.get('LOGIN_PAGE.INVALID_CREDENTIALS')
                .subscribe(t => this.errorMessage = err.error || t);
            }
          } else {
            this.errorMessage = err;
          }
        }
      );
  }

  private redirectAfterLogin(): void {
    this.router.navigateByUrl(
      this.authService.getInterruptedUrl() ?
        this.authService.getInterruptedUrl() :
        this.appConfig.custom && this.appConfig.custom.redirectAfterLogin as string || 'wallet'
    );
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      customerID: [this.custId, Validators.required],
      password: ['', Validators.required],
      countryCode: [this.countryCodePrefix]
    });
    if (!this.countryCodePrefix) {
      this.loginForm.controls.countryCode.setValidators([Validators.required]);
    }
  }
}
