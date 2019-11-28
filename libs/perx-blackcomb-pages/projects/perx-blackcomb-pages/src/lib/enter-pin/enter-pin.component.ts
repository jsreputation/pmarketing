import { Component } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import {
  ProfileService,
  IProfile,
  IChangePasswordData,
  AuthenticationService,
  NotificationService,
  PopUpClosedCallBack
} from '@perx/core';

export enum PinMode {
  password = 'password',
  register = 'register'
}

@Component({
  selector: 'perx-blackcomb-pages-enter-pin',
  templateUrl: './enter-pin.component.html',
  styleUrls: ['./enter-pin.component.scss']
})
export class EnterPinComponent implements PopUpClosedCallBack {

  public MAX_DIGITS_COUNT: number = 6;

  public changePasswordData: IChangePasswordData;
  public pinMode: PinMode = PinMode.password;
  public visibleNumber: string;
  public userPhone: string | undefined;

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private notificationService: NotificationService
  ) {

    this.route.paramMap.subscribe(params => {
      if (params.get('type') !== null) {
        this.pinMode = params.get('type') as PinMode;

        if (this.pinMode === PinMode.password) {
          this.getChangedPasswordDataFromNavigation();
        }
      }
    });

    this.profileService.whoAmI().subscribe(
      (profile: IProfile) => {
        this.userPhone = profile.phone;
        this.visibleNumber = this.userPhone ? this.encodeMobileNo(this.userPhone) : '';
      }
    );
  }

  private getChangedPasswordDataFromNavigation(): void {
    const currentNavigation = this.router.getCurrentNavigation();
    if (!currentNavigation) {
      return;
    }

    if (currentNavigation.extras.state) {
      this.changePasswordData = currentNavigation.extras.state as IChangePasswordData;
    }
  }

  public onPinEntered(enteredPin: string): void {

    if (this.pinMode === PinMode.password) {
      this.changePasswordData.otp = enteredPin;
      this.authService.changePassword(this.changePasswordData).subscribe(
        () => {
          this.notificationService.addPopup({
            text: 'You can log in with new password',
            title: 'Password Changed!',
            buttonTxt: 'Back to Home',
            imageUrl: 'assets/congrats_image.png',
            afterClosedCallBack: this
          });
        },
        err => {
          this.notificationService.addSnack(err.statusText);
        });
    }
  }

  public resendOtp(): void {
    switch (this.pinMode) {
      case PinMode.register:
        // TODO: still needs to work on registration flow
        break;
      case PinMode.password:
        if (this.userPhone) {
          this.authService.resendOTP(this.userPhone).subscribe(
            (res) => this.notificationService.addSnack(res.message)
          );
        }
        break;
    }
  }

  public dialogClosed(): void {
    this.router.navigateByUrl('home');
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
}
