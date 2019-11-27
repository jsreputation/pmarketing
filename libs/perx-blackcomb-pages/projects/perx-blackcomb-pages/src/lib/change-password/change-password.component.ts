import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'perx-blackcomb-pages-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  public changePasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.initForm();
  }

  public ngOnInit(): void {
  }

  private initForm(): void {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  public onSubmit(): void {
    const passwordString = this.changePasswordForm.get('newPassword');
    const confirmPassword = this.changePasswordForm.get('confirmPassword');

    if (passwordString !== confirmPassword) {
      console.log('Password fields do not match');
      return;
    }

    this.router.navigateByUrl('/profile');
  }

}
