import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { AuthenticationService } from '@perx/core/dist/perx-core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  private authed: boolean;
  protected preAuth: boolean;
  protected failedAuth: boolean;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService: AuthenticationService,
              @Inject(PLATFORM_ID) private platformId: object) {
    this.preAuth = environment.preAuth;
    this.failedAuth = false;
  }

  public ngOnInit(): void {
    const primaryIdentifier = this.route.snapshot.queryParamMap.get('pi') || '';
    if (!!primaryIdentifier) {
      (window as any).primaryIdentifier = primaryIdentifier;
    }
  }

  public onSubmit(): void {
    if (isPlatformBrowser(this.platformId) && !this.authService.authing) {
      this.authService.v4AutoLogin().then(
        (isAuthed: boolean) => {
          this.authed = isAuthed;
          if (this.authed) {
            this.router.navigateByUrl(this.authService.getInterruptedUrl());
          } else {
            this.router.navigateByUrl('landing');
          }
        },
        (_) => {
          this.failedAuth = true;
          this.authed = false;
        }
      );
    }
  }
}
