import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HkbnValidators } from '../../../helpers/hkbn-validators';
import { AuthenticationService } from '@perx/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'hkbn-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  public currentStep: number = 1;

  public phoneStepForm: FormGroup = new FormGroup({
    phone: new FormControl(null, [HkbnValidators.required])
  });

  public newPasswordForm: FormGroup = new FormGroup({
    newPassword: new FormControl(null, [HkbnValidators.required]),
    confirmPassword: new FormControl(null, [HkbnValidators.required])
  }, [HkbnValidators.equalityValidator('newPassword', 'confirmPassword')]);

  private otp: string;
  private identifier: string;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.route.queryParams
      .pipe(
        filter((params) => !!params.identifier),
        takeUntil(this.destroy$)
      )
      .subscribe((params) => {
        this.phoneStepForm.setValue({phone: params.identifier});
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
    // TODO: remove next line when forgotPassword method will be implemented
    this.currentStep = 2;

    this.authenticationService.forgotPassword(this.identifier).subscribe(() => {
      this.currentStep = 2;
      // TODO: Uncomment when method will be implemented
      // this.otp = otp;
    });
  }

  public resend(): void {
    this.authenticationService.resendOTP(this.otp).subscribe(() => {
      // TODO: Uncomment when method will be implemented
      // this.otp = otp;
    });
  }

  public handlePin(otp: string): void {
    // TODO: remove when verifyOTP method will be implemented
    this.currentStep = 3;

    this.authenticationService.verifyOTP(this.identifier, otp).subscribe(() => {
      this.currentStep = 3;
    });
  }

  public changePassword(data: any): void {
    if (this.newPasswordForm.invalid) {
      return;
    }
    // TODO: remove when changePassword method will be implemented
    this.router.navigate(['/']);

    this.authenticationService.changePassword(data.newPassword)
      .subscribe(() => {
        // TODO: Uncomment when method will be implemented

        // const authorized = this.authenticationService.v4GameOauth(this.identifier, pass);
        // if (authorized) {
        //   this.router.navigate(['/']);
        // }
      });
  }

}
