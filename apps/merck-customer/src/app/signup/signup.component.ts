import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@perx/core/dist/perx-core';

@Component({
  selector: 'mc-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

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

  public ngOnInit(): void {}

  public onSubmit(): void {
    try {
      this.errorMessage = null;
      const password = this.signupForm.get('password').value as string;
      const confirmPassword = this.signupForm.get('confirmPassword').value as string;
      if (password !== confirmPassword) {
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
      const mobileNumber = this.signupForm.get('mobileNo').value as string;
      this.authService.signup(mobileNumber, password).subscribe(
        () => {
          this.router.navigateByUrl('/home');
        },
        err => {
          console.error('Observer got an error: ' + err);
          // TODO: AuthService is not implementing 'signup' method yet. Remove this line once done.
          this.router.navigate(['enter-pin/register'], { state: { mobileNo: mobileNumber } } );
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
