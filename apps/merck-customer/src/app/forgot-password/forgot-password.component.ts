import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '@perx/core';

@Component({
  selector: 'mc-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public selectedCountry: string = '+852';
  public resetPasswordForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthenticationService
  ) {
    this.initForm();
  }

  private initForm(): void {

    let receivedMobileNo = '';
    if (this.router.getCurrentNavigation() !== null) {
      if (this.router.getCurrentNavigation().extras.hasOwnProperty('state')) {
          receivedMobileNo = this.router.getCurrentNavigation().extras.state.mobileNo;
      }
    }
    this.resetPasswordForm = this.fb.group({
      mobileNo: [receivedMobileNo, Validators.required]
    });
  }

  public ngOnInit(): void {
  }

  public onSubmit(): void {
    const mobileNumber = (this.resetPasswordForm.get('mobileNo').value as string);
    try {
      this.authService.forgotPassword(mobileNumber).subscribe(
        () => {
          this.router.navigate(['enter-pin/password'], { state: { mobileNo: mobileNumber } } );
        },
        err => {
          console.error('Observer got an error: ' + err);
          // TODO: AuthService is not implementing 'forgotPassword' yet. Remove this line once done.
          this.router.navigate(['enter-pin/password'], { state: { mobileNo: mobileNumber } } );
        });
    } catch (error) {
        console.log(error);
    }
  }
}
