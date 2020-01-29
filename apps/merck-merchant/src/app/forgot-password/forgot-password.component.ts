import {
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import {
  IMerchantAdminService,
  IMessageResponse,
  NotificationService,
} from '@perx/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  public loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private merchantAdminService: IMerchantAdminService,
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
    });
  }

  public onSubmit(): void {
    const email: string = this.loginForm.value.email as string;
    this.merchantAdminService.forgotPassword(email).subscribe(
      (res: IMessageResponse) => this.notificationService.addSnack(res.message),
      (err: HttpErrorResponse) => this.notificationService.addSnack(err.error.message)
    );
  }
}
