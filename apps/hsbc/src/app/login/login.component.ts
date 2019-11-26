import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

import {
  switchMap,
  tap,
} from 'rxjs/operators';

import {
  AuthenticationService,
  ConfigService,
  IConfig,
  NotificationService,
  IMicrositeSettings,
  TokenStorage,
  isEmptyString,
} from '@perx/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  public preAuth: boolean;
  public loginBackgroundUrl: string;
  public errorMessage: string | null;
  public sourceType: string;
  public isLoading: boolean = true;
  public appAccessToken: string;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    @Inject(PLATFORM_ID) private platformId: object,
    private fb: FormBuilder,
    private configService: ConfigService,
    private notificationService: NotificationService,
    private tokenStorage: TokenStorage
  ) {
    this.initForm();
  }

  public get playerCode(): AbstractControl | null {
    return this.loginForm.get('playerCode');
  }

  public get hsbcCardLastFourDigits(): AbstractControl | null {
    return this.loginForm.get('hsbcCardLastFourDigits');
  }

  public initForm(): void {
    this.loginForm = this.fb.group({
      playerCode: ['', Validators.required],
      hsbcCardLastFourDigits: ['', Validators.required]
    });
  }

  public ngOnInit(): void {
    this.authService.getAppToken().subscribe((token) => {
      this.appAccessToken = token.access_token;
    }, (err) => {
      console.error('Error' + err);
    });
    this.configService.readAppConfig().pipe(
      tap((config: IConfig) => {
        this.preAuth = config.preAuth as boolean;
        if (this.preAuth && isPlatformBrowser(this.platformId) && !this.authService.getUserAccessToken()) {
          this.authService.autoLogin().subscribe(
            () => {
              this.router.navigateByUrl(this.authService.getInterruptedUrl() ? this.authService.getInterruptedUrl() : 'puzzle');
            }
          );
        }
      }),
      tap(() => this.tokenStorage.clearAppInfoProperty(['userAccessToken', 'appAccessToken'])),
      switchMap((config: IConfig) => this.configService.getTenantAppSettings(config.sourceType as string))
    ).subscribe((settings: IMicrositeSettings) => {
      this.loginBackgroundUrl = settings.jsonValue.background as string;
      this.sourceType = settings.jsonValue.source_type as string;
      this.isLoading = false;
    });
  }

  public onSubmit(): void {
    const username: string | null = this.playerCode ? (this.playerCode.value as string).toUpperCase() : null;
    const password: string | null = this.hsbcCardLastFourDigits ? (this.hsbcCardLastFourDigits.value as string).toUpperCase() : null;
    this.errorMessage = null;
    if (isEmptyString(username) || isEmptyString(password)) {
      throw new Error(`username or password is required`);
    }

    this.authService.login(username as string, password as string).subscribe(
      () => {
        // set global userID var for GA tracking
        if (!((window as any).primaryIdentifier)) {
          (window as any).primaryIdentifier = username;
        }

        this.router.navigateByUrl(this.authService.getInterruptedUrl() ? this.authService.getInterruptedUrl() : 'puzzle');
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
