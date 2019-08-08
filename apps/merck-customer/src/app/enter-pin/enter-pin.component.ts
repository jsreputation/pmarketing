import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@perx/core';
import { PageProperties, BarSelectedItem } from '../page-properties';

@Component({
  selector: 'mc-enter-pin',
  templateUrl: './enter-pin.component.html',
  styleUrls: ['./enter-pin.component.scss']
})
export class EnterPinComponent implements OnInit, PageProperties {

  public MAX_DIGITS_COUNT: number = 6;
  public pinMode: string = 'password'; // || 'register'
  private mobileNo: string = null;
  public visibleNo: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService
  ) {
    if (this.router.getCurrentNavigation() !== null
      && this.router.getCurrentNavigation().extras.hasOwnProperty('state')) {
      this.mobileNo = this.router.getCurrentNavigation().extras.state.mobileNo;
      this.visibleNo = this.encodeMobileNo(this.mobileNo);
    }
  }

  public showHeader(): boolean {
    return true;
  }

  public bottomSelectedItem(): BarSelectedItem {
    return BarSelectedItem.NONE;
  }

  public backButtonEnabled(): boolean {
    return false;
  }

  private encodeMobileNo(mobileNo: string): string {
    let encodedString = '';
    for (let i = 0; i < mobileNo.length; i++) {
      if (i < 4) {
        encodedString += '*';
      } else {
        encodedString += mobileNo.charAt(i);
      }
    }
    return encodedString;
  }

  public ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.get('type') !== null) {
        this.pinMode = params.get('type');
      }
    });
  }

  public onPinEntered(enteredPin: string): void {
    if (this.pinMode === 'password') {
      this.router.navigate(['reset-password'], { state: { mobileNo: this.mobileNo, otp: enteredPin } });
    }
  }

  public resendOtp(): void {
    if (this.pinMode === 'password') {
      this.authService.forgotPassword(this.mobileNo).subscribe(
        () => {
          console.log('Forgot password api called again');
        },
        err => {
          console.error('ForgotPassword: ' + err);
        });
    } else {
      this.authService.resendOTP(this.mobileNo).subscribe(
        () => {
          console.log('Resend Otp request sent');
        },
        err => {
          console.error('ResendOTP: ' + err);
        });
    }
  }
}
