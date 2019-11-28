import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import {
  IFormsService,
  AuthenticationService,
  IGameService,
  InstantOutcomeService,
  NotificationService,
  IPrePlayStateData,
  ISurvey,
  IAnswer,
  SurveyService
} from '@perx/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, iif, of, throwError } from 'rxjs';
import { catchError, tap, switchMap, retryWhen, delay, mergeMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';

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
  private stateData: IPrePlayStateData;
  private maxRetryTimes: number = 5;
  private retryTimes: number = 0;

  constructor(
    private formSvc: IFormsService,
    private authService: AuthenticationService,
    public snack: MatSnackBar,
    private notificationService: NotificationService,
    private router: Router,
    private translate: TranslateService,
    private gameService: IGameService,
    private surveyService: SurveyService,
    private location: Location,
    private instantOutcomeService: InstantOutcomeService
  ) { }

  public ngOnInit(): void {
    this.data$ = this.formSvc.getSignupForm();
    this.stateData = this.location.getState() as IPrePlayStateData;
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public get surveyComplete(): boolean {
    return this.currentPointer === this.totalLength;
  }

  public setTotalLength(totalLength: number): void {
    this.totalLength = totalLength;
  }

  public setCurrentPointer(currentPointer: number): void {
    this.currentPointer = currentPointer;
  }

  public updateSurveyStatus(answers: IAnswer[]): void {
    this.answers = answers;
  }

  public onSubmit(): void {
    const userObj: ISignupAttributes = {};
    this.answers.forEach(answer => {
      if (answer.questionId !== undefined) {
        userObj[answer.questionId] = answer.content;
      }
    });
    const PI = userObj.primary_identifier;
    if (PI) {
      if (this.stateData && this.stateData.collectInfo) {
        this.submitDataAndCollectInformation(PI, userObj);
      }
      this.submitData(PI, userObj);
    }
  }

  private submitData(PI: string, userObj: ISignupAttributes): void {
    this.authService.createUserAndAutoLogin(PI, userObj).subscribe(
      () => {
        this.snack.open('User successfully created.', 'x', { duration: 2000 });
        this.router.navigate(['/wallet']);
      },
      (err) => console.error(err)
    );
  }

  private submitDataAndCollectInformation(PI: string, userObj: ISignupAttributes): void {
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
      const oldPI = this.authService.getPI();
      const oldToken = this.authService.getUserAccessToken();
      const oldAnonymousStatus = this.authService.getAnonymous();
      let newUserId;
      let newToken;
      this.authService.createUserAndAutoLogin(PI, userObj, false).pipe(
        catchError(() => { throw new Error(''); }),
        tap(() => {
          if (oldAnonymousStatus) {
            newUserId = this.authService.getUserId();
            newToken = this.authService.getUserAccessToken();
            this.authService.savePI(oldPI);
            this.authService.saveUserId(oldUserId);
            this.authService.saveUserAccessToken(oldToken);
          }
        }),
        switchMap((res) => iif(() => oldAnonymousStatus, this.authService.mergeUserById([oldUserId], newUserId), of(res))),
        catchError((err: Error) => {
          throw err.message.startsWith('PI_') ? err : new Error('PI_MERGE_FAIL');
        }),
        tap(() => {
          if (oldAnonymousStatus) {
            this.authService.savePI(PI);
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
