import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthenticationService, NotificationService } from '@perx/core';
import { HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  public authed: boolean;
  public preAuth: boolean;
  public failedAuth: boolean;

  public errorMessage: string;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    @Inject(PLATFORM_ID) private platformId: object,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {
    this.preAuth = environment.preAuth;
    this.failedAuth = false;
    this.initForm();
  }

  public initForm(): void {
    this.loginForm = this.fb.group({
      playerCode: ['', Validators.required],
      hsbcCardLastFourDigits: ['', Validators.required]
    });
  }

  public ngOnInit(): void {
    if (!this.preAuth) {
      return;
    }

    if (!isPlatformBrowser(this.platformId) || this.authService.authing) {
      return;
    }

    this.authService.isAuthorized().subscribe(
      authed => {
        if (!authed) {
          this.authService.autoLogin().then(
            (isAuthed: boolean) => {
              this.authed = isAuthed;
              if (this.authed) {
                this.router.navigateByUrl(this.authService.getInterruptedUrl());
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

  public async onSubmit(): Promise<void> {
    const username = (this.loginForm.get('playerCode').value as string).toUpperCase();
    const password: string = this.loginForm.get('hsbcCardLastFourDigits').value;
    this.errorMessage = null;
    try {
      const isAuthed = await this.authService.v4GameOauth(username, password);
      this.authed = isAuthed;

      if (this.authed) {
        // set global userID var for GA tracking
        if (!((window as any).primaryIdentifier)) {
          (window as any).primaryIdentifier = username;
        }
        if (this.authService.getInterruptedUrl()) {
          this.router.navigateByUrl(this.authService.getInterruptedUrl());
        } else {
          this.router.navigateByUrl('home');
        }
      }
    } catch (err) {
      this.failedAuth = true;
      this.authed = false;
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
      }
    }
  }
}
