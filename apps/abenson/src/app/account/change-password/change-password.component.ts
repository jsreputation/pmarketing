import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '@perxtech/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public passwordChangeForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private sharedData: SharedDataService,
    private router: Router,
    private auth: AuthenticationService
  ) { }

  public ngOnInit(): void {
    this.passwordChangeForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.maxLength(4), Validators.minLength(4)]],
      passwordConfirmation: ['', [Validators.required, Validators.maxLength(4), Validators.minLength(4)]],
      oldPassword: ['', [Validators.required, Validators.maxLength(4), Validators.minLength(4)]]
    });
  }

  public changePassword(): void {
    this.auth.requestVerificationToken().subscribe(() => {
      this.sharedData.addData(this.passwordChangeForm.value);
      this.router.navigate(['account', 'profile', 'verify-otp', 'password']);
    });
  }
}
