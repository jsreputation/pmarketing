import {
  AuthenticationService,
  ConfigService,
  GeneralStaticDataService,
  IConfig,
  ICountryCode,
  ITheme,
  LoginType,
  LoyaltyService,
  NotificationService,
  ThemesService
} from '@perxtech/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { oc } from 'ts-optchain';


interface ISigninConfig {
  redirectAfterLogin: string;
  loginMethod: LoginType;
}

@Component({
  selector: 'perx-blackcomb-pages-login',
  templateUrl: './sign-in-2.component.html',
  styleUrls: ['./sign-in-2.component.scss'],
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
  public loginMethod: LoginType;
  // @ts-ignore for using the enum within the template
  public loginTypes: typeof LoginType = LoginType;
  private validateMembership: boolean = false;
  private custId: string = '';
  private destroy$: Subject<void> = new Subject();
  public defaultSelectedCountry: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private notificationService: NotificationService,
    private loyaltyService: LoyaltyService,
    private themesService: ThemesService,
    private configService: ConfigService,
    public translate: TranslateService,
    public generalStaticDataService: GeneralStaticDataService,
  ) {
    const nav: Navigation | null = this.router.getCurrentNavigation();
    this.custId = oc(nav).extras.state.phoneNumber('');
    this.countryCodePrefix = oc(nav).extras.state.countryCode.code('');
  }

  public ngOnInit(): void {
    this.route.data.pipe(
      tap((dataObj) => {
        this.validateMembership = dataObj.validateMembership;
        this.defaultSelectedCountry = dataObj.defaultSelectedCountry;
      }),
      map((dataObj) => dataObj.countryList),
      switchMap((countriesList) =>
        this.countriesList$ = this.generalStaticDataService.getCountriesList(countriesList)
      ),
      takeUntil(this.destroy$),
      switchMap(() => this.configService.readAppConfig<ISigninConfig>()),
      takeUntil(this.destroy$),
    ).subscribe((conf) => {
      this.appConfig = conf;
      if (conf.countryCodePrefix) {
        this.countryCodePrefix = conf.countryCodePrefix;
      }
      if (conf.custom && conf.custom.loginMethod) {
        this.loginMethod = conf.custom.loginMethod;
      }
      this.initForm();
    });
    // todo: make this a input
    const token = this.authService.getAppAccessToken();
    if (token) {
      this.appAccessTokenFetched = true;
      this.theme = this.themesService.getThemeSetting();
    } else {
      this.authService
        .getAppToken()
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          () => {
            this.appAccessTokenFetched = true;
            this.theme = this.themesService.getThemeSetting();
          },
          (err) => console.error(`Error${err}`),
        );
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public get identifier(): string {
    const customerIdField = this.loginForm.get('customerID');
    let result = '';
    switch (this.loginMethod) {
      case LoginType.phone:
        const countryCode = this.loginForm.get('countryCode');
        if (
          countryCode &&
          countryCode.value
        ) {
          let sanitizedId = '';
          if (customerIdField &&
            customerIdField.value) {
            sanitizedId = customerIdField.value;
            // converting to Number will strip leading 0s
            const numberedId = Number(sanitizedId);
            if (! isNaN(numberedId)) {
              sanitizedId = numberedId.toString();
            }
          }
          result = sanitizedId ? `${countryCode.value}${sanitizedId}` : `${countryCode.value}`;
        }
        break;
      case LoginType.username:
      case LoginType.email:
        result = customerIdField && customerIdField.value ? customerIdField.value : '';
        break;
      default:
        result = '';
    }
    return result;
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
    this.authService
      .login(username, password)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          // set global userID var for GA tracking
          if (!(window as any).primaryIdentifier) {
            (window as any).primaryIdentifier = username;
            this.authService.saveAnonymous(false);
          }
          this.redirectAfterLogin();
        },
        (err) => {
          this.loading = false;
          if (err instanceof HttpErrorResponse) {
            if (err.status === 0) {
              this.translate.get(['LOGIN_PAGE.POPUP_TITLE', 'LOGIN_PAGE.POPUP_TXT'])
                .subscribe(res => {
                  this.notificationService.addPopup({
                    title: res['LOGIN_PAGE.POPUP_TITLE'],
                    text: res['LOGIN_PAGE.POPUP_TXT']
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
    if (this.validateMembership) {
      this.loyaltyService.getLoyalty().subscribe((loyalty) => {
        if (
          loyalty &&
          loyalty.membershipState &&
          loyalty.membershipState === 'active'
        ) {
          this.router.navigateByUrl(
            this.authService.getInterruptedUrl()
              ? this.authService.getInterruptedUrl()
              : (this.appConfig.custom &&
              (this.appConfig.custom.redirectAfterLogin as string)) ||
              'wallet',
          );
        } else {
          this.loading = false;
          this.authService.logout();
          this.notificationService.addPopup({
            title: 'Membership required',
            text: 'Please purchase a valid membership before logging in',
          });
        }
      });
    } else {
      this.router.navigateByUrl(
        this.authService.getInterruptedUrl()
          ? this.authService.getInterruptedUrl()
          : (this.appConfig.custom &&
          (this.appConfig.custom.redirectAfterLogin as string)) ||
          'wallet',
      );
    }
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      customerID: [this.custId, Validators.required],
      password: ['', Validators.required],
      countryCode: [this.countryCodePrefix]
    });
    if (!this.countryCodePrefix && this.loginMethod === LoginType.phone) {
      this.loginForm.controls.countryCode.setValidators([Validators.required]);
    }
    if (this.defaultSelectedCountry) {
      this.loginForm.controls.countryCode.setValue(this.defaultSelectedCountry);
    }
  }
}
