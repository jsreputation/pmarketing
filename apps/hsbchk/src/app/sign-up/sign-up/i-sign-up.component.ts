import { OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, ISignUpData, ITheme, NotificationService, ThemesService, equalityValidator } from '@perxtech/core';
import { Observable, Subject, combineLatest } from 'rxjs';
import { distinctUntilChanged, takeUntil, startWith } from 'rxjs/operators';

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
    const hkidValidators: ValidatorFn[] = [Validators.minLength(4), Validators.maxLength(4), Validators.pattern('[0-9]*')];
    this.signupForm = this.fb.group({
      nickname: ['', Validators.required],
      referralCode: [''],
      fullName: [''],
      hkid: ['', hkidValidators],
      mobileNo: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      accept_terms: [false, Validators.required],
      accept_marketing: [false]
    }, { validators: [equalityValidator('password', 'confirmPassword')] });

    // monitor fields related to lucky-draw in order to adjust the validators if any of the fields is being filled
    combineLatest([
      this.signupForm.controls.hkid.valueChanges.pipe(startWith('')),
      this.signupForm.controls.fullName.valueChanges.pipe(startWith('')),
      this.signupForm.controls.accept_marketing.valueChanges.pipe(startWith(false))
    ])
      .pipe(
        distinctUntilChanged((a: [string, string, boolean], b: [string, string, boolean]) => {
          if (a.length !== b.length) {
            return false;
          }
          for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
              return false;
            }
          }
          return true;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(([hkid, name, checkbox]) => {
        if (name !== '' || hkid !== '' || checkbox !== false) {
          // as soon as one of the fields is not empty make the 3 fields mandatory
          this.signupForm.controls.hkid.setValidators([...hkidValidators, Validators.required]);
          this.signupForm.controls.fullName.setValidators([Validators.required]);
          this.signupForm.controls.accept_marketing.setValidators([Validators.required]);
        } else {
          // if the fields are empty make the 3 fields optional
          this.signupForm.controls.hkid.setValidators(hkidValidators);
          this.signupForm.controls.fullName.clearValidators();
          this.signupForm.controls.accept_marketing.clearValidators();
        }
        this.signupForm.controls.hkid.updateValueAndValidity();
        this.signupForm.controls.fullName.updateValueAndValidity();
        this.signupForm.controls.accept_marketing.updateValueAndValidity();
        console.log(this.signupForm.controls.accept_marketing);
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
    if (!this.signupForm.valid) {
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
    // for some strange reason, the automated addition of the validator on accept_marketing field does not seem to work.
    // so we do it now
    if ((name !== '' || hkid !== '') && this.signupForm.value.accept_marketing === false) {
      this.signupForm.controls.accept_marketing.setErrors({ required: true });
      return;
    }

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
