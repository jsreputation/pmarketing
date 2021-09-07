import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { IMerchantAdminService, IMessageResponse, ITheme, NotificationService, ThemesService, } from '@perxtech/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  public loginForm: FormGroup;
  public theme: ITheme;

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private merchantAdminService: IMerchantAdminService,
    private themesService: ThemesService
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
    });
    this.themesService.getThemeSetting().subscribe((theme) => {
      this.theme = theme;
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
