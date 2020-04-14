import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, equalityValidator, IChangePasswordData, inequalityValidator } from '@perxtech/core';
import { ShowTitleInHeader } from '../layout/layout.component';

@Component({
  selector: 'perx-blackcomb-pages-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements ShowTitleInHeader {

  public changePasswordForm: FormGroup;
  public showHeaderBelow: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.initForm();
    const currentNavigation = this.router.getCurrentNavigation();
    if (!currentNavigation) {
      return;
    }
    if (currentNavigation.extras.state && currentNavigation.extras.state.showHeaderBelow) {
      this.showHeaderBelow = true;
    }
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

    const changePasswordData: IChangePasswordData = {
      newPassword: passwordString,
      passwordConfirmation: confirmPassword,
      oldPassword: oldPasswordString,
      otp: ''
    };

    this.authService.requestVerificationToken()
      .subscribe(() => this.router.navigateByUrl('/otp/password', { state: changePasswordData }));
  }

  public getTitle(): string {
    return 'Change password';
  }
}
