import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AuthenticationService,
  ConfigService,
  equalityValidator,
  GeneralStaticDataService,
  ICountryCode,
  LoyaltyService,
  NotificationService,
  ITheme,
  ThemesService,
  IConfig
} from '@perxtech/core';
import { Observable, Subject } from 'rxjs';
import { filter, map, mergeMap, switchMap, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'perx-blackcomb-pages-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  public currentStep: number = 1;
  public usersPhone: string;
  public loadingSubmit: boolean = false;
  public countriesList$: Observable<ICountryCode[]>;
  public countryCodePrefix: string | undefined;
  public loading: boolean = false;
  private static PASSWORD_MIN_LENGTH: number = 3;
  private validateMembership: boolean = false;

  public phoneStepForm: FormGroup = new FormGroup({
    phoneNumber: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[0-9]+$'),
      Validators.minLength(2),
      Validators.maxLength(10)]),
    countryCode: new FormControl(null, [Validators.required])
  });

  public newPasswordForm: FormGroup = new FormGroup({
    newPassword: new FormControl(null, [Validators.required, Validators.minLength(ForgotPasswordComponent.PASSWORD_MIN_LENGTH)]),
    passwordConfirmation: new FormControl(null, [Validators.required, Validators.minLength(ForgotPasswordComponent.PASSWORD_MIN_LENGTH)])
  }, { validators: [equalityValidator('newPassword', 'passwordConfirmation')] });

  private otp: string;
  public identifier: string;
  private destroy$: Subject<void> = new Subject<void>();
  public theme: Observable<ITheme>;
  public appConfig: IConfig<void>;

  constructor(
    protected authenticationService: AuthenticationService,
    protected router: Router,
    protected route: ActivatedRoute,
    protected notificationService: NotificationService,
    protected generalStaticDataService: GeneralStaticDataService,
    protected configService: ConfigService,
    protected translate: TranslateService,
    protected loyaltyService: LoyaltyService,
    protected themesService: ThemesService
  ) {
  }

  public get phoneNumber(): AbstractControl | null { return this.phoneStepForm.get('phoneNumber'); }
  public get countryCode(): AbstractControl | null { return this.phoneStepForm.get('countryCode'); }
  public get password(): AbstractControl | null { return this.newPasswordForm.get('newPassword'); }
  public get passwordConfirmation(): AbstractControl | null { return this.newPasswordForm.get('passwordConfirmation'); }

  public ngOnInit(): void {
    this.countriesList$ = this.route.data.pipe(
      tap((dataObj) => this.validateMembership = dataObj.validateMembership),
      map((dataObj) => dataObj.countryList),
      switchMap((countriesList) => this.generalStaticDataService.getCountriesList(countriesList)),
      takeUntil(this.destroy$)
    );

    const matchRouteCountry$ = (countryList: ICountryCode[]) => (() => this.route.queryParams.pipe(
      filter((params) => !!params.identifier),
      map((params) => params.identifier),
      map((identifier) => {
        const countryCode: ICountryCode | null = countryList.find(
          country => `${identifier}`.startsWith(country.code)
        ) || null;
        let phoneNumber: string | null = null;
        if (countryCode !== null) {
          phoneNumber = `${identifier}`.slice(countryCode.code.length);
          return [phoneNumber, countryCode.code];
        }
        return [undefined, undefined];
      }),
      takeUntil(this.destroy$)
    )
    )();

    this.configService.readAppConfig<void>().subscribe((conf) => {
      this.appConfig = conf;
      if (conf.countryCodePrefix) {
        this.countryCodePrefix = conf.countryCodePrefix;
        this.phoneStepForm.controls.countryCode.patchValue(conf.countryCodePrefix);
      }
    });

    this.countriesList$.pipe(
      switchMap((countryList) => matchRouteCountry$(countryList)),
      filter(([phoneNumber, countryCode]) => phoneNumber !== undefined && countryCode !== undefined)
    ).subscribe(([phoneNumber, countryCode]) => this.phoneStepForm.patchValue({ countryCode, phoneNumber }));

    this.theme = this.themesService.getThemeSetting();
  }

  public compareCtryFn(c1: ICountryCode, c2: ICountryCode): boolean {
    return c1 && c2 ? c1 === c2 : false;
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public phoneHandler(): void {
    if (this.phoneStepForm.valid) {
      // we use select countryCode object ^ using the response from countryList$
      const stepPhoneFormCountryCode: string = this.phoneStepForm.value.countryCode;
      const stepPhoneFormPhoneNumber = this.phoneStepForm.value.phoneNumber;
      // converting to Number will strip leading 0s
      let sanitizedId = '';
      const numberedId = Number(stepPhoneFormPhoneNumber);
      if (! isNaN(numberedId)) {
        sanitizedId = numberedId.toString();
      }
      const phone: string = `${stepPhoneFormCountryCode}${sanitizedId}`.trim();
      this.identifier = `${phone.replace(/[^0-9]/g, '')}`;
      this.usersPhone = this.identifier.slice(-2);

      this.loading = true;
      this.authenticationService.forgotPassword(this.identifier)
        .pipe(
          tap(() => this.loading = false, () => this.loading = false)
        )
        .subscribe(
          () => this.currentStep = 2,
          (err) => this.handleError(err)
        );
    }
  }

  public resend(): void {
    if (this.identifier) {
      this.loading = true;
      this.authenticationService.resendOTP(this.identifier)
        .pipe(tap(() => this.loading = false, () => this.loading = false))
        .subscribe(
          (res) => this.notificationService.addSnack(res.message),
          (err) => this.handleError(err)
        );
    }
  }

  public handlePin(otp: string): void {
    // need verify before go to currentStep 3
    this.authenticationService.verifyOTP(this.identifier, otp).subscribe(
      () => {
        this.currentStep = 3;
        this.otp = otp;
      },
      (err) => {
        this.notificationService.addSnack(err.error.message);
      }
    );
  }

  public changePassword(): void {
    if (this.newPasswordForm.invalid) {
      return;
    }
    const value = this.newPasswordForm.value;
    this.loading = true;
    const resetPassword$ = this.authenticationService.resetPassword({ phone: this.identifier, otp: this.otp, ...value })
      .pipe(
        mergeMap(() => this.authenticationService.login(this.identifier, value.newPassword)),
        tap(() => this.loading = false, () => this.loading = false)
      );
    if (this.validateMembership) {
      resetPassword$.pipe(
        switchMap(() =>
          this.loyaltyService.getLoyalty()
        )
      ).subscribe((loyalty) => {
        if (
          loyalty &&
          loyalty.membershipState &&
          loyalty.membershipState === 'active'
        ) {
          this.router.navigate(['/']);
        } else {
          this.loading = false;
          this.authenticationService.logout();
          this.notificationService.addPopup({
            title: 'Membership required',
            text: 'Please purchase a valid membership before logging in',
          });
        }
      });
    } else {
      resetPassword$.subscribe(() => this.router.navigate(['/']));
    }
  }

  public handleError(err: any): void {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 0) {
        this.translate.get('FORGET_PW_PAGE.SERVER_ERROR_TXT').subscribe(text =>
          this.notificationService.addSnack(text));
      } else if (err.status === 401) {
        this.translate.get('FORGET_PW_PAGE.MOBILE_INVALID_TXT').subscribe(text =>
          this.notificationService.addSnack(text));
      } else if (err.status === 404) {
        this.translate.get('FORGET_PW_PAGE.MOBILE_NOTFOUND_TXT').subscribe(text =>
          this.notificationService.addSnack(text));
      } else {
        this.notificationService.addSnack(err.error.message);
      }
    }
  }
}
