import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
              private route: ActivatedRoute, 
              private authService: AuthenticationService,
              @Inject(PLATFORM_ID) private platformId: object,
              private fb: FormBuilder) {
    this.preAuth = environment.preAuth;
    this.failedAuth = false;
    this.initForm();
  }

  initForm() {
    const primaryIdentifier = this.route.snapshot.queryParamMap.get('pi') || '';
    this.loginForm = this.fb.group({
      playerCode: ['', Validators.required],
      custNumLastSixDigits: [primaryIdentifier, Validators.required]
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

  onSubmit() {
    const username = this.loginForm.get('custNumLastSixDigits').value;
    const campaignId = '41';

    this.authService.v4GameOauth('test97', '1234', undefined, campaignId).then(
      (isAuthed: boolean) => {
        this.authed = isAuthed;
        if (this.authed) {

          // set global userID var for GA tracking
          if (!((window as any).primaryIdentifier)) {
            (window as any).primaryIdentifier = username;
          }

          if (this.authService.getInterruptedUrl()) {
            this.router.navigateByUrl(this.authService.getInterruptedUrl());
          } else {
            this.router.navigateByUrl('game');
          }
        }
      },
      () => {
        this.failedAuth = true;
        this.authed = false;
      }
    );
  }
}
