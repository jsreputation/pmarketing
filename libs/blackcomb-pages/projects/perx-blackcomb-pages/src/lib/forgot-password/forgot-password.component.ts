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
  NotificationService
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
  private static PASSWORD_MIN_LENGTH: number = 3;
  public countriesList$: Observable<ICountryCode[]>;
  public countryCodePrefix: string | undefined;
  public loading: boolean = false;

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

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private generalStaticDataService: GeneralStaticDataService,
    private configService: ConfigService,
    private translate: TranslateService
  ) {
  }

  public get phoneNumber(): AbstractControl | null { return this.phoneStepForm.get('phoneNumber'); }
  public get countryCode(): AbstractControl | null { return this.phoneStepForm.get('countryCode'); }
  public get password(): AbstractControl | null { return this.newPasswordForm.get('newPassword'); }
  public get passwordConfirmation(): AbstractControl | null { return this.newPasswordForm.get('passwordConfirmation'); }

  public ngOnInit(): void {
    this.countriesList$ = this.route.data.pipe(
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
      if (conf.countryCodePrefix) {
        this.countryCodePrefix = conf.countryCodePrefix;
        this.phoneStepForm.controls.countryCode.patchValue(conf.countryCodePrefix);
      }
    });

    this.countriesList$.pipe(
      switchMap((countryList) => matchRouteCountry$(countryList)),
      filter(([phoneNumber, countryCode]) => phoneNumber !== undefined && countryCode !== undefined)
    ).subscribe(([phoneNumber, countryCode]) => this.phoneStepForm.patchValue({ countryCode, phoneNumber }));
  }

  public compareCtryFn(c1: ICountryCode, c2: ICountryCode): boolean {
    return c1 && c2 ? c1.code === c2.code : c1 === c2;
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
      const phone: string = `${stepPhoneFormCountryCode}${stepPhoneFormPhoneNumber}`.trim();
      this.identifier = `${phone.replace(/[^0-9]/g, '')}`;
      this.usersPhone = this.identifier.slice(-2);

      this.loading = true;
      this.authenticationService.forgotPassword(this.identifier)
        .pipe(tap(() => this.loading = false, () => this.loading = false))
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
    this.authenticationService.resetPassword({ phone: this.identifier, otp: this.otp, ...value })
      .pipe(
        mergeMap(() => this.authenticationService.login(this.identifier, value.newPassword)),
        tap(() => this.loading = false, () => this.loading = false)
      )
      .subscribe(() => this.router.navigate(['/']));
  }

  private handleError(err: any): void {
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