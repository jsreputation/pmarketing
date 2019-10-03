import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@perx/core';
import { environment } from '../../environments/environment';
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
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.preAuth = environment.preAuth;
    this.failedAuth = false;
  }

  public ngOnInit(): void {
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
