import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, equalityValidator, GeneralStaticDataService, ICountryCode, NotificationService } from '@perxtech/core';
import { Observable, Subject } from 'rxjs';
import { filter, map, mergeMap, switchMap, takeUntil } from 'rxjs/operators';

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

  public phoneStepForm: FormGroup = new FormGroup({
    phoneNumber: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[0-9]+$'),
      Validators.minLength(2),
      Validators.maxLength(10)]),
    countryCode: new FormControl(null, [])
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
    private generalStaticDataService: GeneralStaticDataService
  ) { }

  public get phoneNumber(): AbstractControl | null { return this.phoneStepForm.get('phoneNumber'); }
  public get password(): AbstractControl | null { return this.newPasswordForm.get('newPassword'); }
  public get passwordConfirmation(): AbstractControl | null { return this.newPasswordForm.get('passwordConfirmation'); }

  public ngOnInit(): void {
    this.countriesList$ = this.generalStaticDataService.getCountriesList([
      'Hong Kong',
      'Philippines',
      'Singapore'
    ]);

    const matchRouteCountry$ = (countryList) => (() => this.route.queryParams.pipe(
      filter((params) => !!params.identifier),
      map((params) => params.identifier),
      map((identifier) => {
        const countryCode: ICountryCode | null = countryList.find(
          country => `${identifier}`.startsWith(country.code)
        ) || null;
        let phoneNumber: string | null = null;
        if (countryCode !== null) {
          phoneNumber = `${identifier}`.slice(countryCode.code.length);
          return [phoneNumber, countryCode];
        }
        return [null, null];
      }),
      takeUntil(this.destroy$)
    )
    )();

    this.countriesList$.pipe(
      switchMap((countryList) => matchRouteCountry$(countryList))
    ).subscribe(([phoneNumber, countryCode]) => this.phoneStepForm.setValue({ countryCode, phoneNumber }));
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
      const stepPhoneFormCountryCode: ICountryCode = this.phoneStepForm.value.countryCode;
      const stepPhoneFormPhoneNumber = this.phoneStepForm.value.phoneNumber;
      const phone: string = `${stepPhoneFormCountryCode.code}${stepPhoneFormPhoneNumber}`.trim();
      this.identifier = `${phone.replace(/[^0-9]/g, '')}`;
      this.usersPhone = this.identifier.slice(-2);

      this.authenticationService.forgotPassword(this.identifier)
        .subscribe(
          () => this.currentStep = 2,
          (err) => this.handleError(err)
        );
    }
  }


  public resend(): void {
    if (this.identifier) {
      this.authenticationService.resendOTP(this.identifier).subscribe(
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
    this.authenticationService.resetPassword({ phone: this.identifier, otp: this.otp, ...value })
      .pipe(mergeMap(() => this.authenticationService.login(this.identifier, value.newPassword)))
      .subscribe(() => this.router.navigate(['/']));
  }

  private handleError(err: any): void {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 0) {
        this.notificationService.addSnack('We could not reach the server');
      } else if (err.status === 401) {
        this.notificationService.addSnack('Invalid mobile number.');
      } else {
        this.notificationService.addSnack(err.error.message);
      }
    }
  }
}
