import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService, NotificationService } from '@perx/core/dist/perx-core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
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
    const email = (this.loginForm.get('email').value as string).toUpperCase();
    this.authenticationService.forgotPassword(email).subscribe(
      () => this.notificationService.addSnack('We\'ve sent a password reset link to the email you provided'),
      err => this.notificationService.addSnack(err)
    );
  }

}
