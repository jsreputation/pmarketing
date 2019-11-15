import { AuthenticationService, NotificationService, Config, ITheme, ThemesService } from '@perx/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'perx-blackcomb-pages-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public errorMessage: string;
  public preAuth: boolean;
  public failedAuth: boolean;
  private destroy$: Subject<any> = new Subject();
  public theme: Observable<ITheme>;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private notificationService: NotificationService,
    private themesService: ThemesService,
    private config: Config,
    public translate: TranslateService
  ) {
    this.preAuth = this.config ? this.config.preAuth : false;
  }

  public ngOnInit(): void {
    this.initForm();
    this.theme = this.themesService.getThemeSetting();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public redirectAfterLogin(): void {
    this.router.navigateByUrl(this.authService.getInterruptedUrl() ? this.authService.getInterruptedUrl() : 'wallet');
  }

  public initForm(): void {
    this.loginForm = this.fb.group({
      customerID: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public goToSignup(): void {
    this.router.navigateByUrl('/signup');
  }

  public onSubmit(): void {
    const username = (this.loginForm.get('customerID').value as string);
    const password: string = this.loginForm.get('password').value;
    this.errorMessage = null;
    this.authService.login(username, password, '2')
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        () => {
          // set global userID var for GA tracking
          if (!((window as any).primaryIdentifier)) {
            (window as any).primaryIdentifier = username;
          }
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
              [this.loginForm.controls.customerID, this.loginForm.controls.password]
                .forEach(c => c.setErrors({
                  invalid: true
                }));
              this.translate.get('INVALID_CREDENTIALS')
                // tslint:disable-next-line: rxjs-no-nested-subscribe
                .subscribe(t => this.errorMessage = t);
            }
          } else {
            this.errorMessage = err;
          }
        }
      );
  }
}
