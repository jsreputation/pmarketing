import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NotificationService, IChangePasswordData, AuthenticationService } from '@perx/core';
import { Router } from '@angular/router';

@Component({
  selector: 'perx-blackcomb-pages-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

  public changePasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  public onSubmit(): void {
    const passwordField = this.changePasswordForm.get('newPassword');
    const passwordString = passwordField ? passwordField.value : '';

    const confirmPasswordField = this.changePasswordForm.get('confirmPassword');
    const confirmPassword = confirmPasswordField ? confirmPasswordField.value : '';

    if (passwordString !== confirmPassword) {
      this.notificationService.addSnack('Passwords do not match.');
      return;
    }

    const oldPasswordField = this.changePasswordForm.get('oldPassword');
    const oldPasswordString = oldPasswordField ? oldPasswordField.value : '';

    const changePasswordData: IChangePasswordData = {
      newPassword: passwordString,
      passwordConfirmation: confirmPassword,
      oldPassword: oldPasswordString,
      otp: ''
    };

    this.authService.requestVerificationToken().subscribe(() => {
      this.router.navigateByUrl('enter-pin/password', { state: changePasswordData });
    });
  }

}
