import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService, IMerchantAdminService, ConfigService, IMerchantProfile } from '@perxtech/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'perx-bcm-pages-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public loginForm: FormGroup;
  public isMerchantNameLoading: boolean;
  public merchantProfile: IMerchantProfile;
  private invitationToken: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService,
    private merchantAdminService: IMerchantAdminService,
    private configService: ConfigService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.isMerchantNameLoading = true;
    this.initForm();
  }

  public ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {
      const param = location.search;
      const notSaveToken: string | null = new URLSearchParams(param).get('invitation_token');
      if (!notSaveToken) {
        return;
      }
      this.invitationToken = notSaveToken;
      this.configService.readAppConfig().pipe(
        switchMap(() => this.merchantAdminService.validateInvite(this.invitationToken))
      ).subscribe(
        (profile: IMerchantProfile) => {
          this.merchantProfile = profile;
        },
        (err) => {
          let message = 'Something went wrong';
          if (err.error) { // actual error response from API
            message = err.error.message;
          }
          this.notificationService.addSnack(message);
          this.router.navigateByUrl('/login');
        }
      ).add(
        () => {
          this.isMerchantNameLoading = false;
        }
      );
    }
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ]],
      confirmPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ]],
    });
  }

  public onSubmit(): void {
    const password: string = this.loginForm.value.password;
    const confirmPassword: string = this.loginForm.value.confirmPassword;

    if (password !== confirmPassword) {
      this.notificationService.addSnack('Passwords do not match.');
      return;
    }

    if (this.loginForm.invalid) {
      return;
    }

    this.merchantAdminService.setupNewMerchantsPassword(this.invitationToken, password).subscribe(
      () => {
        this.notificationService.addSnack('Your password has been saved. Please login');
        this.router.navigateByUrl('/login');
      },
      (err) => {
        // service returns success unless http failure
        let message = 'Something went wrong';
        if (err.error) {
          message = err.error.message;
        }
        this.notificationService.addSnack(message);
      }
    );
  }
}
