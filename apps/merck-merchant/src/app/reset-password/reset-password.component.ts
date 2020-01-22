import {
  Component,
  OnInit,
} from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';

import {
  IMerchantAdminService,
  IMessageResponse,
  NotificationService,
} from '@perx/core';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private merchantAdminService: IMerchantAdminService,
  ) {
    this.initForm();
  }

  public ngOnInit(): void {
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
