import { AuthenticationService, NotificationService, Config } from '@perx/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'perx-blackcomb-pages-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public errorMessage: string;
  public preAuth: boolean;
  public failedAuth: boolean;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private notificationService: NotificationService,
    private config: Config
  ) {
    this.preAuth = this.config ? this.config.preAuth : false;
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public redirectAfterLogin(): void {
    this.router.navigateByUrl(this.authService.getInterruptedUrl() ? this.authService.getInterruptedUrl() : 'wallet');
  }

  public initForm(): void {
    this.loginForm = this.fb.group({
      customerID: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public onSubmit(): void {
    const username = (this.loginForm.get('customerID').value as string);
    const password: string = this.loginForm.get('password').value;
    this.errorMessage = null;
    this.authService.login(username, password, '2').subscribe(
      () => {
        // set global userID var for GA tracking
        if (!((window as any).primaryIdentifier)) {
          (window as any).primaryIdentifier = username;
        }
        this.router.navigate([`loading`]);
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 0) {
            this.notificationService.addPopup({
              title: 'We could not reach the server',
              text: 'Please try again soon'
            });
          } else if (err.status === 401) {
            [this.loginForm.controls.customerID, this.loginForm.controls.password]
              .forEach(c => c.setErrors({
                invalid: true
              }));
            this.errorMessage = 'Invalid credentials';
          }
        } else {
          this.errorMessage = err;
        }
      }
    );
  }
}
