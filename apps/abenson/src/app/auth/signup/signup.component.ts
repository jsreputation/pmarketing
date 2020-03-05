import {
  Component,
  OnInit,
} from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  AbstractControl,
} from '@angular/forms';
import {Router} from '@angular/router';
//
// import {
//   of,
//   throwError,
// } from 'rxjs';
// import {mergeMap} from 'rxjs/operators';

import {
  AuthenticationService,
  NotificationService,
  ISignUpData,
} from '@perx/core';

// import {SharedDataService} from 'src/app/services/shared-data.service';

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

  public get email(): AbstractControl | null {
    return this.signUpForm.get('email');
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
    private notificationService: NotificationService
    // private sharedDataService: SharedDataService,
    // private profileService: ProfileService,
  ) {
  }

  public ngOnInit(): void {
    this.initForm();
    const token = this.authService.getAppAccessToken();
    if (token) {
      this.appAccessTokenFetched = true;
    } else {
      this.authService.getAppToken().subscribe(() => {
        this.appAccessTokenFetched = true;
      }, (err) => {
        console.error(`Error${  err}`);
      });
    }
  }

  public initForm(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.email],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.maxLength(4), Validators.minLength(4)]],
      acceptTerms: [false, Validators.requiredTrue]
      // cardNumber: ['', [Validators.minLength(16), Validators.maxLength(16)]]
    });
  }

  public onSubmit(): void {
    const password: string = this.signUpForm.value.password;
    const termsConditions = this.signUpForm.value.acceptTerms as boolean;
    if (!termsConditions) {
      return;
    }

    this.errorMessage = undefined;
    const profile = {...this.signUpForm.value};
    delete profile.accept_terms;
    (profile as ISignUpData).passwordConfirmation = password;
    this.authService.signup(profile).subscribe(
      () => {
        this.router.navigate(['sms-validation'], {
          queryParams: {identifier: profile.phone}
        });
      }, (error: any) => {
        if (error.status === 409) {
          // http conflict
          this.notificationService.addPopup({
            title: 'Account Exists',
            text: 'This account already exists. Please log in instead.',
            buttonTxt: 'CLOSE'
          });
        } else {
          // card error handling
          this.notificationService.addPopup({
            title: 'PROFILE NOT FOUND',
            text: 'Please check that your PLUS! Card number and last name are correct and try again. If you need help, you may reach us at +63 (02) 8981 0025',
            buttonTxt: 'OK'
          });
        }
      }
    );
    /*  tslint:disable max-line-length
    delete profile.cardNumber;
    const cardNumber: string = this.signUpForm.value.cardNumber;
    (cardNumber && cardNumber.length ? this.profileService.verifyCardNumber(cardNumber, profile.lastName, '1') : of(true))
      .pipe(mergeMap((success) => success ? this.authService.signup(profile) : throwError(('err-or')))).subscribe(() => {
        if (this.signUpForm.value.cardNumber) {
          this.sharedDataService.addData({
            phone: profile.phone,
            password: profile.password,
            cardNumber
          });
        }
        this.router.navigate(['sms-validation'], {
          queryParams: {identifier: profile.phone}
        });
      }, (error: any) => {
        if (error.status === 409) {
        // http conflict
          this.notificationService.addPopup({
            title: 'Account Exists',
            text: 'This account already exists. Please log in instead.',
            buttonTxt: 'CLOSE'
          });
        } else {
        // card error handling
          this.notificationService.addPopup({
            title: 'PROFILE NOT FOUND',
            text: 'Please check that your PLUS! Card number and last name are correct and try again. If you need help, you may reach us at +63 (02) 8981 0025',
            buttonTxt: 'OK'
          });
        }
      });
    */
  }
}
