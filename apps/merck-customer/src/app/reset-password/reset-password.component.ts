import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '@perx/core';
import { PageProperties, BAR_SELECTED_ITEM } from '../page-properties';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'mc-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, PageProperties {

  public resetPasswordForm: FormGroup;
  public mobileNumber: string = '';
  public otp: string = '';
  public errorMessage: string = null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthenticationService
  ) {
     if (this.router.getCurrentNavigation() !== null) {
      if (this.router.getCurrentNavigation().extras.hasOwnProperty('state')) {
          this.mobileNumber = this.router.getCurrentNavigation().extras.state.mobileNo;
          this.otp = this.router.getCurrentNavigation().extras.state.otp;
      }
    }
   }

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {

    this.resetPasswordForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  public showHeader(): boolean {
    return true;
  }

  public bottomSelectedItem(): BAR_SELECTED_ITEM {
    return BAR_SELECTED_ITEM.NONE;
  }

  public onUpdatePassword(): void {

    const password = this.resetPasswordForm.get('password').value as string;
    const confirmPassword = this.resetPasswordForm.get('confirmPassword').value as string;
    if (password !== confirmPassword) {
        this.errorMessage = 'Passwords do not match.';
        // Use snack bar to throw message
        return;
    }

    // First send reset password using otp and password on successful return call below
    this.authService.resetPassword(this.otp, password).subscribe(
      () => {
        // Send Login Call on successfull password reset
        this.sendLoginCall(password);
      },
      err =>  {
        this.errorMessage = err;
        console.error('ResetPassword: ' + err);
      });
  }
  private sendLoginCall(password: string): void {
    this.authService.v4GameOauth(this.mobileNumber, password)
      .then((isAuthed: boolean) => {
        if (isAuthed) {
          // set global userID var for GA tracking
          if (!((window as any).primaryIdentifier)) {
            (window as any).primaryIdentifier = this.mobileNumber;
          }
          if (this.authService.getInterruptedUrl()) {
            this.router.navigateByUrl(this.authService.getInterruptedUrl());
          } else {
            this.router.navigateByUrl('home');
          }
        }
      })
      .catch((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 0) {
            this.errorMessage = 'We could not reach the server';
          } else if (err.status === 401) {
            [this.resetPasswordForm.controls.password, this.resetPasswordForm.controls.confirmPassword]
              .forEach(c => c.setErrors({
                invalid: true
              }));
            this.errorMessage = 'Invalid credentials';
          }
        }
      });
  }

}
