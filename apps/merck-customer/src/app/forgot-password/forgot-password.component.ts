import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService, NotificationService } from '@perx/core';
import { PageAppearence, PageProperties, BarSelectedItem } from '../page-properties';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'mc-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements PageAppearence {

  public selectedCountry: string = '852';
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
    const navigation = this.router.getCurrentNavigation();
    if (navigation !== null && navigation.extras.state) {
      receivedMobileNo = navigation.extras.state.mobileNo;
      this.selectedCountry = navigation.extras.state.country;
    }
    this.resetPasswordForm = this.fb.group({
      mobileNo: [receivedMobileNo, Validators.required],
      countryCode: [this.selectedCountry, Validators.required]
    });
  }

  public getPageProperties(): PageProperties {
    return {
      header: true,
      backButtonEnabled: false,
      bottomSelectedItem: BarSelectedItem.NONE,
      pageTitle: ''
    };
  }

  public onSubmit(): void {
    const mobileNumber = (this.resetPasswordForm.value.mobileNo as string);
    const countryCode = (this.resetPasswordForm.value.countryCode as string);
    const codeAndMobile = countryCode + mobileNumber;
    const cleanedMobileNo = codeAndMobile.replace(/[^0-9]/g, ''); // remove non numeric and special characters

    try {
      this.authService.forgotPassword(cleanedMobileNo).subscribe(
        () => {
          this.router.navigate(['enter-pin/password'], { state: { mobileNo: cleanedMobileNo } });
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 0) {
              this.notificationService.addSnack('We could not reach the server');
            } else if (err.status === 401) {
              this.notificationService.addSnack('Invalid mobile number.');
            } else {
              this.notificationService.addSnack(err.error.message);
            }
          }
        });
    } catch (error) {
      console.log(error);
    }
  }
}
