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
  public authed: boolean;
  public preAuth: boolean;
  public failedAuth: boolean;

  constructor(private router: Router,
              private authService: AuthenticationService,
              @Inject(PLATFORM_ID) private platformId: object) {
    this.preAuth = environment.preAuth;
    this.failedAuth = false;
  }

  public ngOnInit(): void {
    if (this.preAuth) {
      if (isPlatformBrowser(this.platformId) && !this.authService.authing) {
        this.authService.isAuthorized().subscribe(
          authed => {
            if (!authed) {
              this.authService.v4AutoLogin().then(
                (isAuthed: boolean) => {
                  this.authed = isAuthed;
                  if (this.authed) {
                    this.router.navigateByUrl(this.authService.getInterruptedUrl());
                  } else {
                    this.router.navigateByUrl('games');
                  }
                },
                () => {
                  this.failedAuth = true;
                  this.authed = false;
                }
              );
            } else {
              this.authed = authed;
            }
          },
        );
      }
    }
  }

  // TODO: error states
  public onSubmit(loginForm: NgForm): void {
    const username = loginForm.value.username.toUpperCase();
    const password = loginForm.value.password;

    this.authService.v4GameOauth(username, password).then(
      (isAuthed: boolean) => {
        this.authed = isAuthed;
        if (this.authService.getInterruptedUrl()) {
          this.router.navigateByUrl(this.authService.getInterruptedUrl());
        } else {
          this.router.navigateByUrl('rewards/list');
        }
      }
    ).catch(() => {
      this.failedAuth = true;
      this.authed = false;

      // if (err instanceof HttpErrorResponse) {
      //   if (err.status === 0) {
      //     this.notificationService.addPopup({
      //       title: 'We could not reach the server',
      //       text: 'Please try again soon'
      //     });
      //   } else if (err.status === 401) {
      //     [this.loginForm.controls.playerCode, this.loginForm.controls.hsbcCardLastFourDigits]
      //       .forEach(c => c.setErrors({
      //         invalid: true
      //       }));
      //     this.errorMessage = 'Invalid credentials';
      //   }
      // }
    });
  }
}
