import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  Validators,
  FormBuilder,
  FormGroup,
  AbstractControl,
} from '@angular/forms';

import {
  AuthenticationService,
  NotificationService,
  IProfile,
} from '@perxtech/core';

import {
  PageAppearence,
  PageProperties,
  BarSelectedItem,
} from '../page-properties';

@Component({
  selector: 'mc-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements PageAppearence {

  public signupForm: FormGroup;
  public selectedCountry: string = '+852';
  public appAccessTokenFetched: boolean;

  public get name(): AbstractControl | null {
    return this.signupForm.get('name');
  }

  public get mobileNo(): AbstractControl | null {
    return this.signupForm.get('mobileNo');
  }

  public get password(): AbstractControl | null {
    return this.signupForm.get('password');
  }

  public get confirmPassword(): AbstractControl | null {
    return this.signupForm.get('confirmPassword');
  }

  public get accept_terms(): AbstractControl | null {
    return this.signupForm.get('accept_terms');
  }

  public get accept_marketing(): AbstractControl | null {
    return this.signupForm.get('accept_marketing');
  }

  public get countryCode(): AbstractControl | null {
    return this.signupForm.get('countryCode');
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private notificationService: NotificationService,
    private translate: TranslateService
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
        console.error(`Error${err}`);
      });
    }
  }
  private initForm(): void {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      mobileNo: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      accept_terms: [false, Validators.required],
      accept_marketing: [false, Validators.required],
      countryCode: ['852', Validators.required]
    });
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
    try {
      const passwordString = this.signupForm.value.password as string;
      const confirmPassword = this.signupForm.value.confirmPassword as string;
      if (passwordString !== confirmPassword) {
        this.translate.get('SIGN_UP_PAGE.PASSWORD_NOT_MATCH').subscribe(text =>
          this.notificationService.addSnack(text)
        );
        return;
      }
      const termsConditions = this.signupForm.value.accept_terms as boolean;
      if (!termsConditions) {
        this.translate.get('SIGN_UP_PAGE.ACCEPT_TNC').subscribe(text =>
          this.notificationService.addSnack(text)
        );
        return;
      }

      const marketingCommunication = this.signupForm.value.accept_marketing as boolean;
      if (!marketingCommunication) {
        this.translate.get('SIGN_UP_PAGE.ACCEPT_MARKETING').subscribe(text =>
          this.notificationService.addSnack(text)
        );
        return;
      }

      // TODO: Currently '+' sign is not beign saved in the backend
      // const mobileNumber = this.selectedCountry + this.signupForm.get('mobileNo').value as string;

      const mobileNumber = this.signupForm.value.mobileNo.toString();
      const name = this.signupForm.value.name as string;
      const countryCode = this.signupForm.value.countryCode as string;
      const codeAndMobile = countryCode + mobileNumber;
      const cleanedMobileNo = codeAndMobile.replace(/[^0-9]/g, ''); // remove non numeric and special characters

      const signUpData = {
        firstName: '',
        lastName: name,
        middleName: '',
        phone: cleanedMobileNo,
        password: passwordString,
        passwordConfirmation: confirmPassword
      };

      this.authService.signup(signUpData).subscribe(
        (data: IProfile | null) => {
          if (!data) {
            return;
          }

          this.router.navigate(['enter-pin/register'], { state: { mobileNo: cleanedMobileNo } });
        },
        err => {
          this.notificationService.addSnack(err.error.message);
        });
    } catch (error) {
      console.log(error);
    }
  }

  public goToLogin(): void {
    this.router.navigateByUrl('/login');
  }
}
