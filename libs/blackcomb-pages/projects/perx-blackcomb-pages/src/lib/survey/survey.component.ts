import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AuthenticationService,
  IPopupConfig,
  IPrePlayStateData,
  IPrizeSetOutcome,
  IRewardPopupConfig,
  ISurvey,
  ISurveyResultOutcome,
  NotificationService,
  RewardPopupComponent,
  SurveyService,
  IFlags,
  SettingsService,
} from '@perxtech/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EMPTY, Observable, Subject } from 'rxjs';
import {
  catchError,
  filter,
  map,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

interface IAnswer {
  questionId: string;
  content: any;
}

@Component({
  selector: 'perx-blackcomb-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],
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
  private prizeSetOutcome: IPrizeSetOutcome;
  public showPrizeSetOutcome: boolean = false;
  private prizeSetBtnTxt: string;
  private isBadgeOucome: boolean;
  private isLPointsOutcome: boolean;
  public remoteFlags: IFlags;

  public successPopUp: IPopupConfig = {
    title: 'SURVEY.SUCCESS_TITLE',
    text: 'SURVEY.SUCCESS_TEXT',
    imageUrl: 'assets/congrats_image.png',
    buttonTxt: 'CLOSE',
  };

  public noRewardsPopUp: IPopupConfig = {
    title: 'SURVEY.NO_REWARDS_TITLE',
    text: 'SURVEY.NO_REWARDS_TEXT',
    imageUrl: '',
    buttonTxt: 'BACK_TO_WALLET',
  };

  private notAvailablePopUp: IPopupConfig = {
    title: 'SURVEY.NOT_AVAILABLE_TITLE',
    text: 'SURVEY.NOT_AVAILABLE_TXT',
    buttonTxt: 'SURVEY.NOT_AVAILABLE_CTA',
  };

  private initTranslate(): void {
    if (this.successPopUp.title) {
      this.translate
        .get(this.successPopUp.title)
        .subscribe((text) => (this.successPopUp.title = text));
    }
    if (this.successPopUp.text) {
      this.translate
        .get(this.successPopUp.text)
        .subscribe((text) => (this.successPopUp.text = text));
    }
    if (this.successPopUp.buttonTxt) {
      this.translate
        .get(this.successPopUp.buttonTxt)
        .subscribe((text) => (this.successPopUp.buttonTxt = text));
    }
    if (this.noRewardsPopUp.title) {
      this.translate
        .get(this.noRewardsPopUp.title)
        .subscribe((text) => (this.noRewardsPopUp.title = text));
    }
    if (this.noRewardsPopUp.text) {
      this.translate
        .get(this.noRewardsPopUp.text)
        .subscribe((text) => (this.noRewardsPopUp.text = text));
    }
    if (this.noRewardsPopUp.buttonTxt) {
      this.translate
        .get(this.noRewardsPopUp.buttonTxt)
        .subscribe((text) => (this.noRewardsPopUp.buttonTxt = text));
    }
    if (this.notAvailablePopUp.title) {
      this.translate
        .get(this.notAvailablePopUp.title)
        .subscribe((text) => (this.notAvailablePopUp.title = text));
    }
    if (this.notAvailablePopUp.text) {
      this.translate
        .get(this.notAvailablePopUp.text)
        .subscribe((text) => (this.notAvailablePopUp.text = text));
    }
    if (this.notAvailablePopUp.buttonTxt) {
      this.translate
        .get(this.notAvailablePopUp.buttonTxt)
        .subscribe((text) => (this.notAvailablePopUp.buttonTxt = text));
    }
    this.translate
      .get('PRIZE_SET.OUTCOME_SUCCESS_TITLE')
      .subscribe((text) => (this.prizeSetBtnTxt = text));
  }

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private surveyService: SurveyService,
    private translate: TranslateService,
    private auth: AuthenticationService,
    private dialog: MatDialog,
    private settingsService: SettingsService
  ) {}

  public ngOnInit(): void {
    this.initTranslate();

    this.settingsService.getRemoteFlagsSettings().subscribe((flags: IFlags) => {
      this.showPrizeSetOutcome = flags.showPrizeSetOutcome
        ? flags.showPrizeSetOutcome
        : false;
    });

    this.isAnonymousUser = this.auth.getAnonymous();
    this.data$ = this.route.paramMap.pipe(
      filter((params: ParamMap) => params.has('id')),
      map((params: ParamMap) => params.get('id')),
      switchMap((id: string) => {
        const idN = Number.parseInt(id, 10);
        return this.surveyService.getSurveyFromCampaign(idN);
      }),
      catchError((err: Error) => {
        console.error(err.name, err.message);
        this.notificationService.addPopup(this.notAvailablePopUp);
        this.router.navigate(['/home']);
        return EMPTY;
      }),
      takeUntil(this.destroy$)
    );
    this.moveId$ = this.data$.pipe(
      switchMap((survey: ISurvey) => this.surveyService.getMoveId(survey.id)),
      tap((moveId: number) => (this.moveId = moveId))
    );
    this.data$.subscribe((survey: ISurvey) => {
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
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onSubmit(finalAnswer: IAnswer): void {
    const surveyId = (this.survey && this.survey.id) || null;
    const isCollectDataRequired = !!(
      this.informationCollectionSetting === 'pi_required' ||
      this.informationCollectionSetting === 'signup_required'
    );

    if (!surveyId || (this.isAnonymousUser && isCollectDataRequired)) {
      this.popupData = this.successPopUp;
      this.redirectUrlAndPopUp();
    } else {
      // post final answer
      this.surveyService
        .postSurveyAnswer(finalAnswer, this.moveId)
        .pipe(
          tap((res: { hasOutcomes: boolean; answers: IAnswer[] }) => {
            this.answers = res.answers;
          }),
          catchError((err: HttpErrorResponse) => {
            this.popupData = this.noRewardsPopUp;
            throw err;
          })
        )
        .subscribe(() => {
          // MEG-12: check API if reward acquired
          this.surveyService.postFinalSurveyAnswer(this.moveId).subscribe(
            (res: ISurveyResultOutcome) => {
              this.popupData = res.rewardAcquired
                ? this.successPopUp
                : this.noRewardsPopUp;
              if (res && res.prizeSets && res.prizeSets.length > 0) {
                this.prizeSetOutcome = res.prizeSets[0];
              }
              if (res?.badges && res.badges.length > 0) {
                this.isBadgeOucome = true;
              }
              if (res?.points && res.points.length > 0) {
                this.isLPointsOutcome = true;
              }
              this.redirectUrlAndPopUp();
            },
            () => {
              this.popupData = this.noRewardsPopUp;
              this.redirectUrlAndPopUp();
            }
          );
        });
    }
  }

  private redirectUrlAndPopUp(): void {
    const surveyId = (this.survey && this.survey.id) || null;
    const campaignId = this.route.snapshot.params.id
      ? Number.parseInt(this.route.snapshot.params.id, 10)
      : null;
    const state: IPrePlayStateData = {
      popupData: this.popupData,
      engagementType: 'survey',
      surveyId,
      collectInfo: true,
      campaignId,
      answers: this.answers,
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
    } else if (this.showPrizeSetOutcome && this.prizeSetOutcome) {
      const data: IRewardPopupConfig = this.popupData;
      data.url = `/prize-set-outcomes/${this.prizeSetOutcome.prizeSetId}?transactionId=${this.prizeSetOutcome.transactionId}`;
      data.afterClosedCallBackRedirect = this;
      data.disableOverlayClose = true;
      data.showCloseBtn = false;
      data.buttonTxt = this.prizeSetBtnTxt;
      this.dialog.open(RewardPopupComponent, { data });
    } else {
      if (this.isBadgeOucome) {
        this.router.navigate(['/badges'], {
          queryParams: { filter: 'earned' },
        });
      } else if (this.isLPointsOutcome) {
        this.router.navigate(['/transaction-history']);
      } else {
        this.router.navigate(['/wallet']);
      }
      this.notificationService.addPopup(this.popupData);
    }
  }

  public closeAndRedirect(url: string): void {
    this.router.navigateByUrl(url);
  }
}
