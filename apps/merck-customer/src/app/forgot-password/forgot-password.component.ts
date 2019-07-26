import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

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
    private fb: FormBuilder
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.resetPasswordForm = this.fb.group({
      mobileNo: ['', Validators.required]
    });
  }

  public ngOnInit(): void {
  }

  public onSubmit(): void {
    this.router.navigateByUrl('enter-pin');
  }

}
