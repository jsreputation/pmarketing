import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@perx/core';

@Component({
  selector: 'mc-enter-pin',
  templateUrl: './enter-pin.component.html',
  styleUrls: ['./enter-pin.component.scss']
})
export class EnterPinComponent implements OnInit {

  public numberOfDigits: number = 6;
  public pinMode: string = 'password'; // || 'register'
  private mobileNo: string = null;
  public visibleNo: string = '';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService: AuthenticationService) {
    if (this.router.getCurrentNavigation() !== null) {
      if (this.router.getCurrentNavigation().extras.hasOwnProperty('state')) {
        this.mobileNo = this.router.getCurrentNavigation().extras.state.mobileNo;
        this.visibleNo = this.encodeMobileNo(this.mobileNo);
      }
    }
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
    try {
      this.authService.verifyOTP(this.mobileNo, enteredPin).subscribe(
        () => {
          this.router.navigateByUrl('/home');
        },
        err => {
          console.error('Observer got an error: ' + err);
          // TODO: AuthService is not implementing 'verifyOTP' yet. Remove this line once done.
          this.router.navigateByUrl('/home');
        });
    } catch (error) {
        console.log(error);
    }
  }

  public resendOtp(): void {
    try {
      this.authService.resendOTP(this.mobileNo).subscribe(
        () => {
          console.log('Oto resend request created');
        },
        err => {
          console.error('Observer got an error: ' + err);
        });
    } catch (error) {
        console.log(error);
    }
  }

}
