import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, ConfigService, IConfig } from '@perx/core';
import { isPlatformBrowser } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public preAuth: boolean;
  public failedAuth: boolean;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private configService: ConfigService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.failedAuth = false;
  }

  public ngOnInit(): void {
    this.configService.readAppConfig().subscribe(
      (config: IConfig) => {
        this.preAuth = config.preAuth as boolean;
      }
    );

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
    this.router.navigateByUrl(this.authService.getInterruptedUrl() ? this.authService.getInterruptedUrl() : 'rewards/list');
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
