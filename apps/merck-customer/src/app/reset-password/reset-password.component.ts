import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService, NotificationService, ProfileService, IProfile } from '@perx/core';
import { PageAppearence, PageProperties, BarSelectedItem } from '../page-properties';
import { HttpErrorResponse } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'mc-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, PageAppearence {

  public resetPasswordForm: FormGroup;
  public mobileNumber: string = '';
  public otp: string = '';
  public errorMessage: string | null = null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private profileService: ProfileService,
    private notificationService: NotificationService
  ) {
    const currentNavigation = this.router.getCurrentNavigation();
    if (!currentNavigation) {
      return;
    }

    // todo: the following block does not seem like it would trigger
    if (currentNavigation.extras.state) {
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
      backButtonEnabled: true,
      bottomSelectedItem: BarSelectedItem.NONE,
      pageTitle: ''
    };
  }

  public onUpdatePassword(): void {

    const password = this.resetPasswordForm.value.password as string;
    const confirmPassword = this.resetPasswordForm.value.confirmPassword as string;
    if (password !== confirmPassword) {
      this.notificationService.addSnack('Passwords do not match.');
      return;
    }
    let resetPaswordCall = this.authService.resetPassword({
      phone: this.mobileNumber,
      newPassword: password,
      otp: this.otp,
      passwordConfirmation: confirmPassword
    });

    const userToken = this.authService.getUserAccessToken();
    if (!this.otp && !this.mobileNumber && userToken) {
      resetPaswordCall = this.profileService.whoAmI().pipe(
        mergeMap((profile: IProfile) => {
          this.mobileNumber = profile.phone || '';
          return this.authService.resetPassword({
            phone: this.mobileNumber,
            newPassword: password,
            otp: this.otp,
            passwordConfirmation: confirmPassword
          });
        })
      )
    }

    resetPaswordCall.subscribe(
      () => {
        // Send Login Call on successfull password reset
        this.sendLoginCall(password);
      },
      err => {
        console.error(`ResetPassword: ${err}`);
        if (err instanceof HttpErrorResponse) {
          this.notificationService.addSnack(err.statusText);
        } else {
          this.notificationService.addSnack(err.code);
        }
      });
  }

  private sendLoginCall(password: string): void {
    this.authService.login(this.mobileNumber, password).subscribe(
      () => {
        // set global userID var for GA tracking
        if (!((window as any).primaryIdentifier)) {
          (window as any).primaryIdentifier = this.mobileNumber;
        }
        this.router.navigateByUrl(this.authService.getInterruptedUrl() ? this.authService.getInterruptedUrl() : 'account');
        this.notificationService.addSnack('Password successfully updated.');
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 0) {
            this.notificationService.addSnack('We could not reach the server');
          } else if (err.status === 401) {
            this.notificationService.addSnack('Invalid credentials');
          }
        }
      }
    );
  }

}
