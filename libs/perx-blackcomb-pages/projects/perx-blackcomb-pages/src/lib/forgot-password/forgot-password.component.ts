import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, NotificationService } from '@perxtech/core';

@Component({
  selector: 'mc-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  public selectedCountry: string = '852';
  public resetPasswordForm: FormGroup;

  public get mobileNo(): AbstractControl | null {
    return this.resetPasswordForm.get('mobileNo');
  }

  public get countryCode(): AbstractControl | null {
    return this.resetPasswordForm.get('countryCode');
  }

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

  public onSubmit(): void {
    const mobileNumber: string = (this.resetPasswordForm.value.mobileNo as string);
    const countryCode: string = (this.resetPasswordForm.value.countryCode as string);
    const codeAndMobile = `${countryCode}${mobileNumber}`.trim();
    // remove non numeric and special characters except leading '+'
    const cleanedMobileNo = `+${codeAndMobile.replace(/[^0-9]/g, '')}`;

    try {
      this.authService.forgotPassword(cleanedMobileNo).subscribe(
        () => this.router.navigate(['otp/password'], { state: { mobileNo: cleanedMobileNo } }),
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
