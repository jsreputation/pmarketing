import { AuthenticationService, NotificationService, Config, ITheme, ThemesService, ConfigService, IConfig } from '@perx/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, Navigation } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { oc } from 'ts-optchain';

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
  private destroy$: Subject<any> = new Subject();
  public theme: Observable<ITheme>;
  public appConfig: IConfig;
  public appAccessTokenFetched: boolean;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private notificationService: NotificationService,
    private themesService: ThemesService,
    private config: Config,
    private configService: ConfigService,
    public translate: TranslateService
  ) {
    this.preAuth = this.config.preAuth ? this.config.preAuth : false;
  }

  public ngOnInit(): void {
    this.initForm();
    this.theme = this.themesService.getThemeSetting();
    this.configService.readAppConfig().subscribe((conf) => this.appConfig = conf);
    const token = this.authService.getAppAccessToken();
    if (token) {
      this.appAccessTokenFetched = true;
    } else {
      this.authService.getAppToken().subscribe(() => {
        this.appAccessTokenFetched = true;
      }, (err) => {
        console.error('Error' + err);
      });
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public redirectAfterLogin(): void {
    this.router.navigateByUrl(this.authService.getInterruptedUrl() ? this.authService.getInterruptedUrl()
      : this.appConfig && this.appConfig.redirectAfterLogin as string || 'home');
  }

  public initForm(): void {
    const nav: Navigation | null = this.router.getCurrentNavigation();
    const custId: string = oc(nav).extras.state.pi('');
    this.loginForm = this.fb.group({
      customerID: [custId, Validators.required],
      password: ['', Validators.required]
    });
  }

  public onSubmit(): void {
    const customerIdField = this.loginForm.get('customerID');
    const username: string = customerIdField !== null && customerIdField.value ? customerIdField.value : '';
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
                // tslint:disable-next-line: rxjs-no-nested-subscribe
                .subscribe(t => this.errorMessage = t);
            }
          } else {
            this.errorMessage = err;
          }
        }
      );
  }
}
