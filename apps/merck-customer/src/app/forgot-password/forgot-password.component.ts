import { Component } from '@angular/core';
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
export class ForgotPasswordComponent implements PageProperties {

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

  public onSubmit(): void {
    const mobileNumber = '639876543210'; // this.selectedCountry + (this.resetPasswordForm.get('mobileNo').value as string);
    try {
      this.authService.forgotPassword(mobileNumber).subscribe(
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
        });
    } catch (error) {
        console.log(error);
    }
  }
}
