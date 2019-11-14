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

  public successPopUp: IPopupConfig = {
    title: 'SURVEY_SUCCESS_TITLE',
    text: 'SURVEY_SUCCESS_TEXT',
    imageUrl: 'assets/congrats_image.png',
    buttonTxt: 'VIEW_REWARD',
  };

  public noRewardsPopUp: IPopupConfig = {
    title: 'SURVEY_NO_REWARDS_TITLE',
    text: 'SURVEY_NO_REWARDS_TEXT',
    imageUrl: '',
    buttonTxt: 'BACK_TO_WALLET',
  };

  private initTranslate(): void {
    this.translate.get(this.successPopUp.title).subscribe((text) => this.successPopUp.title = text);
    this.translate.get(this.successPopUp.text).subscribe((text) => this.successPopUp.text = text);
    this.translate.get(this.successPopUp.buttonTxt).subscribe((text) => this.successPopUp.buttonTxt = text);
    this.translate.get(this.noRewardsPopUp.title).subscribe((text) => this.noRewardsPopUp.title = text);
    this.translate.get(this.noRewardsPopUp.text).subscribe((text) => this.noRewardsPopUp.text = text);
    this.translate.get(this.noRewardsPopUp.buttonTxt).subscribe((text) => this.noRewardsPopUp.buttonTxt = text);
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
        if (displayProperties && displayProperties.successPopUp) {
          this.successPopUp.title = displayProperties.successPopUp.headLine;
          this.successPopUp.text = displayProperties.successPopUp.subHeadLine;
          this.successPopUp.imageUrl = displayProperties.successPopUp.imageURL || this.successPopUp.imageUrl;
          this.successPopUp.buttonTxt = displayProperties.successPopUp.buttonTxt || this.successPopUp.buttonTxt;
        }
        if (displayProperties && displayProperties.noRewardsPopUp) {
          this.noRewardsPopUp.title = displayProperties.noRewardsPopUp.headLine;
          this.noRewardsPopUp.text = displayProperties.noRewardsPopUp.subHeadLine;
          this.noRewardsPopUp.imageUrl = displayProperties.noRewardsPopUp.imageURL || this.noRewardsPopUp.imageUrl;
          this.noRewardsPopUp.buttonTxt = displayProperties.noRewardsPopUp.buttonTxt || this.noRewardsPopUp.buttonTxt;
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
            popupConfig = this.successPopUp;
          } else {
            popupConfig = this.noRewardsPopUp;
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
