import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService, NotificationService } from '@perxtech/core';
import { PageAppearence, PageProperties, BarSelectedItem } from '../page-properties';
import { HttpErrorResponse } from '@angular/common/http';
import { mergeMap, catchError } from 'rxjs/operators';
import { throwError, of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

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
  private pwUpdatedTxt: string;
  private serverNotAvailable: string;
  private invalidCredentials: string;
  private passwordNotMatch: string;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthenticationService,
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

    this.initTranslate();
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
      this.notificationService.addSnack(this.passwordNotMatch);
      return;
    }

    const resetPaswordCall = this.authService.resetPassword({
      phone: this.mobileNumber,
      newPassword: password,
      otp: this.otp,
      passwordConfirmation: confirmPassword
    }).pipe(
      catchError(err => throwError(err)),
      mergeMap(() => {
        if (this.authService.getUserAccessToken()) {
          return this.authService.login(this.mobileNumber, password);
        }
        return of(true);
      })
    );

    resetPaswordCall.subscribe(
      () => {
        if (!((window as any).primaryIdentifier)) {
          (window as any).primaryIdentifier = this.mobileNumber;
        }
        this.router.navigateByUrl(this.authService.getUserAccessToken() ? 'account' : 'login');
        this.notificationService.addSnack(this.pwUpdatedTxt);
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 0) {
            this.notificationService.addSnack(this.serverNotAvailable);
          } else if (err.status === 401) {
            this.notificationService.addSnack(this.invalidCredentials);
          } else {
            this.notificationService.addSnack(err.message);
          }
        } else {
          this.notificationService.addSnack(err.code);
        }
      });
  }

  private initTranslate(): void {
    this.translate.get('PASSWORD_UPDATE_SUCCESSFULLY').subscribe(text =>
      this.pwUpdatedTxt = text
    );
    this.translate.get('SERVER_NOT_AVAILABLE').subscribe(text =>
      this.serverNotAvailable = text
    );
    this.translate.get('INVALID_CREDENTIALS').subscribe(text =>
      this.invalidCredentials = text
    );
    this.translate.get('PASSWORD_NOT_MATCH').subscribe(text =>
      this.passwordNotMatch = text
    );
  }
}
