import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@perx/core';
import { PageProperties, BAR_SELECTED_ITEM } from '../page-properties';

@Component({
  selector: 'mc-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements PageProperties {

  public signupForm: FormGroup;
  public selectedCountry: string = '+852';

  public errorMessage: string = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService
) {
     this.initForm();
  }

  private initForm(): void {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      mobileNo: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      accept_terms: [false, Validators.required],
      accept_marketing: [false, Validators.required]
    });
  }

  public showHeader(): boolean {
    return false;
  }

  public bottomSelectedItem(): BAR_SELECTED_ITEM {
    return BAR_SELECTED_ITEM.NONE;
  }

  public onSubmit(): void {
    try {
      this.errorMessage = null;
      const passwordString = this.signupForm.get('password').value as string;
      const confirmPassword = this.signupForm.get('confirmPassword').value as string;
      if (passwordString !== confirmPassword) {
        this.errorMessage = 'Passwords do not match.';
        return;
      }
      const termsConditions = this.signupForm.get('accept_terms').value as boolean;
      if (!termsConditions) {
        this.errorMessage = 'Please accept terms & conditions.';
        return;
      }

      const marketingCommunication = this.signupForm.get('accept_marketing').value as boolean;
      if (!marketingCommunication) {
        this.errorMessage = 'Please agree to receive marketing communications from Merck Group hk.';
        return;
      }

      // TODO: Currently '+' sign is not beign saved in the backend
      // const mobileNumber = this.selectedCountry + this.signupForm.get('mobileNo').value as string;

      const mobileNumber = this.signupForm.get('mobileNo').value as string;

      const name = this.signupForm.get('name').value as string;

      const signUpData = {
        firstName: '',
        lastName: name,
        middleName: '',
        phone: mobileNumber,
        email: '',
        birthDay: '',
        gender: '',
        password: passwordString,
        password_confirmation: confirmPassword
      };

      this.authService.signup(signUpData).subscribe(
        () => {
          this.router.navigate(['enter-pin/register'], { state: { mobileNo: mobileNumber } } );
        },
        err => {
          console.error('Signup: ' + err);
        });
    } catch (error) {
        console.log(error);
    }
  }

  public goToLogin(): void {
    this.router.navigateByUrl('/login');
  }

  public onCrossClicked(): void {
    this.errorMessage = null;
  }
}
