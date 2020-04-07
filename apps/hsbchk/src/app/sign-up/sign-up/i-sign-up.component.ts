import { OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, ISignUpData, ITheme, NotificationService, ThemesService } from '@perxtech/core';
import { Observable, Subject } from 'rxjs';

export abstract class ISignUpComponent implements OnDestroy {
  public signupForm: FormGroup;
  public errorMessage: string | null;
  public appAccessTokenFetched: boolean = false;
  public loadingSubmit: boolean = false;
  protected destroy$: Subject<void> = new Subject();
  public theme: Observable<ITheme>;

  protected abstract get mobileNumber(): string;

  constructor(
    protected fb: FormBuilder,
    protected router: Router,
    protected themesService: ThemesService,
    protected authService: AuthenticationService,
    protected notificationService: NotificationService
  ) { }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public goToLogin(): void {
    this.router.navigateByUrl('/signin');
  }

  protected getAppToken(): void {
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

  protected initForm(): void {
    this.signupForm = this.fb.group({
      nickname: ['', Validators.required],
      referralCode: [''],
      fullName: [''],
      hkid: ['', [Validators.minLength(4), Validators.maxLength(4), Validators.pattern('[0-9]*')]],
      mobileNo: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      accept_terms: [false, Validators.required],
      accept_marketing: [false]
    });
  }

  protected fetchTheme(): void {
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

  public onSubmit(): void {
    if (!this.appAccessTokenFetched) {
      this.errorMessage = 'Unknown error occured.';
      return;
    }

    const passwordString = this.signupForm.value.password;
    const confirmPassword = this.signupForm.value.confirmPassword;
    if (passwordString !== confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    const nickname = this.signupForm.value.nickname;
    const referralCode = this.signupForm.value.referralCode;
    const hkid = this.signupForm.value.hkid;
    const mobileNumber = this.mobileNumber;
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
}
