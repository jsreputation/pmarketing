import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@perx/core';
import { PageAppearence, PageProperties, BarSelectedItem } from '../page-properties';

export enum PinMode {
  password = 'password',
  register = 'register'
}

@Component({
  selector: 'mc-enter-pin',
  templateUrl: './enter-pin.component.html',
  styleUrls: ['./enter-pin.component.scss']
})
export class EnterPinComponent implements OnInit, PageAppearence {

  public MAX_DIGITS_COUNT: number = 6;
  public pinMode: PinMode = PinMode.password;
  private mobileNo: string = null;
  public visibleNo: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService
  ) {
      const currentNavigation = this.router.getCurrentNavigation();
      if (!currentNavigation) {
        return;
      }

      if (currentNavigation.extras.state) {
        this.mobileNo = currentNavigation.extras.state.mobileNo;
        this.visibleNo = this.encodeMobileNo(this.mobileNo);
      }
  }

  public getPageProperties(): PageProperties {
    return {
      header: true,
      backButtonEnabled: false,
      bottomSelectedItem: BarSelectedItem.NONE,
      pageTitle: ''
    };
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
          this.pinMode = params.get('type') as PinMode;
        }
    });
  }

  public onPinEntered(enteredPin: string): void {
    if (this.pinMode === PinMode.register) {
      this.authService.verifyOTP(this.mobileNo, enteredPin).subscribe(
        (response) => {
          console.log(`Response: ${response.message}`);
        }
      );
    } else if (this.pinMode === PinMode.password) {
      this.router.navigate(['reset-password'], { state: { mobileNo: this.mobileNo, otp: enteredPin } });
    }

  }

  public resendOtp(): void {
    if (this.pinMode === PinMode.password) {
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
