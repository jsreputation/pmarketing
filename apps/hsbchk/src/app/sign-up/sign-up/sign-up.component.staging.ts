import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, NotificationService, ISignUpData, ThemesService, ITheme, GeneralStaticDataService, ICountryCode } from '@perxtech/core';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit, OnDestroy {
  public signupForm: FormGroup;
  public errorMessage: string | null;
  public appAccessTokenFetched: boolean = false;
  public loadingSubmit: boolean = false;
  private destroy$: Subject<any> = new Subject();
  public theme: Observable<ITheme>;
  public countryCode: string;
  public countriesList$: Observable<ICountryCode[]>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private themesService: ThemesService,
    private authService: AuthenticationService,
    private notificationService: NotificationService,
    private generalStaticDataService: GeneralStaticDataService
  ) {
    this.initForm();
    this.getAppToken();
  }

  public ngOnInit(): void {
    this.countriesList$ = this.generalStaticDataService.getCountriesList([
      'Hong Kong',
      'Singapore'
    ]);
    this.initForm();
    const token = this.authService.getAppAccessToken();
    if (token) {
      this.appAccessTokenFetched = true;
      this.theme = this.themesService.getThemeSetting();
    } else {
      this.authService.getAppToken().subscribe(() => {
        this.appAccessTokenFetched = true;
        this.theme = this.themesService.getThemeSetting();
      }, (err) => {
        console.error(`Error${err}`);
      });
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
      nickname: ['', Validators.required],
      referralCode: [''],
      fullName: [''],
      hkid: [''],
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
      this.errorMessage = 'Unknown error occurred.';
      return;
    }

    const passwordString = this.signupForm.get('password').value;
    const confirmPassword = this.signupForm.get('confirmPassword').value;
    if (passwordString !== confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    const nickname = this.signupForm.value.nickname;
    const referralCode = this.signupForm.value.referralCode;
    const hkid = this.signupForm.value.hkid;
    const mobileNumber = `${this.countryCode}${this.signupForm.value.mobileNo}`;
    const emailValue = this.signupForm.value.email;
    const lastName = this.signupForm.value.fullName ? this.signupForm.value.fullName : nickname;

    const signUpData: ISignUpData = {
      lastName,
      email: emailValue,
      phone: mobileNumber,
      password: passwordString,
      passwordConfirmation: confirmPassword,
      customProperties: {
        nickname,
        referralCode,
        hkid
      }
    };

    this.loadingSubmit = true;

    this.authService.signup(signUpData).subscribe(
      () => {
        this.router.navigateByUrl('otp/register', { state: { mobileNo: mobileNumber } });
      },
      err => {
        this.notificationService.addSnack(err.error.message);
      });
  }

  public goToLogin(): void {
    this.router.navigateByUrl('/signin');
  }

  public updateCoutryCode(value: string): void {
    this.countryCode = value.substring(1);
  }
}
