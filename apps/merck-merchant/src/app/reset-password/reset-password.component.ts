import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public loginForm: FormGroup;
  public errorMessage: string = null;

  constructor(
    private fb: FormBuilder,
  ) {
    this.initForm();
  }

  public ngOnInit(): void {
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
    });
  }

  public onSubmit(): void {

  }

}
