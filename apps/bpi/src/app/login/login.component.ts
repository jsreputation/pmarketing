import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthenticationService, ConfigService, IConfig } from '@perxtech/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public isHidden: boolean = true;
  protected preAuth: boolean;
  public appAccessTokenFetched: boolean;
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private configService: ConfigService,
    @Inject(PLATFORM_ID) private platformId: object
  ) { }

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
        this.onSubmit();
      }
    );

  }

  public onSubmit(): void {
    if (this.preAuth && isPlatformBrowser(this.platformId)) {
      this.authService.autoLogin().subscribe(
        () => {
          this.router.navigateByUrl(this.authService.getInterruptedUrl() ? this.authService.getInterruptedUrl() : 'bpi/landing');
        }
      );
    }
  }
}
