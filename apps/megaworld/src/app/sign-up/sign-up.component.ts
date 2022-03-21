import { HttpErrorResponse } from '@angular/common/http';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  AuthenticationService,
  ConfigService,
  GeneralStaticDataService,
  IAnswer,
  IConfig,
  ICountryCode,
  IGameService,
  InstantOutcomeService,
  IPrePlayStateData,
  ISurvey,
  ITheme, LoginType,
  NotificationService,
  PinMode,
  SurveyService,
  ThemesService
} from '@perxtech/core';
import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  iif,
  Observable,
  of,
  Subject,
  throwError
} from 'rxjs';
import {
  catchError,
  delay,
  map,
  mergeMap,
  retryWhen,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

interface ISignupAttributes {
  [key: string]: any;
}

interface ISignUpConfig {
  loginMethod: LoginType;
}

@Component({
  selector: 'perx-blackcomb-pages-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  public data$: Observable<ISurvey | undefined>;
  public destroy$: Subject<void> = new Subject();
  public survey: ISurvey;
  public answers: IAnswer[];
  public totalLength: number;
  public currentPointer: number;
  public errorMessage: string | null = null;
  public appConfig: IConfig<ISignUpConfig>;
  private stateData: IPrePlayStateData;
  public loginMethod: LoginType;
  public loginTypes: typeof LoginType = LoginType;
  private maxRetryTimes: number = 5;
  private retryTimes: number = 0;
  private oldPI: string;
  private oldToken: string;
  private oldAnonymousStatus: boolean;
  public appAccessTokenFetched: boolean;
  public theme: Observable<ITheme>;
  public loadingSubmit: boolean = false;
  public defaultSelectedCountry: string;
  public countryCodePrefix: string;
  public signupForm: FormGroup = this.fb.group(
    {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      countryCode: ['', Validators.required],
      primary_identifier: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      referralCode: [''],
    },
    { validator: this.matchingPasswords('password', 'confirmPassword') }
  ) as FormGroup;
  public countriesList$: Observable<ICountryCode[]>;
  public moveId: number;
  public passwordHide: boolean = true;
  public confirmPasswordHide: boolean = true;

  constructor(
    protected fb: FormBuilder,
    private authService: AuthenticationService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private gameService: IGameService,
    private surveyService: SurveyService,
    private location: Location,
    private instantOutcomeService: InstantOutcomeService,
    private themesService: ThemesService,
    private configService: ConfigService,
    private generalStaticDataService: GeneralStaticDataService
  ) {}

  public ngOnInit(): void {
    this.countriesList$ = this.route.data.pipe(
      map((dataObj) => dataObj.countryList),
      switchMap((countriesList) =>
        this.generalStaticDataService.getCountriesList(countriesList)
      ),
      takeUntil(this.destroy$)
    );

    this.configService
      .readAppConfig<ISignUpConfig>()
      .subscribe((conf: IConfig<ISignUpConfig>) => {
        this.appConfig =  conf;
        if (conf.countryCodePrefix) {
          this.countryCodePrefix = conf.countryCodePrefix;
        }

        if (conf.custom && conf.custom.loginMethod) {
          this.loginMethod = conf.custom.loginMethod;
        }

        this.onUpdateSignUpForm();
      });
    this.theme = this.themesService.getThemeSetting();
    this.oldPI = this.authService.getPI();
    this.oldToken = this.authService.getUserAccessToken();
    this.oldAnonymousStatus = this.authService.getAnonymous();
    this.stateData = this.location.getState() as IPrePlayStateData;
    this.stateData = this.location.getState() as IPrePlayStateData;
    if (this.stateData && this.stateData.campaignId) {
      this.surveyService
        .getMoveId(this.stateData.campaignId)
        .subscribe((moveId: number) => (this.moveId = moveId));
    }
    const token = this.authService.getAppAccessToken();
    if (token) {
      this.appAccessTokenFetched = true;
    } else {
      this.authService.getAppToken().subscribe(
        () => {
          this.appAccessTokenFetched = true;
        },
        (err) => {
          console.error(`Error${err}`);
        }
      );
    }
    this.authService.logout();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onSubmit(): void {
    const userObj: ISignupAttributes = {
      customProperties: {},
    };
    Object.entries(this.signupForm.value).forEach(([key, value]) => {
      if (key !== 'countryCode') {
        userObj[key] = value;
      }
    });
    if (userObj.primary_identifier) {
      if (this.signupForm.value.countryCode) {
        // converting to Number will strip leading 0s
        let sanitizedId = '';
        const numberedId = Number(userObj.primary_identifier);
        if (! isNaN(numberedId)) {
          sanitizedId = numberedId.toString();
        }
        userObj.primary_identifier =
          this.signupForm.value.countryCode + sanitizedId;
      } else {
        // prepend with default countryCode
        userObj.primary_identifier = `65${userObj.primary_identifier}`;
      }
    }
    if (this.signupForm.value.referralCode) {
      userObj.customProperties.referralCode = this.signupForm.value.referralCode;
    }

    const pi = userObj.primary_identifier;

    if (pi) {
      if (this.stateData && this.stateData.collectInfo) {
        this.submitDataAndCollectInformation(pi, userObj);
      }
      this.loadingSubmit = true;
      this.authService.createUserAndAutoLogin(pi, userObj).subscribe(
        () => {
          this.notificationService.addSnack('User successfully created.');
          this.router.navigate(['/wallet']);
        },
        (err) => {
          if (err.name && err.name === 'RequiresOtpError') {
            this.router.navigate(['/otp', PinMode.register], {
              state: { mobileNo: pi },
            });
          } else if (err.error && err.error.message) {
            console.error(err.error.message);
            this.notificationService.addSnack(err.error.message);
          } else {
            this.notificationService.addSnack('Something unexpected happened');
          }
          // reset loading state if submit fails
          this.loadingSubmit = false;
        }
      );
    }
  }

  private submitDataAndCollectInformation(
    pi: string,
    userObj: ISignupAttributes
  ): void {
    this.errorMessage = null;

    if (userObj) {
      const oldUserId = this.authService.getUserId();
      const retryWhenTransactionFailed = (err: Observable<HttpErrorResponse>) =>
        err.pipe(
          mergeMap((error) => {
            if (error.status === 422 && this.retryTimes < this.maxRetryTimes) {
              this.retryTimes++;
              return of(error.status).pipe(delay(1000));
            }
            return throwError(error);
          })
        );

      if (!oldUserId) {
        throw new Error('should not be here');
      }
      let newUserId;
      let newToken;
      this.authService
        .createUserAndAutoLogin(pi, userObj, false)
        .pipe(
          catchError(() => {
            throw new Error('');
          }),
          tap(() => {
            if (this.oldAnonymousStatus) {
              newUserId = this.authService.getUserId();
              newToken = this.authService.getUserAccessToken();
              this.authService.savePI(this.oldPI);
              this.authService.saveUserId(oldUserId);
              this.authService.saveUserAccessToken(this.oldToken);
            }
          }),
          switchMap((res) =>
            iif(
              () => this.oldAnonymousStatus && !!oldUserId,
              this.authService.mergeUserById([oldUserId], newUserId),
              of(res)
            )
          ),
          catchError((err: Error) => {
            throw err.message.startsWith('PI_')
              ? err
              : new Error('PI_MERGE_FAIL');
          }),
          tap(() => {
            if (this.oldAnonymousStatus) {
              this.authService.savePI(pi);
              this.authService.saveUserId(newUserId);
              this.authService.saveUserAccessToken(newToken);
              this.authService.saveAnonymous(false);
            }
          }),
          switchMap(() => {
            if (
              this.stateData &&
              this.stateData.engagementType === 'survey' &&
              this.stateData.campaignId &&
              this.stateData.answers &&
              this.stateData.surveyId
            ) {
              return this.surveyService.postSurveyAnswer(
                this.stateData.answers[0],
                this.moveId
              );
            }
            if (
              this.stateData &&
              this.stateData.engagementType === 'game' &&
              this.stateData.transactionId
            ) {
              return this.gameService
                .prePlayConfirm(this.stateData.transactionId)
                .pipe(retryWhen(retryWhenTransactionFailed));
            }
            if (
              this.stateData &&
              this.stateData.engagementType === 'instant_outcome' &&
              this.stateData.transactionId
            ) {
              return this.instantOutcomeService
                .prePlayConfirm(this.stateData.transactionId)
                .pipe(retryWhen(retryWhenTransactionFailed));
            }
            throw new Error('PI_NO_TRANSACTION_MATCH');
          }),
          catchError((err: Error) => {
            throw err.message.startsWith('PI_')
              ? err
              : new Error('PI_TRANSACTION_CONFIRM_FAIL');
          })
        )
        .subscribe(
          () => {
            this.router.navigate(['/wallet']);
            if (this.stateData && this.stateData.popupData) {
              this.notificationService.addPopup(this.stateData.popupData);
            }
          },
          (error: Error) => this.updateErrorMessage(error.message)
        );
    }
  }

  public updateErrorMessage(error: string): void {
    this.translate.get(error).subscribe((res) => (this.errorMessage = res));
  }

  public matchingPasswords(
    passwordKey: string,
    passwordConfirmationKey: string
  ): (group: FormGroup) => void {
    return (group: FormGroup) => {
      const password = group.controls[passwordKey];
      const passwordConfirmation = group.controls[passwordConfirmationKey];
      if (password.value !== passwordConfirmation.value) {
        return passwordConfirmation.setErrors({ mismatchedPasswords: true });
      }
      passwordConfirmation.setErrors(null);
    };
  }

  public onUpdateSignUpForm(): void {
    if (this.countryCodePrefix && this.loginMethod === LoginType.phone) {
      this.signupForm.controls.countryCode.setValue([this.countryCodePrefix]);
      this.signupForm.controls.countryCode.setValidators([Validators.required]);
    }
  }
}
