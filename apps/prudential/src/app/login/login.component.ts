import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { AuthenticationService } from '@perx/core/dist/perx-core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authed: boolean;
  preAuth: boolean;
  failedAuth: boolean;

  constructor(private router: Router,
              private authService: AuthenticationService,
              @Inject(PLATFORM_ID) private platformId: object) {
    this.preAuth = environment.preAuth;
    this.failedAuth = false;

  }

  ngOnInit() {
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
                    this.router.navigateByUrl('game');
                  }
                },
                (err) => {
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
  onSubmit(loginForm: NgForm) {
    const username = loginForm.value.username;
    const password = loginForm.value.password;
    const mechId = '2';

    this.authService.v4GameOauth(username, password, mechId).then(
      (isAuthed: boolean) => {
        this.authed = isAuthed;
        if (this.authed) {
          this.router.navigateByUrl(this.authService.getInterruptedUrl());
        } else {
          this.router.navigateByUrl('game');
        }
      },
      (err) => {
        this.failedAuth = true;
        this.authed = false;
      }
    );
  }
}
