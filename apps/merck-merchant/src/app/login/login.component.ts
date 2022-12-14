import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import {
  AuthenticationService,
  ITheme,
  NotificationService,
  ThemesService,
  TokenStorage
} from '@perxtech/core';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public currentSelectedLanguage: string = 'en';
  public theme: ITheme;

  public get name(): AbstractControl | null {
    return this.loginForm.get('name');
  }

  public get email(): AbstractControl | null {
    return this.loginForm.get('email');
  }

  public get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private notificationService: NotificationService,
    private tokenStorage: TokenStorage,
    private translateService: TranslateService,
    private themesService: ThemesService,
    private cd: ChangeDetectorRef
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public ngOnInit(): void {
    this.currentSelectedLanguage = this.translateService.currentLang || this.translateService.defaultLang;

    this.themesService.getThemeSetting().subscribe((theme) => {
      this.theme = theme;
    });
  }

  public onSubmit(): void {
    const merchantUsername = this.loginForm.value.name as string;
    const email = this.loginForm.value.email as string;
    const password: string = this.loginForm.value.password;
    const scope: string = 'merchant_credentials';

    if (!merchantUsername || !email || !password) {
      return;
    }

    this.authService.login(email.toLowerCase(), password, undefined, undefined, scope).subscribe(
      () => {
        // set global userID var for GA tracking
        if (!((window as any).primaryIdentifier)) {
          (window as any).primaryIdentifier = email;
        }

        this.tokenStorage.setAppInfoProperty(merchantUsername, 'merchantUsername');
        this.router.navigateByUrl(this.authService.getInterruptedUrl() ? this.authService.getInterruptedUrl() : '/home');
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 0) {
            this.notificationService.addSnack('We could not reach the server');
          } else if (err.status === 401) {
            [this.loginForm.controls.name, this.loginForm.controls.email, this.loginForm.controls.password]
              .forEach(c => c.setErrors({
                invalid: true,
              }));
            this.notificationService.addSnack('Invalid credentials');
          }
        }
      }
    );
  }

  public onForgotPassword(): void {
    this.router.navigateByUrl('/forgot');
  }

  public switchLanguage(): void {
    this.translateService.use(this.currentSelectedLanguage);
    this.cd.detectChanges();
  }

}
