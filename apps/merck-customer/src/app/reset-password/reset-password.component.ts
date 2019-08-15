import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService, NotificationService } from '@perx/core';
import { PageAppearence, PageProperties, BarSelectedItem } from '../page-properties';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'mc-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, PageAppearence {

  public resetPasswordForm: FormGroup;
  public mobileNumber: string = '';
  public otp: string = '';
  public errorMessage: string = null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private notificationService: NotificationService

  ) {
      const currentNavigation = this.router.getCurrentNavigation();
      if (!currentNavigation) {
        return;
      }

      if (currentNavigation.extras.hasOwnProperty('state')) {
          this.mobileNumber = currentNavigation.extras.state.mobileNo;
          this.otp = currentNavigation.extras.state.otp;
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

  public getPageProperties(): PageProperties {
    return {
      header: true,
      backButtonEnabled: false,
      bottomSelectedItem: BarSelectedItem.NONE,
      pageTitle: ''
    };
  }

  public onUpdatePassword(): void {

    const password = this.resetPasswordForm.get('password').value as string;
    const confirmPassword = this.resetPasswordForm.get('confirmPassword').value as string;
    if (password !== confirmPassword) {
        this.notificationService.addSnack('Passwords do not match.');
        return;
    }

    // First send reset password using otp and password on successful return call below
    this.authService.resetPassword(
      { phone: this.mobileNumber, newPassword: password, otp: this.otp, passwordConfirmation: confirmPassword})
      .subscribe(
      (response) => {
        console.log(`Response : ${response.message}`);
        console.log(`Response code: ${response.code}`);
        // Send Login Call on successfull password reset
        this.sendLoginCall(password);
      },
      err =>  {
        console.error('ResetPassword: ' + err);
        if (err instanceof HttpErrorResponse) {
           this.notificationService.addSnack(err.statusText);
        } else {
          this.notificationService.addSnack(err.code);
        }
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
            this.notificationService.addSnack('We could not reach the server');
          } else if (err.status === 401) {
            this.notificationService.addSnack('Invalid credentials');
          }
        }
      });
  }

}
