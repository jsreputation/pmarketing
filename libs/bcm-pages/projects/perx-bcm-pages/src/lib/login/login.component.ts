import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, NotificationService } from '@perxtech/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'perx-bcm-pages-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  public get email(): AbstractControl | null {
    return this.loginForm.get('email');
  }

  public get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private notificationService: NotificationService,
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public ngOnInit(): void {
  }

  public onSubmit(): void {
    const email = this.loginForm.value.email as string;
    const password: string = this.loginForm.value.password;
    const scope: string = 'merchant_credentials';

    if (!email || !password) {
      return;
    }

    this.authService.login(email.toLowerCase(), password, undefined, undefined, scope).subscribe(
      () => {
        // set global userID var for GA tracking
        if (!((window as any).primaryIdentifier)) {
          (window as any).primaryIdentifier = email;
        }

        this.router.navigateByUrl(this.authService.getInterruptedUrl() ? this.authService.getInterruptedUrl() : '/home');
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 0) {
            this.notificationService.addSnack('We could not reach the server');
          } else if (err.status === 401) {
            this.notificationService.addSnack('Invalid credentials');
          }
        }
      }
    );
  }

  public onForgotPassword(): void {
    this.router.navigateByUrl('/forgot-password');
  }

}
