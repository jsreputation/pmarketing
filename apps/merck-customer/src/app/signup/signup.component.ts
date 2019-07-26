import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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
    this.router.navigateByUrl('/enter-pin');
  }

  public goToLogin(): void {
    this.router.navigateByUrl('/login');
  }
}
