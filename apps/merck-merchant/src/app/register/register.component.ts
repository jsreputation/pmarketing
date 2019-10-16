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
  private invitationToken: string;
  private clientId: string;

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
      this.invitationToken = new URLSearchParams(param).get('invitation_token');
      this.clientId = new URLSearchParams(param).get('client_id');

      this.merchantAdminService.validateInvite(this.invitationToken, this.clientId).subscribe(
        () => {
          this.notificationService.addSnack('Your password has been saved. Please login');
          this.router.navigateByUrl('/login');
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
    const password: string = this.loginForm.get('password').value;
    this.merchantAdminService.setupNewMerchantsPassword(this.invitationToken, this.clientId, password).subscribe(
      (message: string) => {
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
