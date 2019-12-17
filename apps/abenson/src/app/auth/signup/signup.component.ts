import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Validators, FormBuilder, FormGroup, AbstractControl} from '@angular/forms';
import { AuthenticationService } from '@perx/core';

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

  public get firstName(): AbstractControl | null {
    return this.signUpForm.get('firstName');
  }

  public get lastName(): AbstractControl | null {
    return this.signUpForm.get('lastName');
  }

  public get phone(): AbstractControl | null {
    return this.signUpForm.get('phone');
  }

  public get password(): AbstractControl | null {
    return this.signUpForm.get('password');
  }

  public get acceptTerms(): AbstractControl | null {
    return this.signUpForm.get('acceptTerms');
  }

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
      acceptTerms: [false, Validators.requiredTrue]
    });
  }

  public onSubmit(): void {
    const password: string = this.signUpForm.value.password;
    const termsConditions = this.signUpForm.value.acceptTerms as boolean;
    if (!termsConditions) {
      return;
    }

    this.errorMessage = undefined;
    const profile = this.signUpForm.value;
    delete profile.acceptTerms;
    profile.password_confirmation = password;

    this.authService.signup(profile).subscribe(() => {
      this.router.navigate(['sms-validation'], { queryParams: { identifier: profile.phone } });
    },
      (e) => {
        console.log(e);
      });
  }
}
