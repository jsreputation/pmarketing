import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  AbstractControl,
} from '@angular/forms';
import { Location } from '@angular/common';
import { Subject, iif, of, Observable, throwError } from 'rxjs';
import { Config, AuthenticationService, InstantOutcomeService, IGameService, NotificationService, IPrePlayStateData, SurveyService } from '@perx/core';
import { switchMap, catchError, tap, retryWhen, delay, mergeMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'perx-blackcomb-pages-pi',
  templateUrl: './pi.component.html',
  styleUrls: ['./pi.component.scss']
})
export class PIComponent implements OnInit, OnDestroy {
  public PIForm: FormGroup;
  public errorMessage: string | null = null;
  public preAuth: boolean;
  public failedAuth: boolean;
  private destroy$: Subject<any> = new Subject();
  private stateData: IPrePlayStateData;

  private initForm(): void {
    this.PIForm = this.fb.group({
      pi: ['', Validators.required],
    });
  }

  constructor(
    private fb: FormBuilder,
    private config: Config,
    private router: Router,
    private gameService: IGameService,
    private surveyService: SurveyService,
    private instantOutcomeService: InstantOutcomeService,
    private translate: TranslateService,
    private authService: AuthenticationService,
    private location: Location,
    private notificationService: NotificationService
  ) {
    this.preAuth = this.config.preAuth || false;
  }

  public ngOnInit(): void {
    this.initForm();
    this.stateData = this.location.getState() as IPrePlayStateData;
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public get piField(): AbstractControl {
    return this.PIForm.get('pi') as AbstractControl;
  }

  public onSubmit(): void {
    const pi: string | null = this.piField.value as string;
    this.errorMessage = null;

    if (pi) {
      const oldUserId = this.authService.getUserId();
      const retryWhenTransactionFailed = (err: Observable<HttpErrorResponse>) => err.pipe(
        mergeMap(error => {
          if (error.status === 422) {
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
      (window as any).primaryIdentifier = pi;
      this.authService.autoLogin().pipe(
        catchError(() => { throw new Error('PI_NOT_EXIST'); }),
        tap(() => {
          if (oldAnonymousStatus) {
            newUserId = this.authService.getUserId();
            newToken = this.authService.getUserAccessToken();
            this.authService.savePI(oldPI);
            this.authService.saveUserId(oldUserId);
            this.authService.saveUserAccessToken(oldToken);
          }
        }),
        switchMap((res) => iif(() => this.authService.getAnonymous(), this.authService.mergeUserById([oldUserId], newUserId), of(res))),
        catchError((err: Error) => {
          throw err.message.startsWith('PI_') ? err : new Error('PI_MERGE_FAIL');
        }),
        tap(() => {
          if (oldAnonymousStatus) {
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
          if (this.stateData.popupData) {
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
