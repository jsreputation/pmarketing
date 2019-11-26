import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
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
  public appAccessToken: string;
  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
  ) { }

  public ngOnInit(): void {
    this.initForm();
    this.authService.getAppToken().subscribe((token) => {
      this.appAccessToken = token.access_token;
    }, (err) => {
      console.error('Error' + err);
    });
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
    const password: string = this.signUpForm.value.password;
    const termsConditions = this.signUpForm.value.accept_terms as boolean;
    if (!termsConditions) {
      return;
    }

    this.errorMessage = undefined;
    const profile = this.signUpForm.value;
    delete profile.accept_terms;
    profile.password_confirmation = password;

    this.authService.signup(profile).subscribe(() => {
      this.router.navigate(['sms-validation'], { queryParams: { identifier: profile.phone } });
    },
      (e) => {
        console.log(e);
      });
  }
}
