import { ChangeDetectorRef, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
  IQuiz,
  QuizComponent as QuizCoreComponent,
  QuizService,
  IQAnswer,
  ITracker,
  IPoints
} from '@perxtech/core';
import { Observable, Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';

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

  private destroy$: Subject<void> = new Subject();
  @ViewChild('overflowContainer', { static: false })
  private overflowContainer: ElementRef | undefined;
  @ViewChild('overFarrow', { static: false }) private overFarrow: ElementRef;
  @ViewChild('coreComponent', { static: false })
  private coreComponent: QuizCoreComponent;
  private answers: ITracker<IQAnswer> = {};
  private moveId: number | undefined;

  constructor(
    // private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private quizService: QuizService,
    private cd: ChangeDetectorRef,
    private ngZone: NgZone
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
    // current questionPointer, WARNING: not implemented yet, stub
    if (this.quizId) {
      this.quizService.postQuizAnswer(
        Object.values(this.answers)[0],
        this.campaignId || 0,
      );
    }
  }

  public done(): void {
    this.complete = true;
  }

  public submit(): void {
    if (!this.moveId) {
      console.error('cannot go further without a move id');
      return;
    }

    this.quizService
      .postQuizAnswer(
        Object.values(this.answers)[0],
        this.moveId,
      ).subscribe(
        () => this.redirectUrlAndPopUp(),
        () => this.redirectUrlAndPopUp()
      );
  }

  public next(): void {
    // core validate
    const questionComponentsArr = this.coreComponent.questionComponents.toArray();
    // call validate on the particular question
    if (questionComponentsArr[this.questionPointer].questionValidation()) {
      this.questionPointer++;
      this.questionChanged();
    }
  }

  public back(): void {
    this.questionPointer--;
  }

  private fetchMoveId(): void {
    const quizId = this.quizId;
    if (quizId === null) {
      console.error('cannot fetch move without quiz id', this.quiz);
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
    // NL todo temporary stuff until we have a way to get the proper number of points
    const results: IPoints[] = this.quiz.questions.map(q => ({
      questionId: q.id,
      question: q.question,
      point: Math.random() < .3 ? 0 : 1,
      time: Math.random() * 20
    }));
    const resultsStr = JSON.stringify(results);
    this.router.navigate(['/quiz-results', { results: resultsStr }], { skipLocationChange: true });
  }

  private hideArrow(): void {
    this.overFarrow.nativeElement.classList.add('hidden');
  }

  private get quizId(): number | null {
    return this.quiz && this.quiz.id || null;
  }

  private get campaignId(): number | null {
    return this.route.snapshot.params.id
      ? Number.parseInt(this.route.snapshot.params.id, 10)
      : null;
  }
}
