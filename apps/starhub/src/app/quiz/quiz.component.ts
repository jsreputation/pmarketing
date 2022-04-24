import { ChangeDetectorRef, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  IAnswerResult,
  IPoints,
  IQAnswer,
  IQuiz,
  IQuizResultOutcome,
  ISwipePayload,
  ITracker,
  NotificationService,
  QuizComponent as QuizCoreComponent,
  QuizMode,
  QuizQuestionType,
  QuizService,
  SwipeConfiguration,
  SwipeListType
} from '@perxtech/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BehaviorSubject, iif, Observable, of, Subject, throwError } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ErrorMessageService } from '../utils/error-message/error-message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, OnDestroy {
  public data$: Observable<IQuiz>;
  public quiz: IQuiz;
  public mode: typeof QuizMode = QuizMode;
  public totalLength: number;
  public questionPointer: number = 0;
  public complete: boolean = false;
  public resetTimer$: Subject<void> = new Subject<void>();
  public progress$: BehaviorSubject<number> = new BehaviorSubject(0);
  public allowPicZoom$!: Observable<boolean>;

  private destroy$: Subject<void> = new Subject();
  @ViewChild('overflowContainer')
  private overflowContainer: ElementRef | undefined;
  @ViewChild('overFarrow') private overFarrow: ElementRef | undefined;
  @ViewChild('coreComponent')
  private coreComponent: QuizCoreComponent;
  private answers: ITracker<IQAnswer> = {};
  private moveId: number | undefined;
  private points: ITracker<IPoints> = {};
  private timer: number;
  private static swipeConfig: SwipeConfiguration = {
    classname: 'swipe-blackcomb',
    numberOfIcons: 1,
    listType: SwipeListType.LISTWITHICON
  };
  private submitErrorTxt: string = 'Error Submitting Answer';
  public disableNextButton: boolean = true;
  public rewardAcquired: boolean = false;
  public title: string;
  public text: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private quizService: QuizService,
    private cd: ChangeDetectorRef,
    private ngZone: NgZone,
    private notificationService: NotificationService,
    private errorMessageService: ErrorMessageService,
    private translate: TranslateService
  ) {
    this.hideArrow = this.hideArrow.bind(this);
  }

  public ngOnInit(): void {
    // reuse the factory to resolve current language so that we make sure, we use the same logic
    this.allowPicZoom$ = this.route.data.pipe(
      map((dataObj) => dataObj.allowPicZoom)
    );
    this.data$ = this.route.paramMap.pipe(
      filter((params: ParamMap) => params.has('cid')),
      map((params: ParamMap) => params.get('cid')),
      map((cid: string) => Number.parseInt(cid, 10)),
      switchMap((cidN: number) => this.quizService.getQuizFromCampaign(cidN)),
      catchError((err: Error) => {
        console.error(err.name, err.message);
        this.notificationService.addPopup({
          title: 'Quiz is not Available',
          buttonTxt: 'Back'
        });
        this.router.navigate(['/home']);
        return throwError(err);
      }),
      map(quiz => {
        quiz.questions = quiz.questions
          .map(question => {
            if ([QuizQuestionType.swipeSelect, QuizQuestionType.swipeDelete].includes(question.payload.type)) {
              // patch the swipe based questions payload to make sure they look as expected
              question.meta = QuizComponent.swipeConfig;
              // add potentially missing icons
              (question.payload as ISwipePayload).choices
                .filter((choice) => !choice.icon)
                .forEach((choice) => choice.icon = 'arrow_forward');
            }
            return question;
          });
        return quiz;
      }),
      takeUntil(this.destroy$)
    );

    this.data$.subscribe(
      (quiz: IQuiz) => {
        this.quiz = quiz;
        this.fetchMoveId();
        this.resetTimer();
        // prepopulate answers
        quiz.questions.forEach(q => {
          this.answers[q.id] = {
            questionId: q.id,
            content: []
          };
        });

        this.ngZone.runOutsideAngular(() => {
          // everytime an event fires change detection gets run, we run these events outside angular to minimise cd change
          // setTimeout allows me delay so that i am confirmed access the nativeElement
          window.setTimeout(() => {
            // handle scroll event on angular,
            if (this.overflowContainer && this.overflowContainer.nativeElement) {
              this.overflowContainer.nativeElement.addEventListener(
                'scroll',
                this.hideArrow,
                { passive: true }
              );
              this.overflowContainer.nativeElement.addEventListener(
                'click',
                this.hideArrow
              );
            }
          }, 0);
        });
      },
      () => this.router.navigate(['/'])
    );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.overflowContainer !== undefined) {
      this.overflowContainer.nativeElement.removeEventListener('scroll', this.hideArrow);
      this.overflowContainer.nativeElement.removeEventListener('click', this.hideArrow);
    }
  }

  private questionChanged(): void {
    this.cd.detectChanges();

    this.checkShowOverArrow();
    this.cd.detectChanges();
  }

  public updateQuizStatus(answers: ITracker<IQAnswer>): void {
    // patch previous answer object
    this.answers = { ...this.answers, ...answers };

    // validate for non skippable quizzes
    const questionComponentsArr = this.coreComponent.questionComponents.toArray();
    const questionPointer = this.questionPointer;
    this.disableNextButton = !questionComponentsArr[questionPointer].questionValidation();

    if (this.quiz.mode !== QuizMode.basic) {
      this.nextWithoutValidation();
    }
  }

  public done(): void {
    this.complete = true;
  }

  public submit(): void {
    this.pushAnswer(this.questionPointer)
      .subscribe(
        (quizOutcome) => {
          this.rewardAcquired = quizOutcome?.rewardAcquired;
          this.redirectUrlAndPopUp();
        },
        (err) => {
          console.error(err);
          this.notificationService.addSnack(this.submitErrorTxt);
          this.redirectUrlAndPopUp();
        }
      );
  }

  public next(): void {
    // core validate
    const questionComponentsArr = this.coreComponent.questionComponents.toArray();
    const questionPointer = this.questionPointer;
    // call validate on the particular question
    if (questionComponentsArr[questionPointer].questionValidation()) {
      this.pushAnswer(questionPointer)
        .subscribe(
          () => {
            this.disableNextButton = true;
          },
          (err) => {
            console.error(err);
            this.notificationService.addSnack(this.submitErrorTxt);
          }
        );
      this.resetTimer();
      this.questionPointer++;
      this.progress$.next(((this.questionPointer + 1) / this.totalLength) * 100 || 0);
      this.questionChanged();
    }
  }

  public back(): void {
    this.questionPointer--;
  }

  public nextWithoutValidation(): void {
    const questionPointer = this.questionPointer;
    if (this.quiz.questions.length - 1 === questionPointer) {
      this.complete = true;
      this.submit();
    } else {
      this.pushAnswer(questionPointer).subscribe(() => {
        this.disableNextButton = true;
      });
      this.questionPointer++;
      this.questionChanged();
      this.resetTimer();
    }
  }

  private pushAnswer(questionPointer: number): Observable<IQuizResultOutcome> {
    if (!this.moveId) {
      return throwError('Cannot push answer without move id');
    }

    const answer: IQAnswer = Object.values(this.answers)[questionPointer];
    const time = this.currentTime - this.timer;
    // current questionPointer, WARNING: not implemented yet, stub
    return this.quizService.postQuizAnswer(
      { ...answer, timeTaken: time },
      this.moveId,
    ).pipe(
      tap((res: IAnswerResult) => {
        this.points[questionPointer] = {
          questionId: answer.questionId,
          question: this.quiz.questions[questionPointer].question.text,
          points: res.points,
          time
        };
      }),
      switchMap(
        () => iif(
          () => this.complete,
          this.quizService.postFinalQuizAnswer(this.moveId as number),
          of() // let the observable complete
        )
      ),
      catchError(err => {
        // the posting finalquiz answer causing error to catch and rewriting the points to undefined
        // save the fact the broken submission for next page
        this.points[questionPointer] = {
          questionId: answer.questionId,
          question: this.quiz.questions[questionPointer].question.text,
          points: undefined,
          time
        };
        return throwError(err);
      })
    );
  }

  private fetchMoveId(): void {
    const quizId = this.quizId;
    if (quizId === null) {
      console.error('cannot fetch move without quiz id', this.quiz);
      this.router.navigate(['/home']);
      return;
    }
    this.quizService.getMove(quizId)
      .subscribe(
        (move) => this.moveId = move.moveId,
        (err: { errorState: string } | HttpErrorResponse) => {
          if (err instanceof HttpErrorResponse) {
            this.errorMessageService.getErrorMessageByErrorCode(err.error.code, err.error.message)
              .subscribe((message) => {
                if (message.indexOf('Move limit has reached') !== -1 || message.indexOf('Something went wrong') !== -1) {
                  this.translate.get(['ERRORS.OUT_OF_TRIES_TITLE', 'ERRORS.OUT_OF_TRIES_TXT']).subscribe(
                    (res) => {
                      this.title = res['ERRORS.OUT_OF_TRIES_TITLE'];
                      this.text = res['ERRORS.OUT_OF_TRIES_TXT'];
                    }
                  );
                  this.notificationService.addPopup({
                    title: this.title,
                    text: this.text,
                    disableOverlayClose: true,
                    panelClass: 'custom-class'
                  });
                }
              });
          } else {
            this.notificationService.addPopup({
              title: 'Quiz is not Available',
              buttonTxt: 'Back'
            });
          }
          this.router.navigate(['/home']);
        }
      );
  }

  private checkShowOverArrow(): void {
    let card: HTMLElement;
    let arrow: HTMLElement;
    if (this.overflowContainer && this.overflowContainer.nativeElement &&
      this.overFarrow && this.overFarrow.nativeElement) {
      card = this.overflowContainer.nativeElement;
      arrow = this.overFarrow.nativeElement;
      const isOverflowing = card.clientHeight < card.scrollHeight;
      if (isOverflowing) {
        arrow.classList.remove('hidden');
      } else {
        arrow.classList.add('hidden');
      }
    }
  }

  private redirectUrlAndPopUp(): void {
    const resultsStr = JSON.stringify({ points: Object.values(this.points), quiz: this.quiz, rewardAcquired: this.rewardAcquired });
    this.router.navigate(['/quiz-results', { results: resultsStr }], { skipLocationChange: true });
  }

  private hideArrow(): void {
    if (this.overFarrow && this.overFarrow.nativeElement) {
      this.overFarrow.nativeElement.classList.add('hidden');
    }
  }

  private get quizId(): number | null {
    return this.quiz && this.quiz.id || null;
  }

  private resetTimer(): void {
    this.timer = this.currentTime;
    this.resetTimer$.next();
  }

  private get currentTime(): number {
    return (new Date()).getTime() / 1000;
  }

}
