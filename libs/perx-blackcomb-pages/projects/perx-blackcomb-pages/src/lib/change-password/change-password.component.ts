import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NotificationService } from '@perx/core';

@Component({
  selector: 'perx-blackcomb-pages-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  public changePasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {
    this.initForm();
  }

  public ngOnInit(): void {
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

    // TODO: Proceed to OTP page which still needs to created
  }

}
