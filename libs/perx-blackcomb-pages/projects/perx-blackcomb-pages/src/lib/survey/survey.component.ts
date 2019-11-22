import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService, ISurvey, SurveyService, IPopupConfig, IPrePlayStateData } from '@perx/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';
import { filter, switchMap, takeUntil, map } from 'rxjs/operators';
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
  private isAnonymousUser: boolean;
  private informationCollectionSetting: string;
  private destroy$: Subject<any> = new Subject();
  private popupData: IPopupConfig;
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
  ) { }

  public ngOnInit(): void {
    this.initTranslate();
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
        this.survey = survey;
        const { displayProperties } = this.survey;
        if (displayProperties && displayProperties.informationCollectionSetting) {
          this.informationCollectionSetting = displayProperties.informationCollectionSetting;
        }
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
    const surveyId = this.survey && this.survey.id ? Number.parseInt(this.survey.id, 10) : null;
    const isCollectDataRequired = !!(this.informationCollectionSetting === 'pi_required' || this.informationCollectionSetting === 'signup_required');
    const userAction$: Observable<{ hasOutcomes: boolean; }> = !surveyId || (this.isAnonymousUser && isCollectDataRequired) ?
      of({ hasOutcomes: true }) :
      this.surveyService.postSurveyAnswer(this.answers, this.route.snapshot.params.id, surveyId);

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
    const state: IPrePlayStateData = {
      popupData: this.popupData,
      engagementType: 'survey',
      surveyId,
      collectInfo: true,
      campaignId: this.route.snapshot.params.id as number,
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
    this.currentPointer = currentPointer;
  }

  public updateSurveyStatus(answers: IAnswer[]): void {
    this.answers = answers;
  }
}
