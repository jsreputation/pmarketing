import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators, } from '@angular/forms';

import { AuthenticationService, IProfile, ITheme, NotificationService, ThemesService } from '@perxtech/core';

import { BarSelectedItem, PageAppearence, PageProperties, } from '../page-properties';

@Component({
  selector: 'mc-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, PageAppearence {

  public signupForm: FormGroup;
  public selectedCountry: string = '+852';
  public appAccessTokenFetched: boolean;
  public theme: ITheme;
  public currentSelectedLanguage: string = 'en';

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

  public get countryCode(): AbstractControl | null {
    return this.signupForm.get('countryCode');
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private notificationService: NotificationService,
    private translate: TranslateService,
    private themesService: ThemesService,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {
    this.initForm();
    this.getAppToken();
  }

  public ngOnInit(): void {
    this.currentSelectedLanguage = this.translate.currentLang || this.translate.defaultLang;
    this.themesService.getThemeSetting().subscribe((theme) => {
      this.theme = theme;
    });

    this.route.queryParams.subscribe((params: Params) => {
      const phoneParam: string = params.phone;
      let countryCode, mobileNo;
      if (phoneParam) {
        if (phoneParam.startsWith('852')) {
          countryCode = '852';
          mobileNo = phoneParam.substring(3);
        } else if (phoneParam.startsWith('853')) {
          countryCode = '853';
          mobileNo = phoneParam.substring(3);
        } else if (phoneParam.startsWith('86')) {
          countryCode = '86';
          mobileNo = phoneParam.substring(2);
        } else if (phoneParam.startsWith('65')) {
          countryCode = '65';
          mobileNo = phoneParam.substring(2);
        }
        this.signupForm.controls.countryCode.setValue(countryCode);
        this.signupForm.controls.mobileNo.setValue(mobileNo);
      }
      });
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
      // name: ['', Validators.required],
      mobileNo: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      accept_terms: [false, Validators.required],
      countryCode: ['852', Validators.required]
    }, {validator: this.matchingPasswords('password', 'confirmPassword')});
  }

  public matchingPasswords(passwordKey: string, passwordConfirmationKey: string): (group: FormGroup) => void {
    return (group: FormGroup) => {
        const password = group.controls[passwordKey];
        const passwordConfirmation = group.controls[passwordConfirmationKey];
        if (password.value !== passwordConfirmation.value) {
            return passwordConfirmation.setErrors({mismatchedPasswords: true});
        }
        passwordConfirmation.setErrors(null);
    };
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
      const termsConditions = this.signupForm.value.accept_terms as boolean;
      if (!termsConditions) {
        this.translate.get('SIGN_UP_PAGE.ACCEPT_TNC').subscribe(text =>
          this.notificationService.addSnack(text)
        );
        return;
      }

      // TODO: Currently '+' sign is not beign saved in the backend
      // const mobileNumber = this.selectedCountry + this.signupForm.get('mobileNo').value as string;

      const mobileNumber = this.signupForm.value.mobileNo.toString();
      // const name = this.signupForm.value.name as string;
      const countryCode = this.signupForm.value.countryCode as string;
      const codeAndMobile = countryCode + mobileNumber;
      const cleanedMobileNo = codeAndMobile.replace(/[^0-9]/g, ''); // remove non numeric and special characters

      const signUpData = {
        firstName: '',
        lastName: '',
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

          this.router.navigate(['enter-pin/register'],
            { state:
              {
                mobileNo: cleanedMobileNo,
                countryCode: countryCode.toString()
              }
            }
          );
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

  public goTermAndCondition(): void {
    this.router.navigateByUrl('/c/tnc');
  }

  public switchLanguage(): void {
    this.translate.use(this.currentSelectedLanguage);
    this.cd.detectChanges();
  }
}
