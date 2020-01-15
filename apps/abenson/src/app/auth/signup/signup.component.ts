import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService, ISignUpData, ProfileService } from '@perx/core';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { combineLatest, of } from 'rxjs';

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
  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private sharedDataService: SharedDataService,
    private profileService: ProfileService
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
      accept_terms: [false, Validators.requiredTrue],
      cardNumber: ['', [Validators.minLength(16), Validators.maxLength(16)]]
    });
  }

  public onSubmit(): void {
    const password: string = this.signUpForm.value.password;
    const termsConditions = this.signUpForm.value.accept_terms as boolean;
    if (!termsConditions) {
      return;
    }

    this.errorMessage = undefined;
    const profile = { ...this.signUpForm.value };
    delete profile.accept_terms;
    delete profile.cardNumber;
    const cardNumber: string = this.signUpForm.value.cardNumber;
    (profile as ISignUpData).passwordConfirmation = password;
    combineLatest(
      this.authService.signup(profile),
      cardNumber && cardNumber.length ? this.profileService.verifyCardNumber(cardNumber, profile.lastName, '') : of(false)
    ).subscribe(([_, b]) => {
      if (this.signUpForm.value.cardNumber && b) {
        this.sharedDataService.addData({
          phone: profile.phone,
          password: profile.password,
          cardNumber
        });
      }
      this.router.navigate(['sms-validation'], {
        queryParams: { identifier: profile.phone }
      });
    });
  }
}
