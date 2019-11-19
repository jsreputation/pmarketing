import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import {
  IFormsService,
  AuthenticationService,
  IPopupConfig,
  PopupComponent,
  IGameService,
  InstantOutcomeService
} from '@perx/core';
import { ISurvey, IAnswer } from '@perx/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, iif, of } from 'rxjs';
import { takeUntil, catchError, tap, switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

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
  private popupData: IPopupConfig;
  private engagementType: string;
  private transactionId: number;
  private collectInfo: boolean;
  public errorMessage: string | null = null;

  constructor(
    private formSvc: IFormsService,
    private authService: AuthenticationService,
    public snack: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private gameService: IGameService,
    private instantOutcomeService: InstantOutcomeService
  ) { }

  public ngOnInit(): void {
    this.data$ = this.formSvc.getSignupForm();
    this.route.queryParams.pipe(
      takeUntil(this.destroy$)
    ).subscribe((params) => {
      if (params && params.popupData) {
        this.popupData = JSON.parse(params.popupData);
      }
      if (params && params.engagementType) {
        this.engagementType = params.engagementType;
      }
      if (params && params.transactionId) {
        this.transactionId = parseInt(params.transactionId, 10);
      }
      if (params && params.collectInfo) {
        this.collectInfo = !!params.collectInfo;
      }
    });
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

  private getPI(userObj: ISignupAttributes): string | null {
    const PISource = userObj['phone_number'] || userObj['phoneNumber'];
    if (!PISource) {
      return null;
    }
    return PISource.split(' ')[1];
  }

  public onSubmit(): void {
    const userObj: ISignupAttributes = {};
    this.answers.forEach(answer => {
      if (answer.questionId !== undefined) {
        userObj[answer.questionId] = answer.content;
      }
    });
    const PI = this.getPI(userObj);
    if (PI) {
      if (this.collectInfo) {
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
          if (this.engagementType === 'game' && this.transactionId) {
            return this.gameService.prePlayConfirm(this.transactionId);
          }
          if (this.engagementType === 'instant_outcome' && this.transactionId) {
            return this.instantOutcomeService.prePlayConfirm(this.transactionId);
          }
          throw new Error('PI_NO_TRANSACTION_MATCH');
        }),
        catchError((err: Error) => {
          throw err.message.startsWith('PI_') ? err : new Error('PI_TRANSACTION_CONFIRM_FAIL');
        }),
      ).subscribe(
        () => {
          this.router.navigate(['/wallet']);
          if (this.popupData) {
            this.dialog.open(PopupComponent, { data: this.popupData });
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
