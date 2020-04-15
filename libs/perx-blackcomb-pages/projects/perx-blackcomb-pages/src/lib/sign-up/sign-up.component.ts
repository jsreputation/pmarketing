import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  AuthenticationService,
  IGameService,
  InstantOutcomeService,
  NotificationService,
  IPrePlayStateData,
  ISurvey,
  IAnswer,
  SurveyService,
  ThemesService,
  ITheme,
  ConfigService,
  IConfig,
  GeneralStaticDataService,
  ICountryCode
} from '@perxtech/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, iif, of, throwError } from 'rxjs';
import { catchError, tap, switchMap, retryWhen, delay, mergeMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { PinMode } from '../enter-pin/enter-pin.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

interface ISignupAttributes {
  [key: string]: any;
}

@Component({
  selector: 'perx-blackcomb-pages-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {
  public data$: Observable<ISurvey | undefined>;
  public destroy$: Subject<void> = new Subject();
  public survey: ISurvey;
  public answers: IAnswer[];
  public totalLength: number;
  public currentPointer: number;
  public errorMessage: string | null = null;
  public appConfig: IConfig<void>;
  private stateData: IPrePlayStateData;
  private maxRetryTimes: number = 5;
  private retryTimes: number = 0;
  private oldPI: string;
  private oldToken: string;
  private oldAnonymousStatus: boolean;
  public appAccessTokenFetched: boolean;
  public theme: Observable<ITheme>;
  public loadingSubmit: boolean = false;
  public signupForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    countryCode: ['', Validators.required],
    primary_identifier: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
  }) as FormGroup;
  public countriesList$: Observable<ICountryCode[]>;

  constructor(
    protected fb: FormBuilder,
    private authService: AuthenticationService,
    private notificationService: NotificationService,
    private router: Router,
    private translate: TranslateService,
    private gameService: IGameService,
    private surveyService: SurveyService,
    private location: Location,
    private instantOutcomeService: InstantOutcomeService,
    private themesService: ThemesService,
    private configService: ConfigService,
    private generalStaticDataService: GeneralStaticDataService
  ) { }

  public ngOnInit(): void {
    this.countriesList$ = this.generalStaticDataService.getCountriesList([
      'Hong Kong',
      'Singapore'
    ]);
    this.configService.readAppConfig<void>().subscribe((conf: IConfig<void>) => this.appConfig = conf);
    this.theme = this.themesService.getThemeSetting();
    this.oldPI = this.authService.getPI();
    this.oldToken = this.authService.getUserAccessToken();
    this.oldAnonymousStatus = this.authService.getAnonymous();
    this.stateData = this.location.getState() as IPrePlayStateData;
    const token = this.authService.getAppAccessToken();
    if (token) {
      this.appAccessTokenFetched = true;
    } else {
      this.authService.getAppToken().subscribe(() => {
        this.appAccessTokenFetched = true;
      }, (err) => {
        console.error(`Error${err}`);
      });
    }
    this.authService.logout();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onSubmit(): void {
    const userObj: ISignupAttributes = {};
    Object.entries(this.signupForm.value).forEach(([key, value]) => {
      if (key !== 'countryCode') {
        userObj[key] = value;
      }
    });
    if (userObj.primary_identifier) {
      if (this.signupForm.value.countryCode) {
        userObj.primary_identifier = this.signupForm.value.countryCode + userObj.primary_identifier;
      } else {
        // prepend with default countryCode
        userObj.primary_identifier = `65${userObj.primary_identifier}`;
      }
    }
    const pi = userObj.primary_identifier;
    if (pi) {
      if (this.stateData && this.stateData.collectInfo) {
        this.submitDataAndCollectInformation(pi, userObj);
      }
      this.loadingSubmit = true;
      this.authService.createUserAndAutoLogin(pi, userObj)
        .subscribe(
          () => {
            this.notificationService.addSnack('User successfully created.');
            this.router.navigate(['/wallet']);
          },
          (err) => {
            if (err.name && err.name === 'RequiresOtpError') {
              this.router.navigate(
                ['/otp', PinMode.register],
                { state: { mobileNo: pi } });
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

  private submitDataAndCollectInformation(pi: string, userObj: ISignupAttributes): void {
    this.errorMessage = null;

    if (userObj) {
      const oldUserId = this.authService.getUserId();
      const retryWhenTransactionFailed = (err: Observable<HttpErrorResponse>) => err.pipe(
        mergeMap(error => {
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
      this.authService.createUserAndAutoLogin(pi, userObj, false)
        .pipe(
          catchError(() => { throw new Error(''); }),
          tap(() => {
            if (this.oldAnonymousStatus) {
              newUserId = this.authService.getUserId();
              newToken = this.authService.getUserAccessToken();
              this.authService.savePI(this.oldPI);
              this.authService.saveUserId(oldUserId);
              this.authService.saveUserAccessToken(this.oldToken);
            }
          }),
          switchMap((res) => iif(
            () => this.oldAnonymousStatus && !!oldUserId,
            this.authService.mergeUserById([oldUserId], newUserId),
            of(res)
          )),
          catchError((err: Error) => {
            throw err.message.startsWith('PI_') ? err : new Error('PI_MERGE_FAIL');
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
              return this.surveyService.postSurveyAnswer(this.stateData.answers, this.stateData.campaignId, this.stateData.surveyId);
            }
            if (this.stateData && this.stateData.engagementType === 'game' && this.stateData.transactionId) {
              return this.gameService.prePlayConfirm(this.stateData.transactionId).pipe(
                retryWhen(
                  retryWhenTransactionFailed
                )
              );
            }
            if (this.stateData && this.stateData.engagementType === 'instant_outcome' && this.stateData.transactionId) {
              return this.instantOutcomeService.prePlayConfirm(this.stateData.transactionId).pipe(
                retryWhen(
                  retryWhenTransactionFailed
                )
              );
            }
            throw new Error('PI_NO_TRANSACTION_MATCH');
          }),
          catchError((err: Error) => {
            throw err.message.startsWith('PI_') ? err : new Error('PI_TRANSACTION_CONFIRM_FAIL');
          }),
        ).subscribe(
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
    this.translate.get(error).subscribe(res => this.errorMessage = res);
  }
}
