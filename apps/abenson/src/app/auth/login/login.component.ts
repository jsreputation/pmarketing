import {
  Component,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import {
  AuthenticationService,
  NotificationService,
} from '@perxtech/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public errorMessage?: string;
  public preAuth: boolean;
  public appAccessTokenFetched: boolean;
  public useSignUpButton: boolean = true;

  public get mobileNumber(): AbstractControl | null {
    return this.loginForm.get('mobileNumber');
  }

  public get pinCode(): AbstractControl | null {
    return this.loginForm.get('pinCode');
  }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private notificationService: NotificationService,
  ) {
  }

  public ngOnInit(): void {
    const token = this.authService.getAppAccessToken();
    if (token) {
      this.appAccessTokenFetched = true;
    } else {
      this.authService.getAppToken().subscribe(() => {
        this.appAccessTokenFetched = true;
      }, (err) => {
        console.error(`Error${err}`);
      });
    }

    this.initForm();
  }

  public initForm(): void {
    this.loginForm = this.fb.group({
      mobileNumber: ['', [Validators.required, Validators.maxLength(10)]],
      pinCode: ['', Validators.required]
    });
  }

  public onSubmit(): void {
    // converting to Number will strip leading 0s
    const username = Number(this.loginForm.value.mobileNumber).toString();
    const password: string = this.loginForm.value.pinCode;
    this.errorMessage = undefined;

    this.authService.login(username, password).subscribe(
      () => {
        // set global userID var for GA tracking
        if (!((window as any).primaryIdentifier)) {
          (window as any).primaryIdentifier = username;
        }
        this.router.navigate(['card']);
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 0) {
            this.notificationService.addPopup({
              title: 'We could not reach the server',
              text: 'Please try again soon'
            });
          } else if (err.status === 401) {
            [this.loginForm.controls.mobileNumber, this.loginForm.controls.pinCode]
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
