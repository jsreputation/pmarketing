import {
  Component,
  OnInit,
  OnDestroy,
  Input
} from '@angular/core';
import {
  NotificationService,
  ISurvey,
  SurveyService,
  IPopupConfig,
  IPrePlayStateData,
  AuthenticationService
} from '@perxtech/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';

interface IAnswer {
  questionId: string;
  content: any;
}

@Component({
  selector: 'perx-blackcomb-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit, OnDestroy {
  @Input('data')
  public data$: Observable<ISurvey>;
  public moveId$: Observable<number>;
  private moveId: number;
  public intervalId: number;
  public survey: ISurvey;
  private isAnonymousUser: boolean;
  private informationCollectionSetting: string;
  private destroy$: Subject<void> = new Subject();
  private popupData: IPopupConfig;
  public answers: IAnswer[];

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

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private surveyService: SurveyService,
    private translate: TranslateService,
    private auth: AuthenticationService,
  ) { }

  public ngOnInit(): void {
    this.initTranslate();
    this.isAnonymousUser = this.auth.getAnonymous();
    this.data$ = this.route.paramMap.pipe(
      filter((params: ParamMap) => params.has('id')),
      map((params: ParamMap) => params.get('id')),
      switchMap((id: string) => {
        const idN = Number.parseInt(id, 10);
        return this.surveyService.getSurveyFromCampaign(idN);
      }),
      takeUntil(this.destroy$)
    );
    this.moveId$ = this.data$.pipe(
      switchMap((survey: ISurvey) => this.surveyService.getMoveId(survey.id)),
      tap((moveId: number) => this.moveId = moveId)
    );
    this.data$.subscribe(
      (survey: ISurvey) => {
        if (survey) {
          this.survey = survey;
          const { displayProperties } = this.survey;
          if (
            displayProperties &&
            displayProperties.informationCollectionSetting
          ) {
            this.informationCollectionSetting =
              displayProperties.informationCollectionSetting;
          }
          const successOutcome = survey.results.outcome;
          const noOutcome = survey.results.noOutcome;
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
        }
      }
    );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onSubmit(finalAnswer: IAnswer): void {
    const surveyId =
      (this.survey && this.survey.id) || null;
    const isCollectDataRequired = !!(
      this.informationCollectionSetting === 'pi_required' ||
      this.informationCollectionSetting === 'signup_required'
    );
    const userAction$: Observable<{ hasOutcomes: boolean }> =
      !surveyId || (this.isAnonymousUser && isCollectDataRequired)
        ? of({ hasOutcomes: true })
        : this.surveyService
          .postSurveyAnswer(
            finalAnswer,
            this.moveId
          )
          .pipe(
            tap((res: {
              hasOutcomes: boolean,
              answers: IAnswer[]
            }) => this.answers = res.answers),
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

  private redirectUrlAndPopUp(): void {
    const surveyId =
      (this.survey && this.survey.id) || null;
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
}
