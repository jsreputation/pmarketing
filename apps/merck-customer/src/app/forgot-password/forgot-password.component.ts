import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService, NotificationService } from '@perx/core';
import { PageProperties, BAR_SELECTED_ITEM } from '../page-properties';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'mc-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, PageProperties {

  public selectedCountry: string = '+852';
  public resetPasswordForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private notificationService: NotificationService
  ) {
    this.initForm();
  }

  private initForm(): void {

    let receivedMobileNo = '';
    if (this.router.getCurrentNavigation() !== null) {
      if (this.router.getCurrentNavigation().extras.hasOwnProperty('state')) {
          receivedMobileNo = this.router.getCurrentNavigation().extras.state.mobileNo;
          this.selectedCountry = this.router.getCurrentNavigation().extras.state.country;
      }
    }
    this.resetPasswordForm = this.fb.group({
      mobileNo: [receivedMobileNo, Validators.required]
    });
  }

  public showHeader(): boolean {
    return true;
  }

  public bottomSelectedItem(): BAR_SELECTED_ITEM {
    return BAR_SELECTED_ITEM.NONE;
  }

  public ngOnInit(): void {
    // TODO: The following Api should return a promise or observable so user should be blocked unless this token gets generated.
    this.authService.v4GetAppAccessToken().subscribe(() => {
      console.log('Received App token');
    },
    (err) => {
      console.log('Error' + err);
    });
  }

  public onSubmit(): void {
    const mobileNumber = this.selectedCountry + (this.resetPasswordForm.get('mobileNo').value as string);
    try {
      this.authService.forgotPassword('639876543210').subscribe(
        () => {
          this.router.navigate(['enter-pin/password'], { state: { mobileNo: mobileNumber } } );
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 0) {
              this.notificationService.addSnack('We could not reach the server');
            } else if (err.status === 401) {
              this.notificationService.addSnack('Invalid mobile number.');
            } else {
              this.notificationService.addSnack(err.statusText);
            }
          }
          // TODO: Currently 'forgotPassword' is not stable. Remove this line once done.
          this.router.navigate(['enter-pin/password'], { state: { mobileNo: mobileNumber } } );
        });
    } catch (error) {
        console.log(error);
    }
  }
}
