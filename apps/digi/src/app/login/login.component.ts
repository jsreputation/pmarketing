import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationService, ConfigService, IConfig } from '@perxtech/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public preAuth: boolean;
  public failedAuth: boolean;
  public appAccessTokenFetched: boolean;
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private configService: ConfigService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.failedAuth = false;
  }

  public ngOnInit(): void {
    const token = this.authService.getAppAccessToken();
    if (token) {
      this.appAccessTokenFetched = true;
    } else {
      this.authService.getAppToken().subscribe(() => {
        this.appAccessTokenFetched = true;
      }, (err) => {
        console.error(`Error ${err}`);
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
          this.router.navigateByUrl('');
        },
        () => {
          this.failedAuth = true;
        }
      );
    }
  }
}
