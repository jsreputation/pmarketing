import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '@perx/core/dist/perx-core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public selectedCountry: string = '+852';

  public loginForm: FormGroup;

  private authenticated: boolean;
  public errorMessage: string = null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthenticationService
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      mobileNo: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public ngOnInit(): void {}

  public onSubmit(): void {

    // TODO: Uncomment the following line once merck-customer backend is setup with authentication service
    // const mobileNo = this.selectedCountry + (this.loginForm.get('mobileNo').value as string);

    const mobileNo = (this.loginForm.get('mobileNo').value as string).toUpperCase();
    const password: string = this.loginForm.get('password').value;

    this.authService.v4GameOauth(mobileNo, password)
      .then((isAuthed: boolean) => {
        this.authenticated = isAuthed;
        if (this.authenticated) {
          // set global userID var for GA tracking
          if (!((window as any).primaryIdentifier)) {
            (window as any).primaryIdentifier = mobileNo;
          }
          if (this.authService.getInterruptedUrl()) {
            this.router.navigateByUrl(this.authService.getInterruptedUrl());
          } else {
            this.router.navigateByUrl('/user-info');
          }
        }
      })
      .catch((err) => {
        this.authenticated = false;
        if (err instanceof HttpErrorResponse) {
          if (err.status === 0) {
            this.errorMessage = 'We could not reach the server';
          } else if (err.status === 401) {
            [this.loginForm.controls.mobileNo, this.loginForm.controls.password]
              .forEach(c => c.setErrors({
                invalid: true
              }));
            this.errorMessage = 'Invalid credentials';
          }
        }
      });
  }

  public onCrossClicked(): void {
    this.errorMessage = null;
  }

}
