import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { AuthenticationService } from '@perx/core/dist/perx-core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  authed: boolean;
  preAuth: boolean;
  failedAuth: boolean;

  constructor(private router: Router,
              private authService: AuthenticationService,
              @Inject(PLATFORM_ID) private platformId: object,
              private fb: FormBuilder) {
    this.preAuth = environment.preAuth;
    this.failedAuth = false;
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      playerCode: ['', Validators.required],
      hsbcCardLastFourDigits: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.preAuth) {
      if (isPlatformBrowser(this.platformId) && !this.authService.authing) {
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

  onSubmit() {
    const username = this.loginForm.get('playerCode').value;
    const password = this.loginForm.get('hsbcCardLastFourDigits').value;
    const mechId = '2';

    this.authService.v4GameOauth(username, password, mechId).then(
      (isAuthed: boolean) => {
        this.authed = isAuthed;
        if (this.authed) {
          if (this.authService.getInterruptedUrl()) {
            this.router.navigateByUrl(this.authService.getInterruptedUrl());
          } else {
            this.router.navigateByUrl('draw');
          }
        }
      },
      (err) => {
        this.failedAuth = true;
        this.authed = false;
      }
    );
  }
}
