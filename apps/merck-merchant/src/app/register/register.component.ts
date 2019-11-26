import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IMerchantAdminService, NotificationService, IMerchantProfile, AuthenticationService } from '@perx/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public loginForm: FormGroup;
  public isMerchantNameLoading: boolean;
  public merchantProfile: IMerchantProfile;
  private invitationToken: string;
  private clientId: string;
  public appAccessToken: string;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService,
    private merchantAdminService: IMerchantAdminService,
    private authService: AuthenticationService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.isMerchantNameLoading = true;
    this.initForm();
    this.getAppToken();
  }
  private getAppToken(): void {
    this.authService.getAppToken().subscribe((res) => {
      this.appAccessToken = res.access_token;
    }, (err) => {
      console.error('Error' + err);
    });
  }
  public ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {
      const param = location.search;
      const notSaveToken: string | null = new URLSearchParams(param).get('invitation_token');
      const notSaveClientId: string | null = new URLSearchParams(param).get('client_id');
      if (!notSaveToken || !notSaveClientId) {
        return;
      }
      this.invitationToken = notSaveToken;
      this.clientId = notSaveClientId;

      this.merchantAdminService.validateInvite(this.invitationToken, this.clientId).subscribe(
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
        Validators.minLength(6),
        Validators.maxLength(20)
      ]],
      'confirm-password': ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ]],
    });
  }

  public onSubmit(): void {
    const password: string = this.loginForm.value.password;
    const confirmPassword: string = this.loginForm.value['confirm-password'];

    if (password !== confirmPassword) {
      this.notificationService.addSnack('Passwords do not match.');
      return;
    }

    if (this.loginForm.invalid) {
      return;
    }

    this.merchantAdminService.setupNewMerchantsPassword(this.invitationToken, this.clientId, password).subscribe(
      (message: string) => {
        // this.notificationService.addSnack('Your password has been saved. Please login');
        this.notificationService.addSnack(message);
        this.router.navigateByUrl('/login');
      },
      () => {
        // service returns success unless http failure
        this.notificationService.addSnack('Something went wrong');
        this.router.navigateByUrl('/login');
      }
    );
  }
}
