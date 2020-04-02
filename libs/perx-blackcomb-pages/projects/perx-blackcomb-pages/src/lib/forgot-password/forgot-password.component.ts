import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthenticationService, GeneralStaticDataService, ICountryCode, NotificationService} from '@perxtech/core';
import {Observable, Subject} from 'rxjs';
import {filter, mergeMap, takeUntil, map, switchMap} from 'rxjs/operators';


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
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[0-9]+$'),
      Validators.minLength(2),
      Validators.maxLength(10)]),
    countryCode: new FormControl(null, [])
  });

  public newPasswordForm: FormGroup = new FormGroup({
    newPassword: new FormControl(null, [Validators.required, Validators.minLength(ForgotPasswordComponent.PASSWORD_MIN_LENGTH)]),
    passwordConfirmation: new FormControl(null, [Validators.required, Validators.minLength(ForgotPasswordComponent.PASSWORD_MIN_LENGTH)])
  }, [ForgotPasswordComponent.equalityValidator('newPassword', 'passwordConfirmation')]);

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

  public get phone(): AbstractControl | null { return this.phoneStepForm.get('phone'); }
  public get password(): AbstractControl | null { return this.newPasswordForm.get('newPassword'); }
  public get passwordConfirmation(): AbstractControl | null { return this.newPasswordForm.get('passwordConfirmation'); }

  public ngOnInit(): void {
    this.countriesList$ = this.generalStaticDataService.getCountriesList([
      'Hong Kong',
      'Philippines',
      'Singapore'
    ]);

    const matchRouteCountry$ = (countryList) => (() => {
      return this.route.queryParams.pipe(
        filter((params) => !!params.identifier),
        map((params) => params.identifier),
        map((identifier) => {
          const countryCode: ICountryCode | null = countryList.find(
            country => `+${identifier}`.startsWith(country.phone)
          )  || null;
          let phone: string | null = null;
          if (countryCode !== null) {
            phone = `+${identifier}`.slice(countryCode.phone.length);
            return [phone, countryCode];
          }
          return [null, null];
        }),
        takeUntil(this.destroy$)
      )
    })();

    this.countriesList$.pipe(
      switchMap((countryList) => matchRouteCountry$(countryList))
    ).subscribe(([phone, countryCode]) => {
        this.phoneStepForm.setValue({ countryCode, phone });
     });
  }

  public compareCtryFn(c1: ICountryCode, c2: ICountryCode): boolean {
    return c1 && c2 ? c1.phone === c2.phone : c1 === c2;
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public phoneHandler(): void {
    if (this.phoneStepForm.invalid) {
      return;
    }
    // we use select countryCode object ^ using the response from countryList$
    const stepPhoneFormCountryCode: ICountryCode = this.phoneStepForm.value.countryCode;
    const stepPhoneFormPhoneNumber = this.phoneStepForm.value.phone;
    const phone: string = `${stepPhoneFormCountryCode.phone}${stepPhoneFormPhoneNumber}`.trim();
    this.identifier = `${phone.replace(/[^0-9]/g, '')}`;
    this.usersPhone = this.identifier.slice(-2);

    this.authenticationService.forgotPassword(this.identifier)
      .subscribe(
        () => this.currentStep = 2,
        (err) => this.handleError(err)
      );
  }

  public resend(): void {
    if (this.identifier) {
      this.authenticationService.resendOTP(this.identifier).subscribe();
    }
  }

  public handlePin(otp: string): void {
    this.currentStep = 3;
    this.otp = otp;
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

  private static equalityValidator(firstFieldPath: string, secondFieldPath: string): ValidatorFn {
    // eslint-disable-next-line
    const validator = function (control: AbstractControl): ValidationErrors | null {
      const firstField = control.get(firstFieldPath);
      const secondField = control.get(secondFieldPath);
      if (firstField === null || secondField === null) {
        return null;
      }
      const firstValue = firstField.value;
      const secondValue = secondField.value;

      if (firstValue !== secondValue) {
        secondField.setErrors({ notEqual: true });
        return { notEqual: true };
      }
      return null;
    };
    // eslint-disable-next-line
    return validator;
  }
}
