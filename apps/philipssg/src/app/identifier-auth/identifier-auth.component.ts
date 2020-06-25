import { Component, OnInit } from '@angular/core';
import { AuthenticationService, ITheme, NotificationService, ThemesService } from '@perxtech/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-identifier-auth',
  templateUrl: './identifier-auth.component.html',
  styleUrls: ['./identifier-auth.component.scss']
})
export class IdentifierAuthComponent implements OnInit {
  public loginForm: FormGroup;
  public errorMessage: string | null;
  public theme: ITheme;

  constructor(
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private themesService: ThemesService,
    private router: Router,
  ) {
    // attempt to first login automatically
    if (!this.authService.getUserAccessToken()) {
      this.authService.autoLogin().subscribe(
        () => {
          this.redirectAfterLogin();
        }
      );
    }
    this.loginForm = this.fb.group({
      personalId: ['', Validators.required],
    });
  }

  public ngOnInit(): void {
    this.themesService.getThemeSetting().subscribe(
      theme => {
        this.theme = theme;
      });
  }

  public onSubmit(): void {
    (window as any).primaryIdentifier = this.loginForm.value.personalId;
    this.authService.autoLogin().subscribe(
      () => {
        this.redirectAfterLogin();
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 0) {
            this.notificationService.addPopup({
              title: 'We could not reach the server',
              text: 'Please try again soon'
            });
          } else if (err.status === 401) {
            this.loginForm.controls.personalId.setErrors({
              invalid: true
            });
            this.errorMessage = 'Invalid credentials';
          }
        } else {
          this.errorMessage = err;
        }
      }
    );
  }
  public redirectAfterLogin(): void {
    const campaignId = JSON.parse(localStorage.getItem('cid'));
    this.router.navigate([`/game/${campaignId}`]);
  }
}
