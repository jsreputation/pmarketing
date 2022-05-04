import {
  Validators,
  FormBuilder,
  FormGroup,
  AbstractControl
} from '@angular/forms';
import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { IMerchantAdminService, IMessageResponse, NotificationService } from '@perxtech/core';
import { Router } from '@angular/router';

@Component({
  selector: 'perx-bcm-pages-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  public forgotPasswordForm: FormGroup;
  public loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private merchantAdminService: IMerchantAdminService,
    private router: Router,
  ) {
    this.initForm();
  }

  public get email(): AbstractControl | null {
    return this.forgotPasswordForm.get('email');
  }

  private initForm(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', Validators.required],
    });
  }

  public onSubmit(): void {
    this.loading = true;
    const email: string = this.forgotPasswordForm.value.email as string;
    this.merchantAdminService.forgotPassword(email).subscribe(
      (res: IMessageResponse) => {
        this.router.navigate(['/login']);
        this.notificationService.addSnack(res.message);
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        this.notificationService.addSnack(err.error.message);
      }
    );
  }
}
