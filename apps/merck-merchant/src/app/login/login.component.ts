import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService, NotificationService, TokenStorage } from '@perx/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private notificationService: NotificationService,
    private tokenStorage: TokenStorage
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      name: [''],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public ngOnInit(): void { }

  public onSubmit(): void {
    const merchantUsername = this.loginForm.value.name as string;
    const email = this.loginForm.value.email as string;
    const password: string = this.loginForm.value.password;
    const scope: string = 'merchant_credentials';

    this.authService.login(email, password, undefined, undefined, scope).subscribe(
      () => {
        // set global userID var for GA tracking
        if (!((window as any).primaryIdentifier)) {
          (window as any).primaryIdentifier = email;
        }

        this.tokenStorage.setAppInfoProperty(merchantUsername, 'merchantUsername');
        this.router.navigateByUrl(this.authService.getInterruptedUrl() ? this.authService.getInterruptedUrl() : '/home');
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 0) {
            this.notificationService.addSnack('We could not reach the server');
          } else if (err.status === 401) {
            [this.loginForm.controls.email, this.loginForm.controls.password]
              .forEach(c => c.setErrors({
                invalid: true
              }));
            this.notificationService.addSnack('Invalid credentials');
          }
        }
      }
    );
  }

  public onForgotPassword(): void {
    this.router.navigateByUrl('/reset');
  }

}
