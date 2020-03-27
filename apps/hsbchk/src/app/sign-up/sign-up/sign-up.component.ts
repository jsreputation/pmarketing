import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, NotificationService, ISignUpData, ThemesService, ITheme } from '@perxtech/core';
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
  private destroy$: Subject<void> = new Subject();
  public theme: Observable<ITheme>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private themesService: ThemesService,
    private authService: AuthenticationService,
    private notificationService: NotificationService
  ) {
    this.initForm();
    this.getAppToken();
  }

  public ngOnInit(): void {
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
      accept_marketing: [false]
    });
  }

  public onSubmit(): void {
    if (!this.appAccessTokenFetched) {
      this.errorMessage = 'Unknown error occured.';
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
    const mobileNumber = `852${this.signupForm.value.mobileNo}`;
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
}
