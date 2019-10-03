import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HkbnValidators } from '../../../helpers/hkbn-validators';
import { AuthenticationService } from '@perx/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'hkbn-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  public currentStep: number = 1;
  public usersPhone: string;

  public phoneStepForm: FormGroup = new FormGroup({
    phone: new FormControl(null, [
      HkbnValidators.required,
      HkbnValidators.pattern('^[0-9]+$'),
      HkbnValidators.minLength(8),
      HkbnValidators.maxLength(8)])
  });

  public newPasswordForm: FormGroup = new FormGroup({
    newPassword: new FormControl(null, [HkbnValidators.required, HkbnValidators.minLength(6)]),
    passwordConfirmation: new FormControl(null, [HkbnValidators.required, HkbnValidators.minLength(6)])
  }, [HkbnValidators.equalityValidator('newPassword', 'passwordConfirmation')]);

  private otp: string;
  private identifier: string;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this.route.queryParams
      .pipe(
        filter((params) => !!params.identifier),
        takeUntil(this.destroy$)
      )
      .subscribe((params) => {
        this.phoneStepForm.setValue({ phone: params.identifier });
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
    this.identifier = this.phoneStepForm.value.phone;
    this.usersPhone = this.identifier.slice(-2);

    this.authenticationService.forgotPassword(this.identifier).subscribe(() => {
      this.currentStep = 2;
    });
  }

  public resend(): void {
    this.authenticationService.resendOTP(this.otp).subscribe(() => {
    });
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
    this.authenticationService.resetPassword({ phone: this.identifier, otp: this.otp, ...value }).pipe(
      mergeMap(
        () => {
          return this.authenticationService.login(this.identifier, value.newPassword);
        }
      )).subscribe(
        () => {
          this.router.navigate(['/']);
        }
      );
  }

}
