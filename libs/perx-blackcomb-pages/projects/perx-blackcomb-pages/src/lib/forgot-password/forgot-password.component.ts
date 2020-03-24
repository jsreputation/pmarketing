import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, NotificationService } from '@perxtech/core';
import { Subject } from 'rxjs';
import { filter, mergeMap, takeUntil, map } from 'rxjs/operators';

@Component({
  selector: 'perx-blackcomb-pages-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  public currentStep: number = 1;
  public usersPhone: string;

  public phoneStepForm: FormGroup = new FormGroup({
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[0-9]+$'),
      Validators.minLength(2),
      Validators.maxLength(10)]),
    countryCode: new FormControl('852', [])
  });

  public newPasswordForm: FormGroup = new FormGroup({
    newPassword: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    passwordConfirmation: new FormControl(null, [Validators.required, Validators.minLength(6)])
  }, [ForgotPasswordComponent.equalityValidator('newPassword', 'passwordConfirmation')]);

  private otp: string;
  private identifier: string;
  private destroy$: Subject<void> = new Subject<void>();
  public countryCodesOptions: { value: string, label: string }[] = [
    { value: '852', label: 'HongKong' },
    { value: '853', label: 'Macau' },
    { value: '86', label: 'China' },
    { value: '65', label: 'Singapore' }
  ];

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) { }

  public ngOnInit(): void {
    this.route.queryParams
      .pipe(
        filter((params) => !!params.identifier),
        map((params) => params.identifier),
        takeUntil(this.destroy$)
      )
      .subscribe((phone: string) => {
        if (phone[0] === '+') {
          phone = phone.slice(1);
        }
        const countryCodes = this.countryCodesOptions.map(op => op.value);
        const countryCode = countryCodes.find(code => phone.startsWith(code)) || null;
        if (countryCode !== null) {
          phone = phone.slice(countryCode.length);
        }
        this.phoneStepForm.setValue({ phone, countryCode });
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public phoneHandler(): void {
    if (this.phoneStepForm.invalid) {
      return;
    }
    const phone: string = `${this.phoneStepForm.value.countryCode}${this.phoneStepForm.value.phone}`.trim();
    this.identifier = `+${phone.replace(/[^0-9]/g, '')}`;
    this.usersPhone = this.identifier.slice(-2);

    this.authenticationService.forgotPassword(this.identifier)
      .subscribe(
        () => this.currentStep = 2,
        (err) => this.handleError(err)
      );
  }

  public resend(): void {
    this.authenticationService.resendOTP(this.otp).subscribe(() => { });
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
