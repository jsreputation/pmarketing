import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthenticationService, NotificationService, ConfigService, IConfig } from '@perx/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  public preAuth: boolean;
  public appAccessTokenFetched: boolean;
  public errorMessage: string | null;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    @Inject(PLATFORM_ID) private platformId: object,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private configService: ConfigService,
  ) {
    this.initForm();
  }

  public initForm(): void {
    this.loginForm = this.fb.group({
      playerCode: ['', Validators.required],
      hsbcCardLastFourDigits: ['', Validators.required]
    });
  }

  public ngOnInit(): void {
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
    this.configService.readAppConfig().subscribe(
      (config: IConfig<void>) => {
        this.preAuth = config.preAuth as boolean;
      }
    );

    if (this.preAuth && isPlatformBrowser(this.platformId) && !this.authService.getUserAccessToken()) {
      this.authService.autoLogin().subscribe(
        () => {
          this.redirectAfterLogin();
        }
      );
    }
  }

  public redirectAfterLogin(): void {
    this.router.navigateByUrl(this.authService.getInterruptedUrl() ? this.authService.getInterruptedUrl() : 'home');
  }

  public onSubmit(): void {
    const username = (this.loginForm.value.playerCode as string).toUpperCase();
    const password: string = this.loginForm.value.hsbcCardLastFourDigits;
    this.errorMessage = null;
    this.authService.login(username, password).subscribe(
      () => {
        this.redirectAfterLogin();
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 0) {
            this.notificationService.addPopup({
              title: 'We could not reach the server',
              text: 'Please try again soon'
            });
          } else if (err.status === 401) {
            [this.loginForm.controls.playerCode, this.loginForm.controls.hsbcCardLastFourDigits]
              .forEach(c => c.setErrors({
                invalid: true
              }));
            this.errorMessage = 'Invalid credentials';
          }
        } else {
          this.errorMessage = err;
        }
      }
    );
  }
}
