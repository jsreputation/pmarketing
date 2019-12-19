import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, NotificationService, ISignUpData } from '@perx/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  public signupForm: FormGroup;
  public errorMessage: string | null;
  public appAccessTokenFetched: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private notificationService: NotificationService
  ) {
    this.initForm();
    this.getAppToken();
  }

  private getAppToken(): void {
    const token = this.authService.getAppAccessToken();
    if (token) {
      this.appAccessTokenFetched = true;
    } else {
      this.authService.getAppToken().subscribe(() => {
        this.appAccessTokenFetched = true;
      }, (err) => {
        console.error('Error' + err);
      });
    }
  }

  private initForm(): void {
    this.signupForm = this.fb.group({
      title: ['', Validators.required],
      name: ['', Validators.required],
      dob: ['', Validators.required],
      postcode: ['', Validators.required],
      countryCode: ['60', Validators.required],
      mobileNo: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      accept_terms: [false, Validators.required],
      accept_marketing: [false, Validators.required]
    });
  }

  public onSubmit(): void {

    if (!this.appAccessTokenFetched) {
      this.errorMessage = 'Unknown error occurerd.';
      return;
    }

    const passwordString = this.signupForm.get('password').value;
    const confirmPassword = this.signupForm.get('confirmPassword').value;
    if (passwordString !== confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    const name = this.signupForm.value.name;
    const dob = this.signupForm.value.dob;

    const mobileNumber = this.signupForm.value.mobileNo;
    const countryCode = this.signupForm.value.countryCode;
    const codeAndMobile = countryCode + mobileNumber;

    const emailValue = this.signupForm.value.email;

    const titleString = this.signupForm.value.title;
    const postcodeString = this.signupForm.value.postcode;

    const signUpData: ISignUpData = {
      lastName: name,
      birthDay: dob,
      phone: codeAndMobile,
      password: passwordString,
      passwordConfirmation: confirmPassword,
      email: emailValue,
      title: titleString,
      postcode: postcodeString
    };

    this.authService.signup(signUpData)
    .subscribe(
      () => {
        this.router.navigateByUrl('enter-pin/register', { state: { mobileNo: codeAndMobile } });
      },
      err => {
        this.notificationService.addSnack(err.error.message);
      });
  }

  public goToLogin(): void {
    this.router.navigateByUrl('/signin');
  }
}
