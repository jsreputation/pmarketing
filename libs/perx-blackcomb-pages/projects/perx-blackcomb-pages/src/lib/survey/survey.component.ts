import {Component, OnInit, OnDestroy, ViewChild, ElementRef, NgZone, ChangeDetectorRef} from '@angular/core';
import { NotificationService, ISurvey, SurveyService, IPopupConfig, IPrePlayStateData, AuthenticationService } from '@perx/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';
import { filter, switchMap, takeUntil, map, catchError } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';

interface IAnswer {
  question_id: string;
  content: any;
}

@Component({
  selector: 'perx-blackcomb-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit, OnDestroy {
  @ViewChild('overflowContainer', { static: false }) overflowContainer: ElementRef;
  @ViewChild('overFarrow', { static: false }) overFarrow: ElementRef;
  public data$: Observable<ISurvey>;
  public intervalId: number;
  public survey: ISurvey;
  public answers: IAnswer[] = [];
  public totalLength: number;
  public currentPointer: number;
  public questionPointer: number = 0;
  private isAnonymousUser: boolean;
  private informationCollectionSetting: string;
  private destroy$: Subject<any> = new Subject();
  private popupData: IPopupConfig;
  public successPopUp: IPopupConfig = {
    title: 'SURVEY_SUCCESS_TITLE',
    text: 'SURVEY_SUCCESS_TEXT',
    imageUrl: 'assets/congrats_image.png',
    buttonTxt: 'CLOSE',
  };

  public noRewardsPopUp: IPopupConfig = {
    title: 'SURVEY_NO_REWARDS_TITLE',
    text: 'SURVEY_NO_REWARDS_TEXT',
    imageUrl: '',
    buttonTxt: 'BACK_TO_WALLET',
  };

  private initTranslate(): void {
    if (this.successPopUp.title) {
      this.translate.get(this.successPopUp.title).subscribe((text) => this.successPopUp.title = text);
    }
    if (this.successPopUp.text) {
      this.translate.get(this.successPopUp.text).subscribe((text) => this.successPopUp.text = text);
    }
    if (this.successPopUp.buttonTxt) {
      this.translate.get(this.successPopUp.buttonTxt).subscribe((text) => this.successPopUp.buttonTxt = text);
    }
    if (this.noRewardsPopUp.title) {
      this.translate.get(this.noRewardsPopUp.title).subscribe((text) => this.noRewardsPopUp.title = text);
    }
    if (this.noRewardsPopUp.text) {
      this.translate.get(this.noRewardsPopUp.text).subscribe((text) => this.noRewardsPopUp.text = text);
    }
    if (this.noRewardsPopUp.buttonTxt) {
      this.translate.get(this.noRewardsPopUp.buttonTxt).subscribe((text) => this.noRewardsPopUp.buttonTxt = text);
    }
  }

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private surveyService: SurveyService,
    private translate: TranslateService,
    private auth: AuthenticationService,
    private cd: ChangeDetectorRef,
    private ngZone: NgZone,
  ) { }

  public ngOnInit(): void {
    this.initTranslate();
    this.isAnonymousUser = this.auth.getAnonymous();
    this.data$ = this.route.paramMap
      .pipe(
        filter((params: ParamMap) => params.has('id')),
        map((params: ParamMap) => params.get('id')),
        switchMap((id: string) => {
          const idN = Number.parseInt(id, 10);
          return this.surveyService.getSurveyFromCampaign(idN);
        }),
        takeUntil(this.destroy$)
      );
    this.data$.subscribe(
      (survey: ISurvey) => {
        if (survey) {
          this.survey = survey;
          const { displayProperties } = this.survey;
          if (displayProperties && displayProperties.informationCollectionSetting) {
            this.informationCollectionSetting = displayProperties.informationCollectionSetting;
          }
          const successOutcome = survey.results.outcome;
          const noOutcome = survey.results.noOutcome;
          if (noOutcome) {
            this.noRewardsPopUp.title = noOutcome.title;
            this.noRewardsPopUp.text = noOutcome.subTitle;
            this.noRewardsPopUp.imageUrl = noOutcome.image || this.noRewardsPopUp.imageUrl;
            this.noRewardsPopUp.buttonTxt = noOutcome.button || this.noRewardsPopUp.buttonTxt;
          }
          if (successOutcome) {
            this.successPopUp.title = successOutcome.title;
            this.successPopUp.text = successOutcome.subTitle;
            this.successPopUp.imageUrl = successOutcome.image || this.successPopUp.imageUrl;
            this.successPopUp.buttonTxt = successOutcome.button || this.successPopUp.buttonTxt;
          }
        }
      },
      () => {
        this.router.navigate(['/wallet']);
      }
    );
    this.ngZone.runOutsideAngular(() => {
      // https://medium.com/@krzysztof.grzybek89/how-runoutsideangular-might-reduce-change-detection-calls-in-your-app-6b4dab6e374d
      // Zone.js is an execution context for tracking and intercepting async operations like: DOM events, XMLHttpRequests
      // https://stackoverflow.com/questions/51455545/when-to-use-ngzone-run

      this.intervalId = window.setInterval(() => {
        // handle scroll event on angular https://stackoverflow.com/questions/44516017/how-to-handle-window-scroll-event-in-angular-4/44516191
        // click doesnt handle scroll
        this.overflowContainer.nativeElement.addEventListener('scroll', () => {
          // if the visibility of overflow is there, change it to hidden on scroll
          console.log('first check that this is working');
          this.overFarrow.nativeElement.classList.add('hidden');
          console.log(this.overFarrow.nativeElement, 'arrows classlist');
        }, { once: true }); // once: true so i dont need to remove the event listener, only needs to be ran once
        // remember to removeEventListener after
        this.overflowContainer.nativeElement.addEventListener('click', () => {
          this.overFarrow.nativeElement.classList.add('hidden');
          console.log('when click on this box want to disbale tha arrow');
        }, { once: true });
      }, 500);
      // setinterval allows me delay so that i access the nativeElement is not undefined ala afterviewChecked
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  public get progressBarValue(): number {
    // maybe pipe it instead
    return Math.round(this.answers.filter((answer) => !!answer.content).length / this.totalLength * 100) || 0;
    this.cd.detectChanges(); // idk why this needs to be here
  }

  public get surveyComplete(): boolean {
    return this.questionPointer === this.totalLength - 1 && this.answers[this.questionPointer] && this.answers[this.questionPointer].content;
  }

  public onSubmit(): void {
    const surveyId = this.survey && this.survey.id ? Number.parseInt(this.survey.id, 10) : null;
    const isCollectDataRequired = !!(this.informationCollectionSetting === 'pi_required' || this.informationCollectionSetting === 'signup_required');
    const userAction$: Observable<{ hasOutcomes: boolean; }> = !surveyId || (this.isAnonymousUser && isCollectDataRequired) ?
      of({ hasOutcomes: true }) :
      this.surveyService.postSurveyAnswer(this.answers, this.route.snapshot.params.id, surveyId).pipe(
        catchError((err: HttpErrorResponse) => {
          this.popupData = this.noRewardsPopUp;
          throw err;
        })
      );

    userAction$.subscribe(
      (res) => {
        this.popupData = res.hasOutcomes ? this.successPopUp : this.noRewardsPopUp;
        this.redirectUrlAndPopUp();
      },
      () => {
        this.popupData = this.noRewardsPopUp;
        this.redirectUrlAndPopUp();
      }
    );
  }

  private redirectUrlAndPopUp(): void {
    const surveyId = this.survey && this.survey.id ? Number.parseInt(this.survey.id, 10) : null;
    const campaignId = this.route.snapshot.params.id ? Number.parseInt(this.route.snapshot.params.id, 10) : null;
    const state: IPrePlayStateData = {
      popupData: this.popupData,
      engagementType: 'survey',
      surveyId,
      collectInfo: true,
      campaignId,
      answers: this.answers
    };

    if (this.isAnonymousUser && this.informationCollectionSetting === 'pi_required') {
      this.router.navigate(['/pi'], { state });
    } else if (this.isAnonymousUser && this.informationCollectionSetting === 'signup_required') {
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
    console.log('set current pointer function is being called');
    this.currentPointer = currentPointer;
    this.ngZone.run(
      () => {
        // two cd refs have to be here to work
        this.cd.detectChanges();
        console.log('useless stufgf HELLOP');
        this.checkShowOverArrow();
        this.cd.detectChanges();
      }
    );
  }

  public updateSurveyStatus(answers: IAnswer[]): void {
    this.answers = answers;
  }

  public checkShowOverArrow() {
    const card = this.overflowContainer.nativeElement;
    const arrow = this.overFarrow.nativeElement;
    const isOverflowing = card.clientHeight < card.scrollHeight;
    console.log(card.clientHeight, card.scrollHeight, 'card client height and scroll height');
    if (isOverflowing) {
      console.log('it is overlfowing');
      arrow.classList.remove('hidden');
    } else {
      console.log('it is not overflowing');
      arrow.classList.add('hidden');
    }
  }

  public updateQuestionPointer(action: string): void {
    // updateQuestion will be called again because questionPointer cause child to emit currentPointer
    // produce change and rerender, so get new dimensions
    console.log(this.progressBarValue, 'prog value first');
    if (action === 'next') {
      console.log(this.currentPointer, 'current pointer');
      console.log(this.progressBarValue, 'prog value second');
      console.log(this.answers, ' what my current answer');
      // means completed before, allow to freely click next
      // change logic to if answers are present arldy, allow next
      if (this.answers[this.questionPointer] && !!this.answers[this.questionPointer].content) { // this.progressBarValue >= 100 <- no longer valid, progress bar is in line with current questions
        // can go next if currentpage points < progressBarvalue, else only when asnwer last qn then trigger functionality (DEFUNCT)
        // able to go next if answer has been answered, i.e. content is present, would an empty string be considered answered?
        this.questionPointer++;
      }
      console.log(this.currentPointer, 'what is my current pointer now?');
      // to acknowledge change page and call checkArrow
      // this.setCurrentPointer(this.currentPointer + 1);
      // console.log(this.questionPointer);
    } else {
      this.questionPointer--;
      console.log(this.questionPointer, 'minusing what am i');
      console.log(this.totalLength, 'total length');
    }
  }
}
