import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationService, ConfigService, IConfig } from '@perx/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public preAuth: boolean;
  public failedAuth: boolean;
  public appAccessToken: string;
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private configService: ConfigService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.failedAuth = false;
  }

  public ngOnInit(): void {
    this.authService.getAppToken().subscribe((res) => {
      this.appAccessToken = res.access_token;
    }, (err) => {
      console.error('Error' + err);
    });
    this.configService.readAppConfig().subscribe(
      (config: IConfig) => {
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
