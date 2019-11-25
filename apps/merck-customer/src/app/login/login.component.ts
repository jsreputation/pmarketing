import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService, NotificationService, ProfileService } from '@perx/core';
import { HttpErrorResponse } from '@angular/common/http';
import { PageAppearence, PageProperties, BarSelectedItem } from '../page-properties';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, PageAppearence {

  public selectedCountry: string = '852';

  public loginForm: FormGroup;

  private appAccessTokenFetched: boolean = false;

  public currentSelectedLanguage: string = 'en';

  public preAuth: boolean;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: object,
    private authService: AuthenticationService,
    private notificationService: NotificationService,
    private profileService: ProfileService,
    private translateService: TranslateService,
    private cd: ChangeDetectorRef
  ) {
    this.initForm();
    this.preAuth = environment.preAuth;
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      mobileNo: ['', Validators.required],
      password: ['', Validators.required],
      countryCode: [this.selectedCountry, Validators.required]
    });
  }

  public ngOnInit(): void {
    this.currentSelectedLanguage = this.translateService.currentLang || this.translateService.defaultLang;
    this.authService.getAppToken().subscribe(
      () => {
        this.appAccessTokenFetched = true;
      },
      (err) => {
        console.log('Error' + err);
      }
    );

    if (this.preAuth && isPlatformBrowser(this.platformId) && !this.authService.getUserAccessToken()) {
      this.authService.autoLogin().subscribe(
        () => {
          this.router.navigateByUrl('home');
        }
      );
    }
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

    // TODO: Uncomment the following line once merck-customer backend is setup with authentication service
    // const mobileNo = this.selectedCountry + (this.loginForm.get('mobileNo').value as string);

    const mobileNo = (this.loginForm.value.mobileNo as string);
    const countryCode = (this.loginForm.value.countryCode as string);
    const codeAndMobile = countryCode + mobileNo;
    const cleanedMobileNo = codeAndMobile.replace(/[^0-9]/g, ''); // remove non numeric and special characters
    const password: string = this.loginForm.value.password;

    this.authService.login(cleanedMobileNo, password).subscribe(
      () => {
        // set global userID var for GA tracking
        if (!((window as any).primaryIdentifier)) {
          (window as any).primaryIdentifier = mobileNo;
        }

        if (this.authService.getInterruptedUrl()) {
          this.router.navigateByUrl(this.authService.getInterruptedUrl());
        } else {
          this.navigateToNextPageAfterLogin();
        }

      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 0) {
            this.notificationService.addSnack('We could not reach the server');
          } else if (err.status === 401) {
            this.notificationService.addSnack('Invalid credentials');
          }
        }
      }
    );
  }

  public navigateToNextPageAfterLogin(): void {
    this.profileService.getCustomProperties().subscribe(
      (res) => {
        if (res.hasOwnProperty('questionaire_answered') && res.questionaire_answered) {
          this.router.navigateByUrl('/home');
        } else {
          this.router.navigateByUrl('/user-info');
        }
      }
    );
  }

  public goToSignup(): void {
    if (!this.appAccessTokenFetched) {
      return;
    }
    this.router.navigateByUrl('/signup');
  }

  public goToForgotPassword(): void {
    if (!this.appAccessTokenFetched) {
      return;
    }
    const mobileNumber = (this.loginForm.value.mobileNo as string);
    this.router.navigate(['forgot-password'], { state: { country: this.selectedCountry, mobileNo: mobileNumber } });
  }

  public switchLanguage(): void {
    this.translateService.use(this.currentSelectedLanguage);
    this.cd.detectChanges();
  }
}
