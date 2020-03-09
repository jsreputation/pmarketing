import {
  Component,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import {
  AuthenticationService,
  NotificationService,
} from '@perx/core';

@Component({
  selector: 'app-forgot-pin',
  templateUrl: './forgot-pin.component.html',
  styleUrls: ['./forgot-pin.component.scss']
})
export class ForgotPinComponent implements OnInit {
  public forgotPinForm: FormGroup;

  public get mobileNumber(): AbstractControl | null {
    return this.forgotPinForm.get('mobileNumber');
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
  ) { }

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.forgotPinForm = this.fb.group({
      mobileNumber: ['', Validators.required]
    });
  }

  public onSubmit(): void {
    const mobileNumber = this.forgotPinForm.value.mobileNumber as string;

    try {
      this.authenticationService.forgotPassword(mobileNumber).subscribe(
        () => {
          this.router.navigate(['enter-pin'], { state: { mobileNumber } });
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 0) {
              this.notificationService.addSnack('We could not reach the server');
            } else if (err.status === 401) {
              this.notificationService.addSnack('Invalid mobile number.');
            } else if (err.status === 404) {
              this.notificationService.addSnack('Mobile number not found.');
            } else {
              this.notificationService.addSnack(err.statusText);
            }
          }
        });
    } catch (error) {
      console.log(error);
    }
  }
}
