import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService, ISurvey, SurveyService, IPopupConfig } from '@perx/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

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
  public data$: Observable<ISurvey>;
  public survey: ISurvey;
  public answers: IAnswer[];
  public totalLength: number;
  public currentPointer: number;
  private destroy$: Subject<any> = new Subject();

  public rewardSuccessPopUp: IPopupConfig = {
    title: 'Your RSVP is successful!',
    text: 'See you at our event!',
    imageUrl: 'assets/congrats_image.png',
    buttonTxt: 'View Reward',
  };

  public errorPopUp: IPopupConfig = {
    title: 'Thank you for your interest. We’re sorry, all places have been taken.',
    text: 'Nonetheless, we’ve added you to our waiting list for the event and will call you when places are available by 07 October 2019',
    imageUrl: '',
    buttonTxt: 'Back to Wallet',
  };

  private initTranslate(): void {
    this.translate.get('VIEW_REWARD').subscribe((text) => this.rewardSuccessPopUp.buttonTxt = text);
    this.translate.get('BACK_TO_WALLET').subscribe((text) => this.rewardSuccessPopUp.buttonTxt = text);
  }

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private surveyService: SurveyService,
    private translate: TranslateService,
  ) { }

  public ngOnInit(): void {
    this.initTranslate();
    this.data$ = this.route.paramMap
      .pipe(
        filter((params: ParamMap) => params.has('id')),
        switchMap((params: ParamMap) => {
          const id: string = params.get('id');
          const idN = Number.parseInt(id, 10);
          return this.surveyService.getSurveyFromCampaign(idN);
        }),
        takeUntil(this.destroy$)
      );
    this.data$.subscribe(
      (survey: ISurvey) => {
        this.survey = survey;
        const { displayProperties } = this.survey;
        if (displayProperties && displayProperties.rewardSuccessPopUp) {
          this.rewardSuccessPopUp.title = displayProperties.rewardSuccessPopUp.headLine || this.rewardSuccessPopUp.title;
          this.rewardSuccessPopUp.text = displayProperties.rewardSuccessPopUp.subHeadLine || this.rewardSuccessPopUp.text;
          this.rewardSuccessPopUp.imageUrl = displayProperties.rewardSuccessPopUp.imageURL || this.rewardSuccessPopUp.imageUrl;
          this.rewardSuccessPopUp.buttonTxt = displayProperties.rewardSuccessPopUp.buttonTxt || this.rewardSuccessPopUp.buttonTxt;
        }
        if (displayProperties && displayProperties.errorPopUp) {
          this.errorPopUp.title = displayProperties.errorPopUp.headLine || this.errorPopUp.title;
          this.errorPopUp.text = displayProperties.errorPopUp.subHeadLine || this.errorPopUp.text;
          this.errorPopUp.imageUrl = displayProperties.errorPopUp.imageURL || this.errorPopUp.imageUrl;
          this.errorPopUp.buttonTxt = displayProperties.errorPopUp.buttonTxt || this.errorPopUp.buttonTxt;
        }
      },
      () => {
        this.router.navigate(['/wallet']);
      }
    );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public get progressBarValue(): number {
    return Math.round(this.currentPointer / this.totalLength * 100) || 0;
  }

  public get surveyComplete(): boolean {
    return this.currentPointer === this.totalLength;
  }
  public onSubmit(): void {
    this.surveyService.postSurveyAnswer(this.answers, this.survey, this.route.snapshot.params.id)
      .subscribe(
        (res) => {
          let popupConfig: IPopupConfig = null;
          if (res.hasOutcomes) {
            popupConfig = this.rewardSuccessPopUp;
          } else {
            popupConfig = this.errorPopUp;
          }
          this.router.navigate(['/wallet']);
          this.notificationService.addPopup(popupConfig);
        }
      );
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
}
