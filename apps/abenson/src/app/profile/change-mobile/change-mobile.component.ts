import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  AuthenticationService,
  NotificationService
} from '@perxtech/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-change-mobile',
  templateUrl: './change-mobile.component.html',
  styleUrls: ['./change-mobile.component.scss']
})
export class ChangeMobileComponent implements OnInit {
  public phoneForm: FormGroup;
  public passwordMinLen: number;
  public passwordMaxLen: number;

  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private router: Router,
    private notificationService: NotificationService,
    private route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this.phoneForm = this.fb.group({
      phone: [ '', [ Validators.required, Validators.pattern('^[0-9]*$')]]
    });
    this.route.data.subscribe(
      (dataObj) => {
        if (dataObj.minLen && dataObj.maxLen) {
          this.passwordMinLen = dataObj.minLen;
          this.passwordMaxLen = dataObj.maxLen;
          this.phoneForm.controls.phone.setValidators([
            Validators.required,
            Validators.pattern('^[0-9]*$'),
            Validators.minLength(this.passwordMinLen),
            Validators.maxLength(this.passwordMaxLen)
            ]
          );
          this.phoneForm.controls.phone.updateValueAndValidity();
        }
      }
    );
  }

  public requestOtp(): void {
    if (this.phoneForm.valid) {
      // converting to Number will strip leading 0s
      this.auth.requestVerificationToken(Number(this.phoneForm.value.phone).toString()).subscribe(
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
