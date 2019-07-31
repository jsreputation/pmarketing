import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService, NotificationService } from '@perx/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  private authenticated: boolean;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private notificationService: NotificationService
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public ngOnInit(): void {}

  public onSubmit(): void {
    const email = (this.loginForm.get('email').value as string).toUpperCase();
    const password: string = this.loginForm.get('password').value;

    this.authService.v4GameOauth(email, password)
      .then((isAuthed: boolean) => {
        this.authenticated = isAuthed;
        if (this.authenticated) {
          // set global userID var for GA tracking
          if (!((window as any).primaryIdentifier)) {
            (window as any).primaryIdentifier = email;
          }
          if (this.authService.getInterruptedUrl()) {
            this.router.navigateByUrl(this.authService.getInterruptedUrl());
          } else {
            this.router.navigateByUrl('/home');
          }
        }
      })
      .catch((err) => {
        this.authenticated = false;
        if (err instanceof HttpErrorResponse) {
          if (err.status === 0) {
            this.errorMessage = 'We could not reach the server';
          } else if (err.status === 401) {
            [this.loginForm.controls.email, this.loginForm.controls.password]
              .forEach(c => c.setErrors({
                invalid: true
              }));
            this.notificationService.addSnack('Invalid credentials')
          }
        }
      });
  }

  public onCrossClicked(): void {
    this.errorMessage = null;
  }

  public onForgotPassword(): void {
    this.router.navigateByUrl('/reset');
  }

}
