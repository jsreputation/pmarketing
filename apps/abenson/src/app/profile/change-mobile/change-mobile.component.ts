import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  AuthenticationService,
  NotificationService
} from '@perxtech/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-change-mobile',
  templateUrl: './change-mobile.component.html',
  styleUrls: ['./change-mobile.component.scss']
})
export class ChangeMobileComponent implements OnInit {
  public phoneForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  public ngOnInit(): void {
    this.phoneForm = this.fb.group({
      phone: [ '', [ Validators.required, Validators.pattern('^[0-9]*$') ]]
    });
  }

  public requestOtp(): void {
    if (this.phoneForm.valid) {
      this.auth.requestVerificationToken(this.phoneForm.value.phone).subscribe(
        () => {
          this.router.navigate([ '/otp', 'phone' ], { queryParams: this.phoneForm.value });
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 0) {
              this.notificationService.addPopup({
                title: 'We could not reach the server',
                text: 'Please try again soon'
              });
            // } else if (err.status === 409 && err.error && err.error.message) {
            //   this.notificationService.addSnack(err.error.message);
            } else {
              this.notificationService.addSnack(err.error.message);
            }
          }
        }
      );
    }
  }
}
