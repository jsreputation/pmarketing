import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {
  ProfileService,
  IProfile,
  IChangePasswordData,
  AuthenticationService,
  NotificationService,
  PopUpClosedCallBack,
  ThemesService,
  ITheme,
  IMessageResponse, GeneralStaticDataService, ICountryCode
} from '@perxtech/core';
import { filter, map } from 'rxjs/operators';

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
  public countriesList: ICountryCode[];

  public theme: ITheme;

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private notificationService: NotificationService,
    private themeService: ThemesService,
    private generalStaticDataService: GeneralStaticDataService
  ) {
    this.generalStaticDataService.getCountriesList([
      'Hong Kong',
      'Philippines',
      'Singapore'
    ]).subscribe(
      (countriesList) => this.countriesList = countriesList
    );
    this.route.paramMap
      .pipe(
        // filter((p: ParamMap) => p.has('type')),
        map((p: ParamMap) => p.get('type')),
        filter((type: string | null) => type !== null),
      )
      .subscribe((typ: string) => {
        this.pinMode = typ as PinMode;
        if (this.pinMode === PinMode.password) {
          this.getChangedPasswordDataFromNavigation();
        } else if (this.pinMode === PinMode.register) {
          this.getMobileNumberFromNavigation();
        }
      });

    this.themeService.getThemeSetting()
      .subscribe((th: ITheme) => this.theme = th);
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
          this.notificationService.addSnack(err.error.message);
          // wrong old password / not-matching new pw
          if (err.error.code === 54 || err.error.code === 55) {
            this.router.navigate(['change-password']);
          }
        });
    } else if (this.pinMode === PinMode.register && this.userPhone) {
      this.authService.verifyOTP(this.userPhone, enteredPin)
        .subscribe(
          (response: IMessageResponse) => {
            this.notificationService.addSnack(response.message);
            const country = this.countriesList.find(
              countryCodeO => `+${this.userPhone}`.startsWith(countryCodeO.code)
            )  || null;
            let phoneNumber: string | null = null;
            let countryCode: ICountryCode | null = null;
            if (country !== null) {
              phoneNumber = `+${this.userPhone}`.slice(country.code.length); // country.phone contains + while userPhone doesn't
              countryCode = country;
            }
            this.router.navigate(['login'], { state: { phoneNumber, countryCode } });
          },
          err => this.notificationService.addSnack(err.error.message)
        );
    }
  }

  public resendOtp(): void {
    if (!this.userPhone) {
      return;
    }
    switch (this.pinMode) {
      case PinMode.register:
        this.authService.resendOTP(this.userPhone).subscribe(
          (res) => this.notificationService.addSnack(res.message)
        );
        break;
      case PinMode.password:
        this.authService.resendOTP(this.userPhone)
          .subscribe(
            (res) => this.notificationService.addSnack(res.message)
          );
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
