import { TranslateService } from '@ngx-translate/core';
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
  GeneralStaticDataService,
  ICountryCode,
  IPopupConfig
} from '@perxtech/core';
import {
  concatAll,
  filter,
  map,
  tap} from 'rxjs/operators';
import {
  Observable,
  of
} from 'rxjs';

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
  public subHeading: string;
  public userPhone: string | undefined;
  public countriesList: ICountryCode[];
  private popupTxt: IPopupConfig;
  private resendOTPTxt: string;
  private wrongOTP: string;
  private successRegister: string;


  public theme: ITheme;

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private notificationService: NotificationService,
    private themeService: ThemesService,
    private generalStaticDataService: GeneralStaticDataService,
    private translate: TranslateService
  ) {
    this.themeService.getThemeSetting()
      .subscribe((th: ITheme) => this.theme = th);
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
          this.initTranslate().subscribe(
            () => this.getChangedPasswordDataFromNavigation()
          );
        } else if (this.pinMode === PinMode.register) {
          this.initTranslate().subscribe(() =>
            this.getMobileNumberFromNavigation()
          );
        }
      });
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
        this.subHeading = this.subHeading.replace('{{mobileNumber}}', this.visibleNumber);
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
      this.subHeading = this.subHeading.replace('{{mobileNumber}}', this.visibleNumber);
    }
  }

  public onPinEntered(enteredPin: string): void {
    if (this.pinMode === PinMode.password) {
      this.changePasswordData.otp = enteredPin;
      this.authService.changePassword(this.changePasswordData).subscribe(
        () => {
          this.notificationService.addPopup({
            text: this.popupTxt.text,
            title: this.popupTxt.title,
            buttonTxt: this.popupTxt.buttonTxt,
            imageUrl: 'assets/congrats_image.png',
            afterClosedCallBack: this
          });
        },
        () => {
          this.notificationService.addSnack(this.wrongOTP);
        });
    } else if (this.pinMode === PinMode.register && this.userPhone) {
      this.authService.verifyOTP(this.userPhone, enteredPin)
        .subscribe(
          () => {
            this.notificationService.addSnack(this.successRegister);
            const country = this.countriesList.find(
              countryCodeO => `+${this.userPhone}`.startsWith(countryCodeO.code)
            ) || null;
            let phoneNumber: string | null = null;
            let countryCode: ICountryCode | null = null;
            if (country !== null) {
              phoneNumber = `+${this.userPhone}`.slice(country.code.length); // country.phone contains + while userPhone doesn't
              countryCode = country;
            }
            this.router.navigate(['login'], { state: { phoneNumber, countryCode } });
          },
          () => this.notificationService.addSnack(this.wrongOTP)
        );
    }
  }

  public resendOtp(): void {
    if (!this.userPhone) {
      return;
    }
    this.authService.resendOTP(this.userPhone).subscribe(
      () => this.notificationService.addSnack(this.resendOTPTxt)
    );
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

  private initTranslate(): Observable<void> {
    const subheadingTrans = this.translate.get('OTP_PAGE.DESCRIPTION')
      .pipe(
        tap((text) => {
          this.subHeading = text;
        })
      );
    const otpResendTrans = this.translate.get('OTP_PAGE.RESEND_TXT').pipe(
      tap((text) => {
        this.resendOTPTxt = text;
      })
    );
    const otpErrorTrans = this.translate.get('OTP_PAGE.ERROR_TXT').pipe(
      tap((text) => {
        this.wrongOTP = text;
      })
    );
    const otpSuccessTrans = this.translate.get('OTP_PAGE.CTA_TXT_SUCCESS')
      .pipe(
        tap((text) => {
          this.successRegister = text;
        })
      );
    const otpPopUpTrans = this.translate.get(['OTP_PAGE.POPUP_TITLE', 'OTP_PAGE.POPUP_TXT', 'OTP_PAGE.POPUP_BTN_TXT']).pipe(
      tap((res) => {
        this.popupTxt = {
          title: res['OTP_PAGE.POPUP_TITLE'],
          text: res['OTP_PAGE.POPUP_TXT'],
          buttonTxt: res['OTP_PAGE.POPUP_BTN_TXT'],
        };
      }));
    const sourceTrans = of(subheadingTrans, otpErrorTrans, otpPopUpTrans, otpSuccessTrans, otpResendTrans);
    return sourceTrans.pipe(
      concatAll()
    );
  }
}
