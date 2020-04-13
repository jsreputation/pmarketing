import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthenticationService, ISignUpData, NotificationService, PopupComponent, ThemesService} from '@perxtech/core';
import { ISignUpComponent } from './i-sign-up.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent extends ISignUpComponent implements OnInit, OnDestroy {
  constructor(
    protected fb: FormBuilder,
    protected router: Router,
    protected themesService: ThemesService,
    protected authService: AuthenticationService,
    protected notificationService: NotificationService,
    private dialog: MatDialog
  ) {
    super(fb, router, themesService, authService, notificationService);
    this.initForm();
    this.getAppToken();
  }

  public ngOnInit(): void {
    this.initForm();
    this.fetchTheme();
  }

  protected get mobileNumber(): string {
    return `852${this.signupForm.value.mobileNo}`;
  }

  protected fetchFromDataAndSend(): void {
    const passwordString = this.signupForm.value.password;
    const confirmPassword = this.signupForm.value.confirmPassword;
    // should not be necessary now that we use equalityValidator on the form
    if (passwordString !== confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    const nickname = this.signupForm.value.nickname;
    const referralCode = this.signupForm.value.referralCode;
    const hkid = this.signupForm.value.hkid;
    const fullName = this.signupForm.value.fullName;
    const mobileNumber = this.mobileNumber;
    const emailValue = this.signupForm.value.email;
    const lastName = this.signupForm.value.fullName ? this.signupForm.value.fullName : nickname;

    const signUpData: ISignUpData = {
      lastName,
      email: emailValue,
      phone: mobileNumber,
      password: passwordString,
      passwordConfirmation: confirmPassword,
      customProperties: {
        nickname,
        fullName,
        referralCode,
        hkid
      }
    };

    this.loadingSubmit = true;

    this.authService.signup(signUpData).subscribe(
      () => {
        this.router.navigateByUrl('otp/register', { state: { mobileNo: mobileNumber } });
      },
      err => {
        this.notificationService.addSnack(err.error.message || 'Unexpected error');
        this.loadingSubmit = false;
      }
    );
  }

  public onSubmit(): void {
    if (!this.appAccessTokenFetched) {
      this.errorMessage = 'Unknown error occured.';
      return;
    }
    if (!this.signupForm.valid) {
      return;
    }

    const dialogRef = this.dialog.open(PopupComponent, {
      data: {
        title: 'Reminder: If you do not agree with this term, you will not be eligible to join the LIFE Dojo lucky draw. ',
        buttonTxt: 'Confirm',
        buttonTxt2: 'Cancel'
      }
    });

    if (this.signupForm.value.accept_marketing && this.signupForm.value.hkid && this.signupForm.value.fullName) {
      this.fetchFromDataAndSend();
    } else {
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.fetchFromDataAndSend();
        } else {
          return;
        }
      });
    }
  }
}
