import {
  Component,
  OnInit,
} from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import {Router} from '@angular/router';

import {
  of,
  throwError,
} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

import {
  AuthenticationService,
  ISignUpData, NotificationService,
  ProfileService,
} from '@perx/core';

import {SharedDataService} from 'src/app/services/shared-data.service';

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
    private profileService: ProfileService,
    private notificationService: NotificationService,
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
    const profile = {...this.signUpForm.value};
    delete profile.accept_terms;
    delete profile.cardNumber;
    const cardNumber: string = this.signUpForm.value.cardNumber;
    (profile as ISignUpData).passwordConfirmation = password;
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
    }, () => {
      // card error handling
      this.notificationService.addPopup({
        title: 'PROFILE NOT FOUND',
        text: `Please check that your Plus! Card number and last name are correct and try again. \nIf you need help, you may reach us at +63 (02) 981 0025`,
        buttonTxt: 'OK'
      });
    });
  }
}
