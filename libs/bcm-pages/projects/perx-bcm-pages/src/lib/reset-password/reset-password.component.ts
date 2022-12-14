import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService, IMerchantAdminService } from '@perxtech/core';

interface ResetData {
  resetPasswordToken: string;
  clientId: string;
}

@Component({
  selector: 'perx-bcm-pages-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public resetPasswordForm: FormGroup;
  public mobileNumber: string = '';
  public otp: string = '';
  public errorMessage: string | null = null;

  private resetData: ResetData = {
    resetPasswordToken: '',
    clientId: '',
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private merchantAdminService: IMerchantAdminService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute
  ) {
    const queryParams = this.activatedRoute.snapshot.queryParams;
    const { reset_password_token, client_id } = queryParams;
    this.resetData.resetPasswordToken = reset_password_token || '';
    this.resetData.clientId = client_id || '';
  }

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.resetPasswordForm = this.fb.group({
      password: ['', [ Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      confirmPassword: ['', [ Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
    });
  }

  public onSubmit(): void {
    const password = this.resetPasswordForm.value.password as string;
    const confirmPassword = this.resetPasswordForm.value.confirmPassword as string;
    if (password !== confirmPassword) {
      this.notificationService.addSnack('Passwords do not match.');
      return;
    }

    this.merchantAdminService.resetPassword({
      clientId: this.resetData.clientId,
      resetPasswordToken: this.resetData.resetPasswordToken,
      password,
    }).subscribe(
      () => {
        this.router.navigateByUrl('login');
        this.notificationService.addSnack('Your password has been updated. Please login');
      },
      (err: HttpErrorResponse) => this.notificationService.addSnack(err.error.message)
    );
  }
}
