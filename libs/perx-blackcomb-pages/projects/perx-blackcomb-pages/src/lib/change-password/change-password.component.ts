import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AuthenticationService,
  equalityValidator,
  IChangePasswordData,
  inequalityValidator,
  IProfile,
  NotificationService,
  ProfileService
} from '@perxtech/core';
import { ShowTitleInHeader } from '../layout/layout.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'perx-blackcomb-pages-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements ShowTitleInHeader {

  public changePasswordForm: FormGroup;
  public profile: IProfile;
  public invalidPWText: string;
  private initTranslate(): void {
    this.translate.get('LOGIN_PAGE.PASSWORD_INVALID_TXT').subscribe((text) => this.invalidPWText = text);
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private notificationService: NotificationService,
    private translate: TranslateService,
    private profileService: ProfileService
  ) {
    this.profileService.whoAmI().subscribe((res) => {
      this.profile = res
    });
    this.initTranslate();
    this.initForm();
  }

  private initForm(): void {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validators: [
        equalityValidator('newPassword', 'confirmPassword'),
        inequalityValidator('oldPassword', 'newPassword'),
      ]
    });
  }

  public onSubmit(): void {
    if (!this.changePasswordForm.valid) {
      return;
    }

    const passwordField = this.changePasswordForm.get('newPassword');
    const passwordString = passwordField ? passwordField.value : '';

    const confirmPasswordField = this.changePasswordForm.get('confirmPassword');
    const confirmPassword = confirmPasswordField ? confirmPasswordField.value : '';

    const oldPasswordField = this.changePasswordForm.get('oldPassword');
    const oldPasswordString = oldPasswordField ? oldPasswordField.value : '';

    this.authService.login(this.profile.phone as string, oldPasswordString).subscribe(
      () => {
        const changePasswordData: IChangePasswordData = {
          newPassword: passwordString,
          passwordConfirmation: confirmPassword,
          oldPassword: oldPasswordString,
          otp: ''
        };
        this.authService.requestVerificationToken()
          .subscribe(() => this.router.navigateByUrl('/otp/password', { state: changePasswordData }));
      } ,
      () =>  this.notificationService.addSnack(this.invalidPWText)
  );
  }

  public getTitle(): string {
    return 'Change password';
  }
}
