import { ChangeDetectorRef, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IAnswerResult, IPoints, IQAnswer, IQuiz, ITracker, NotificationService, QuizComponent as QuizCoreComponent, QuizService } from '@perxtech/core';
import { Observable, Subject, throwError } from 'rxjs';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'perx-blackcomb-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, OnDestroy {
  public data$: Observable<IQuiz>;
  public quiz: IQuiz;
  public totalLength: number;
  public questionPointer: number = 0;
  public complete: boolean = false;
  public resetTimer$: Subject<void> = new Subject<void>();

  private destroy$: Subject<void> = new Subject();
  @ViewChild('overflowContainer', { static: false })
  private overflowContainer: ElementRef | undefined;
  @ViewChild('overFarrow', { static: false }) private overFarrow: ElementRef;
  @ViewChild('coreComponent', { static: false })
  private coreComponent: QuizCoreComponent;
  private answers: ITracker<IQAnswer> = {};
  private moveId: number | undefined;
  private points: ITracker<IPoints> = {};
  private timer: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private quizService: QuizService,
    private cd: ChangeDetectorRef,
    private ngZone: NgZone,
    private notificationService: NotificationService
  ) {
    this.hideArrow = this.hideArrow.bind(this);
  }

  public ngOnInit(): void {
    this.data$ = this.route.paramMap.pipe(
      filter((params: ParamMap) => params.has('cid')),
      map((params: ParamMap) => params.get('cid')),
      map((cid: string) => Number.parseInt(cid, 10)),
      switchMap((cidN: number) => this.quizService.getQuizFromCampaign(cidN)),
      filter(quiz => !!quiz),
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
          }
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
      () => this.router.navigate(['/wallet'])
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

  public get progressBarValue(): number {
    return ((this.questionPointer + 1) / this.totalLength) * 100 || 0;
  }

  private questionChanged(): void {
    this.cd.detectChanges();

    this.checkShowOverArrow();
    this.cd.detectChanges();
  }

  public updateQuizStatus(answers: ITracker<IQAnswer>): void {
    this.answers = answers;
  }

  public done(): void {
    this.complete = true;
  }

  public submit(): void {
    this.pushAnswer(this.questionPointer)
      .subscribe(
        () => this.redirectUrlAndPopUp(),
        (err) => {
          console.log(err);
          this.notificationService.addSnack('There was an issue when trying to submit your last answer.');
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
          () => { },
          (err) => {
            console.log(err);
            this.notificationService.addSnack('There was an issue when trying to submit your last answer.');
          }
        );
      this.resetTimer();
      this.questionPointer++;
      this.questionChanged();
    }
  }

  public back(): void {
    this.questionPointer--;
  }

  public timesUp(): void {
    const questionPointer = this.questionPointer;
    if (this.quiz.questions.length - 1 === questionPointer) {
      this.submit();
    } else {
      this.pushAnswer(questionPointer).subscribe(() => { });
      this.questionPointer++;
      this.questionChanged();
      this.resetTimer();
    }
  }

  private pushAnswer(questionPointer: number): Observable<void> {
    if (!this.moveId) {
      return throwError('Cannot push answer without move id');
    }

    const answer = Object.values(this.answers)[questionPointer];
    const time = this.currentTime - this.timer;
    // current questionPointer, WARNING: not implemented yet, stub
    return this.quizService.postQuizAnswer(
      { ...answer, timeTaken: time },
      this.moveId,
    ).pipe(
      tap((res: IAnswerResult) => {
        this.points[questionPointer] = {
          questionId: answer.questionId,
          question: this.quiz.questions[questionPointer].question,
          points: res.points,
          time
        };
      }),
      map(() => (void 0))
    );
  }

  private fetchMoveId(): void {
    const quizId = this.quizId;
    if (quizId === null) {
      console.error('cannot fetch move without quiz id', this.quiz);
      this.notificationService.addSnack('This quiz is currently unavailable. Sorry for the inconvenience');
      this.router.navigate(['/home']);
      return;
    }
    this.quizService.getMove(quizId)
      .subscribe((move) => this.moveId = move.moveId);
  }

  private checkShowOverArrow(): void {
    let card: HTMLElement;
    let arrow: HTMLElement;
    if (this.overflowContainer && this.overflowContainer.nativeElement) {
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
    const resultsStr = JSON.stringify(Object.values(this.points));
    this.router.navigate(['/quiz-results', { results: resultsStr }], { skipLocationChange: true });
  }

  private hideArrow(): void {
    this.overFarrow.nativeElement.classList.add('hidden');
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
