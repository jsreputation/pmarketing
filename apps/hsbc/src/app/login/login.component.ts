import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {Router} from '@angular/router';
import {isPlatformBrowser} from '@angular/common';
import {AuthenticationService, ConfigService, IConfig, NotificationService, IMicrositeSettings, TokenStorage} from '@perx/core';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  public preAuth: boolean;
  public loginBackgroundUrl: string;
  public errorMessage: string;
  public sourceType: string;
  public isLoading: boolean = true;

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

  public initForm(): void {
    this.loginForm = this.fb.group({
      playerCode: ['', Validators.required],
      hsbcCardLastFourDigits: ['', Validators.required]
    });
  }

  public ngOnInit(): void {
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
    const username = (this.loginForm.get('playerCode').value as string).toUpperCase();
    const password: string = this.loginForm.get('hsbcCardLastFourDigits').value;
    this.errorMessage = null;

    this.authService.login(username, password).subscribe(
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
