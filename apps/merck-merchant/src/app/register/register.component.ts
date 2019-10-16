import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IMerchantAdminService, NotificationService} from '@perx/core';
import {isPlatformBrowser} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService,
    private merchantAdminService: IMerchantAdminService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.initForm();
  }

  public ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const param = location.search;
      const invitationToken = new URLSearchParams(param).get('invitation_token');
      const clientId = new URLSearchParams(param).get('client_id');

      this.merchantAdminService.validateInvite(invitationToken, clientId).subscribe(
        () => {
          this.router.navigateByUrl('/login');
          this.notificationService.addSnack('Your password has been saved. Please login');
        },
        (err) => {
          let message = 'Something went wrong';
          if (err.error) { // actual error response from API
            message = err.error.message;
          }
          this.notificationService.addSnack(message);
        }
      );
    }
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      password: ['', Validators.required],
      'confirm-password': ['', Validators.required],
    });
  }

  public onSubmit(): void {
    // const password: string = this.loginForm.get('password').value;
    // const confirmPassword: string = this.loginForm.get('password').value;
  }
}
