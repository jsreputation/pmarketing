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

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      nric: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      accept_terms: [false, Validators.required],
      accept_marketing: [false, Validators.required],
      title: ['', Validators.required],
      dob: ['', Validators.required],
      postcode: ['', Validators.required],
      yearMembership: ['', Validators.required],
      email: ['', Validators.required],
      mobileNo: ['', Validators.required],
      countryCode: ['65', Validators.required]
    });
  }

  public onSubmit(): void {}

  public goToLogin(): void {
    this.router.navigateByUrl('/signin');
  }
}
