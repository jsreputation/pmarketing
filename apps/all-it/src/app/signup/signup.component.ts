import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  public signupForm: FormGroup;
  public errorMessage: string | null;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.signupForm = this.fb.group({
      title: ['', Validators.required],
      name: ['', Validators.required],
      dob: ['', Validators.required],
      postcode: ['', Validators.required],
      countryCode: ['60', Validators.required],
      mobileNo: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      accept_terms: [false, Validators.required],
      accept_marketing: [false, Validators.required]
    });
  }

  public onSubmit(): void {
    const passwordString = this.signupForm.get('password').value as string;
    const confirmPassword = this.signupForm.get('confirmPassword').value as string;
    if (passwordString !== confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

  }

  public goToLogin(): void {
    this.router.navigateByUrl('/signin');
  }
}
