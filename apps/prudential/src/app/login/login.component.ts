import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { AuthenticationService } from '@perx/core';
import { NgForm } from '@angular/forms';

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
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.preAuth = environment.preAuth;
    this.failedAuth = false;

  }

  public ngOnInit(): void {
    this.authService.getAppToken().subscribe((res) => {
      this.appAccessToken = res.access_token;
    }, (err) => {
      console.error('Error' + err);
    });
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
