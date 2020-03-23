import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthenticationService, ConfigService, IConfig } from '@perxtech/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public appAccessTokenFetched: boolean;
  public preAuth: boolean;
  public failedAuth: boolean;
  constructor(
    private router: Router,
    private configService: ConfigService,
    private authService: AuthenticationService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.failedAuth = false;

  }

  public ngOnInit(): void {
    this.configService.readAppConfig().subscribe(
      (config: IConfig<void>) => {
        this.preAuth = config.preAuth as boolean;
      }
    );
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
    if (this.preAuth && isPlatformBrowser(this.platformId) && !this.authService.getUserAccessToken()) {
      this.authService.autoLogin().subscribe(
        () => {
          this.redirectAfterLogin();
        },
        () => {
          this.failedAuth = true;
        }
      );
    }
  }

  public redirectAfterLogin(): void {
    this.router.navigateByUrl(this.authService.getInterruptedUrl() ? this.authService.getInterruptedUrl() : 'game');
  }

  // TODO: error states
  public onSubmit(loginForm: NgForm): void {
    const username = loginForm.value.username;
    const password = loginForm.value.password;
    const mechId = '2';

    this.authService.login(username, password, mechId).subscribe(
      () => {
        this.redirectAfterLogin();
      },
      () => {
        this.failedAuth = true;
      }
    );
  }
}
