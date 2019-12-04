import { Component } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import {
  ProfileService,
  IProfile,
  IChangePasswordData,
  AuthenticationService,
  NotificationService,
  PopUpClosedCallBack,
  ThemesService,
  ITheme
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

  public theme: ITheme;

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private notificationService: NotificationService,
    private themeService: ThemesService
  ) {

    this.route.paramMap.subscribe(params => {
      if (params.get('type') !== null) {
        this.pinMode = params.get('type') as PinMode;

        if (this.pinMode === PinMode.password) {
          this.getChangedPasswordDataFromNavigation();
        } else if (this.pinMode === PinMode.register) {
          this.getMobileNumberFromNavigation();
        }
      }
    });

    this.themeService.getThemeSetting().subscribe(
      (th: ITheme) => this.theme = th
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

    this.profileService.whoAmI().subscribe(
      (profile: IProfile) => {
        this.userPhone = profile.phone;
        this.visibleNumber = this.userPhone ? this.encodeMobileNo(this.userPhone) : '';
      }
    );
  }

  private getMobileNumberFromNavigation(): void {
    const currentNavigation = this.router.getCurrentNavigation();
    if (!currentNavigation) {
      return;
    }

    if (currentNavigation.extras.state) {
      this.userPhone = currentNavigation.extras.state.mobileNo;
      this.visibleNumber = this.userPhone ? this.encodeMobileNo(this.userPhone) : '';
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
    } else if (this.pinMode === PinMode.register && this.userPhone) {
      this.authService.verifyOTP(this.userPhone, enteredPin).subscribe(
        (response) => {
          this.notificationService.addSnack(response.message);
          this.router.navigate(['login']);
        },
        err => {
          this.notificationService.addSnack(err.error.message);
        }
      );
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
