import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  AuthenticationService,
  IPopupConfig,
  IPrePlayStateData,
  IQuiz,
  NotificationService,
  QuizComponent as QuizCoreComponent,
  QuizService
} from '@perxtech/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators';

interface IAnswer {
  questionId: string;
  content: any;
}

@Component({
  selector: 'perx-blackcomb-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, OnDestroy {
  @ViewChild('overflowContainer', { static: false })
  private overflowContainer: ElementRef | undefined;
  @ViewChild('overFarrow', { static: false }) private overFarrow: ElementRef;
  @ViewChild('coreQuiz', { static: false })
  private coreSurvey: QuizCoreComponent;
  public data$: Observable<IQuiz>;
  public intervalId: number;
  public quiz: IQuiz;
  public answers: IAnswer[] = [];
  public totalLength: number;
  public currentPointer: number;
  public questionPointer: number = 0;
  private hideArrow = () => this.overFarrow.nativeElement.classList.add('hidden');
  private isAnonymousUser: boolean;
  private informationCollectionSetting: string;
  private destroy$: Subject<any> = new Subject();
  private popupData: IPopupConfig;
  public successPopUp: IPopupConfig = {
    title: 'SURVEY_SUCCESS_TITLE',
    text: 'SURVEY_SUCCESS_TEXT',
    imageUrl: 'assets/congrats_image.png',
    buttonTxt: 'CLOSE'
  };

  public noRewardsPopUp: IPopupConfig = {
    title: 'SURVEY_NO_REWARDS_TITLE',
    text: 'SURVEY_NO_REWARDS_TEXT',
    imageUrl: '',
    buttonTxt: 'BACK_TO_WALLET'
  };

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private quizService: QuizService,
    private translate: TranslateService,
    private auth: AuthenticationService,
    private cd: ChangeDetectorRef,
    private ngZone: NgZone
  ) { }

  public ngOnInit(): void {
    this.initTranslate();
    this.isAnonymousUser = this.auth.getAnonymous();
    this.data$ = this.route.paramMap.pipe(
      filter((params: ParamMap) => params.has('id')),
      map((params: ParamMap) => params.get('id')),
      map((id: string) => Number.parseInt(id, 10)),
      switchMap((idN: number) => this.quizService.getQuizFromCampaign(idN)),
      filter(quiz => !!quiz),
      takeUntil(this.destroy$)
    );
    this.data$.subscribe(
      (quiz: IQuiz) => {
        this.quiz = quiz;
        const { displayProperties } = this.quiz;
        if (
          displayProperties &&
          displayProperties.informationCollectionSetting
        ) {
          this.informationCollectionSetting =
            displayProperties.informationCollectionSetting;
        }
        const successOutcome = quiz.results.outcome;
        const noOutcome = quiz.results.noOutcome;
        if (noOutcome) {
          this.noRewardsPopUp.title = noOutcome.title;
          this.noRewardsPopUp.text = noOutcome.subTitle;
          this.noRewardsPopUp.imageUrl =
            noOutcome.image || this.noRewardsPopUp.imageUrl;
          this.noRewardsPopUp.buttonTxt =
            noOutcome.button || this.noRewardsPopUp.buttonTxt;
        }
        if (successOutcome) {
          this.successPopUp.title = successOutcome.title;
          this.successPopUp.text = successOutcome.subTitle;
          this.successPopUp.imageUrl =
            successOutcome.image || this.successPopUp.imageUrl;
          this.successPopUp.buttonTxt =
            successOutcome.button || this.successPopUp.buttonTxt;
        }
        this.ngZone.runOutsideAngular(() => {
          // everytime an event fires change detection gets run, we run these events outside angular to minimise cd change
          // setTimeout allows me delay so that i am confirmed access the nativeElement
          window.setTimeout(() => {
            // handle scroll event on angular,
            if (this.overflowContainer) {
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
    // current questionPointer, WARNING: not implemented yet, stub
    if (this.quizId) {
      this.quizService.patchQuizAnswer(
        this.answers,
        this.route.snapshot.params.id,
        this.quizId
      );
    }
    return ((this.questionPointer + 1) / this.totalLength) * 100 || 0;
  }

  public get surveyComplete(): boolean {
    const { questions } = this.quiz; // to find if the question is required or not
    if (
      this.questionPointer === this.totalLength - 1 &&
      !questions[this.questionPointer].required
    ) {
      return true;
    }
    return (
      this.questionPointer === this.totalLength - 1 &&
      this.answers[this.questionPointer] &&
      this.answers[this.questionPointer].content
    );
  }

  public onSubmit(): void {
    const surveyId = this.quizId;
    const isCollectDataRequired = !!(
      this.informationCollectionSetting === 'pi_required' ||
      this.informationCollectionSetting === 'signup_required'
    );
    const userAction$: Observable<{ hasOutcomes: boolean }> =
      !surveyId || (this.isAnonymousUser && isCollectDataRequired)
        ? of({ hasOutcomes: true })
        : this.quizService
          .postQuizAnswer(
            this.answers,
            this.route.snapshot.params.id,
            surveyId
          )
          .pipe(
            catchError((err: HttpErrorResponse) => {
              this.popupData = this.noRewardsPopUp;
              throw err;
            })
          );

    userAction$.subscribe(
      res => {
        this.popupData = res.hasOutcomes
          ? this.successPopUp
          : this.noRewardsPopUp;
        this.redirectUrlAndPopUp();
      },
      () => {
        this.popupData = this.noRewardsPopUp;
        this.redirectUrlAndPopUp();
      }
    );
  }

  private initTranslate(): void {
    if (this.successPopUp.title) {
      this.translate
        .get(this.successPopUp.title)
        .subscribe(text => (this.successPopUp.title = text));
    }
    if (this.successPopUp.text) {
      this.translate
        .get(this.successPopUp.text)
        .subscribe(text => (this.successPopUp.text = text));
    }
    if (this.successPopUp.buttonTxt) {
      this.translate
        .get(this.successPopUp.buttonTxt)
        .subscribe(text => (this.successPopUp.buttonTxt = text));
    }
    if (this.noRewardsPopUp.title) {
      this.translate
        .get(this.noRewardsPopUp.title)
        .subscribe(text => (this.noRewardsPopUp.title = text));
    }
    if (this.noRewardsPopUp.text) {
      this.translate
        .get(this.noRewardsPopUp.text)
        .subscribe(text => (this.noRewardsPopUp.text = text));
    }
    if (this.noRewardsPopUp.buttonTxt) {
      this.translate
        .get(this.noRewardsPopUp.buttonTxt)
        .subscribe(text => (this.noRewardsPopUp.buttonTxt = text));
    }
  }

  private redirectUrlAndPopUp(): void {
    const surveyId = this.quizId;
    const campaignId = this.route.snapshot.params.id
      ? Number.parseInt(this.route.snapshot.params.id, 10)
      : null;
    const state: IPrePlayStateData = {
      popupData: this.popupData,
      engagementType: 'survey',
      surveyId,
      collectInfo: true,
      campaignId,
      answers: this.answers
    };

    if (
      this.isAnonymousUser &&
      this.informationCollectionSetting === 'pi_required'
    ) {
      this.router.navigate(['/pi'], { state });
    } else if (
      this.isAnonymousUser &&
      this.informationCollectionSetting === 'signup_required'
    ) {
      this.router.navigate(['/signup'], { state });
    } else {
      this.router.navigate(['/wallet']);
      this.notificationService.addPopup(this.popupData);
    }
  }

  public setTotalLength(totalLength: number): void {
    this.totalLength = totalLength;
  }

  public setCurrentPointer(currentPointer: number): void {
    // has to have two detectChanges here
    this.currentPointer = currentPointer;
    this.cd.detectChanges();

    this.checkShowOverArrow();
    this.cd.detectChanges();
  }

  public updateSurveyStatus(answers: IAnswer[]): void {
    if (this.answers) {
      this.answers = answers;
    }
  }

  public checkShowOverArrow(): void {
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

  public updateQuestionPointer(action: string): void {
    const { questions } = this.quiz; // to find if the question is required or not
    // updateQuestion will be called when questionPointer cause child to emit currentPointer
    if (action === 'next') {
      // core validate
      const questionComponentsArr = this.coreSurvey.questionComponents.toArray();
      // call validate on the particular question
      questionComponentsArr[this.questionPointer].questionValidation();
      if (!questionComponentsArr[this.questionPointer].errorState.hasError) {
        if (!questions[this.questionPointer].required) {
          // able to go next if not required
          this.questionPointer++;
        }
        const answerToCurrentQuestion = this.answers.find(
          answer => parseInt(answer.questionId, 10) === this.questionPointer
        );
        if (answerToCurrentQuestion && answerToCurrentQuestion.content) {
          // able to go next if answer has been answered
          this.questionPointer++;
        }
      }
    } else {
      this.questionPointer--;
    }
  }

  private get quizId(): number | null {
    return this.quiz && this.quiz.id ? Number.parseInt(this.quiz.id, 10) : null;
  }
}
