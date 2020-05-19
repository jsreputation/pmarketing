import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService, NotificationService, ProfileService, IProfile } from '@perxtech/core';
import { PageAppearence, PageProperties, BarSelectedItem } from '../page-properties';
import { HttpErrorResponse } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
    private notificationService: NotificationService,
    private translate: TranslateService
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
      this.translate.get('PASSWORD_NOT_MATCH').subscribe(text =>
        this.notificationService.addSnack(text)
      );
      return;
    }
    let resetPaswordCall;

    const userToken = this.authService.getUserAccessToken();
    const appToken = this.authService.getAppAccessToken();
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
      );
    } else if (this.otp && this.mobileNumber && appToken) {
      resetPaswordCall = this.authService.resetPassword({
        phone: this.mobileNumber,
        newPassword: password,
        otp: this.otp,
        passwordConfirmation: confirmPassword
      });
    } else {
      resetPaswordCall = this.translate.get('UNKNOWN_ERROR').pipe(mergeMap(text => throwError(text)));
    }

    resetPaswordCall.subscribe(
      () => {
        if (!this.otp && !this.mobileNumber && userToken) {
          // Send Login Call on successfull password reset
          this.sendLoginCall(password);
        } else {
          // Let user use new password to login if reset the password through forget password
          this.router.navigateByUrl('login');
        }
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
        this.translate.get('PASSWORD_UPDATE_SUCCESSFULLY').subscribe(text =>
          this.notificationService.addSnack(text)
        );
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 0) {
            this.translate.get('SERVER_NOT_AVAILABLE').subscribe(text =>
              this.notificationService.addSnack(text)
            );
          } else if (err.status === 401) {
            this.translate.get('INVALID_CREDENTIALS').subscribe(text =>
              this.notificationService.addSnack(text)
            );
          }
        }
      }
    );
  }

}
