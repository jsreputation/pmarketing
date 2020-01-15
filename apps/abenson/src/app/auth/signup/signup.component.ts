import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService, ISignUpData } from '@perx/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignUpComponent implements OnInit {
  public signUpForm: FormGroup;
  public errorMessage?: string;
  public hide: boolean = true;
  public appAccessTokenFetched: boolean;
  public isSignUpEnded: boolean = true;
  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
  ) { }

  public ngOnInit(): void {
    this.initForm();
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

  public initForm(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.maxLength(4), Validators.minLength(4)]],
      accept_terms: [false, Validators.requiredTrue]
    });
  }

  public onSubmit(): void {
    if (!this.isSignUpEnded) {
      return;
    }

    this.isSignUpEnded = false;
    const password: string = this.signUpForm.value.password;
    const termsConditions = this.signUpForm.value.accept_terms as boolean;
    if (!termsConditions) {
      return;
    }

    this.errorMessage = undefined;
    const profile = this.signUpForm.value;
    delete profile.accept_terms;
    (profile as ISignUpData).passwordConfirmation = password;

    this.authService.signup(profile).subscribe(() => {
      this.isSignUpEnded = true;
      this.router.navigate(['sms-validation'], { queryParams: { identifier: profile.phone } });
    },
      (e) => {
        this.isSignUpEnded = true;
        console.log(e);
      });
  }
}
