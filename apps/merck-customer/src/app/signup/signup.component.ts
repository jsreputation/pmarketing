import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, NotificationService } from '@perx/core';
import { PageAppearence, PageProperties, BarSelectedItem } from '../page-properties';

@Component({
  selector: 'mc-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements PageAppearence {

  public signupForm: FormGroup;
  public selectedCountry: string = '+852';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private notificationService: NotificationService
) {
     this.initForm();
  }

  private initForm(): void {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      mobileNo: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      accept_terms: [false, Validators.required],
      accept_marketing: [false, Validators.required],
      countryCode: ['852', Validators.required]
    });
  }

  public getPageProperties(): PageProperties {
    return {
      header: false,
      backButtonEnabled: false,
      bottomSelectedItem: BarSelectedItem.NONE,
      pageTitle: ''
    };
  }

  public onSubmit(): void {

    try {
      const passwordString = this.signupForm.get('password').value as string;
      const confirmPassword = this.signupForm.get('confirmPassword').value as string;
      if (passwordString !== confirmPassword) {
        this.notificationService.addSnack('Passwords do not match.');
        return;
      }
      const termsConditions = this.signupForm.get('accept_terms').value as boolean;
      if (!termsConditions) {
        this.notificationService.addSnack('Please accept terms & conditions.');
        return;
      }

      const marketingCommunication = this.signupForm.get('accept_marketing').value as boolean;
      if (!marketingCommunication) {
        this.notificationService.addSnack('Please agree to receive marketing communications from Merck Group hk.');
        return;
      }

      // TODO: Currently '+' sign is not beign saved in the backend
      // const mobileNumber = this.selectedCountry + this.signupForm.get('mobileNo').value as string;

      const mobileNumber = this.signupForm.get('mobileNo').value.toString();
      const name = this.signupForm.get('name').value as string;
      const countryCode = (this.signupForm.get('countryCode').value as string);
      const codeAndMobile = countryCode + mobileNumber;
      const cleanedMobileNo = codeAndMobile.replace(/[^0-9]/g, ''); // remove non numeric and special characters

      const signUpData = {
        firstName: '',
        lastName: name,
        middleName: '',
        phone: cleanedMobileNo,
        email: '',
        birthDay: '',
        gender: '',
        password: passwordString,
        password_confirmation: confirmPassword
      };

      this.authService.signup(signUpData).subscribe(
        () => {
          this.router.navigate(['enter-pin/register'], { state: { mobileNo: cleanedMobileNo } } );
        },
        err => {
          this.notificationService.addSnack(err.error.message);
        });
    } catch (error) {
        console.log(error);
    }
  }

  public goToLogin(): void {
    this.router.navigateByUrl('/login');
  }
}
