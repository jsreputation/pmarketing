import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService, NotificationService } from '@perx/core';
import { HttpErrorResponse } from '@angular/common/http';
import { PageAppearence, PageProperties, BarSelectedItem } from '../page-properties';

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, PageAppearence {

  public selectedCountry: string = '+852';

  public loginForm: FormGroup;

  private authenticated: boolean;

  private appAccessTokenFetched: boolean = false;

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
      mobileNo: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public ngOnInit(): void {
    this.authService.v4GetAppAccessToken().subscribe(() => {
      this.appAccessTokenFetched = true;
    },
    (err) => {
      console.log('Error' + err);
    });

    this.authService.isAuthorized().subscribe(
        authed => {
          if (authed) {
            this.router.navigateByUrl('home');
          }
        }
    );
  }

  public getPageProperties(): PageProperties {
    return {
      header: false,
      backButtonEnabled: false,
      bottomSelectedItem: BarSelectedItem.NONE,
      pageTitle: ''
    };
  }

  public onSubmit(): void {

    // TODO: Uncomment the following line once merck-customer backend is setup with authentication service
    // const mobileNo = this.selectedCountry + (this.loginForm.get('mobileNo').value as string);

    const mobileNo = (this.loginForm.get('mobileNo').value as string);
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
            this.notificationService.addSnack('We could not reach the server');
          } else if (err.status === 401) {
            [this.loginForm.controls.mobileNo, this.loginForm.controls.password]
              .forEach(c => c.setErrors({
                invalid: true
              }));
            this.notificationService.addSnack('Invalid credentials');
          }
        }
      });
  }

  public goToSignup(): void {
    if (!this.appAccessTokenFetched) {
      return;
    }
    this.router.navigateByUrl('/signup');
  }

  public goToForgotPassword(): void {
    if (!this.appAccessTokenFetched) {
      return;
    }
    const mobileNumber = (this.loginForm.get('mobileNo').value as string);
    this.router.navigate(['forgot-password'], { state: { country: this.selectedCountry, mobileNo: mobileNumber } } );
  }

}
