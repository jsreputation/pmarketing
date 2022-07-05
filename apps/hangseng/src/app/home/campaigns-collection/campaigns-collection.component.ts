import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { BehaviorSubject, combineLatest, iif, Observable, of, zip, } from 'rxjs';
import {
  GameType,
  ICampaign,
  ICampaignCategory,
  ICampaignService,
  IFlags,
  IGame,
  IGameService,
  IOperatingHours,
  IQuiz,
  ITheme,
  QuizService,
  SettingsService,
  SurveyService,
  ThemesService,
} from '@perxtech/core';
import { TranslateService } from '@ngx-translate/core';
import { catchError, map, switchMap, tap, withLatestFrom, } from 'rxjs/operators';
import {
  listAnimation
} from 'libs/blackcomb-pages/projects/perx-blackcomb-pages/src/lib/home/games-collection/games-collection.animation';

@Component({
  selector: 'hangseng-campaigns-collection',
  templateUrl: './campaigns-collection.component.html',
  styleUrls: ['./campaigns-collection.component.scss'],
  animations: [listAnimation]
})
export class CampaignsCollectionComponent implements OnInit, OnChanges {
  @Input('campaigns')
  public campaigns$: Observable<ICampaign[]>;
  @Input()
  public defaultNbCampaigns: number = 2;
  @Input()
  public withRewardsCounter: boolean = false;
  @Input()
  public gameType: GameType;
  @Input()
  public campaignCategories: ICampaignCategory[] = [];

  @Output()
  public selected: EventEmitter<ICampaign> = new EventEmitter<ICampaign>();

  public showAllCampaigns: boolean = false;
  public rewardsLeft: string;
  public campaigns: ICampaign[];
  public campaignsWithRewards$: Observable<ICampaign[]>;
  // private games: IGame[];
  private quizzes: IQuiz[] = [];
  public gamesLoaded: boolean = false;
  public isCampaignDisabled: boolean[] = [];
  public rewardsCountBvrSubjects: { [campaignId: string]: BehaviorSubject<number> } = {};
  public showOperatingHours: boolean = false;
  public buttonStyle: { [key: string]: string } = {};
  public newCategoryText: string = 'new';

  constructor(
    private translate: TranslateService,
    private gamesService: IGameService,
    private campaignService: ICampaignService,
    private quizService: QuizService,
    private surveyService: SurveyService,
    private settingsService: SettingsService,
    private themesService: ThemesService,
  ) { }

  public ngOnChanges(): void {
    this.newCategoryText = this.campaignCategories?.length > 0 ? this.campaignCategories.find(category => category.title.toLowerCase() === 'new')?.title : 'New';
    if (this.campaigns$) {
      this.initCampaigns();
    }
  }

  public ngOnInit(): void {
    this.translate.get('HOME.REWARDS_LEFT').subscribe((text) => {
      this.rewardsLeft = text;
    });

    this.themesService.getThemeSetting().subscribe((theme: ITheme) => {
      this.buttonStyle['background-color'] = theme.properties['--button_background_color'] ? theme.properties['--button_background_color'] : '';
      this.buttonStyle.color = theme.properties['--button_text_color'] ? theme.properties['--button_text_color'] : '';
    });

    if (this.campaigns$) {
      this.initCampaigns();
    }
  }

  public selectCampaign(campaign: ICampaign): void {
    if (
      !this.isCampaignComplete(campaign.id) &&
      (this.isCampaignDisabled[campaign.id] === undefined ||
        !this.isCampaignDisabled[campaign.id])
    ) {
      this.selected.emit(campaign);
    }
  }

  public getCampaignImage(campaign: ICampaign): string {
    return campaign.thumbnailUrl ? campaign.thumbnailUrl : (campaign.campaignBannerUrl ||
      'https://cdn.perxtech.io/reward/item/images/35/580b585b2edbce24c47b2415-48075171-3595-4e55-b630-8a00b412dcc4.png');
  }

  public isCampaignComplete(campaignId: number): boolean {
    // we currently only intend for this to be triggered by quiz campaigns. Can be enhanced to support all types.
    if (this.quizzes && this.quizzes.length > 0 && this.gameType === GameType.quiz) {
      return this.quizzes.filter((quiz: IQuiz) =>
        (quiz.campaignId === campaignId) &&
        (quiz.remainingNumberOfTries != null && quiz.remainingNumberOfTries <= 0)
      ).length > 0;
    }
    return false;
  }

  public isQuizRewardsEmpty(campaignId: number): boolean {
    if (!this.withRewardsCounter) {
      return false;
    }

    if (this.quizzes && this.quizzes.length > 0 && this.gameType === GameType.quiz) {
      const matchingCampaign = this.campaigns.find((campaign: ICampaign) =>
        campaign.id === campaignId
      );
      return matchingCampaign && matchingCampaign.rewardsCount ? matchingCampaign.rewardsCount <= 0 : true;
    }
    return true;
  }

  public getOperatingHours(operatingHours: IOperatingHours): string {

    const daysMapArr = [false, false, false, false, false, false, false]; // index 0 is sunday

    for (const dayIndex in operatingHours.days) {
      if (dayIndex) { // guard-for-in
        daysMapArr[operatingHours.days[dayIndex]] = true;
      }
    }
    const days: string = this.dayArrToIntuitiveStringDayRange(daysMapArr);
    const hours: string = `${operatingHours.opensAt?.substr(0, 5)} - ${operatingHours.closesAt?.substr(0, 5)}`;
    return `Campaign available during: ${days}, ${hours} ${operatingHours.formattedOffset}`;
  }

  public getEndOrExpiresDate(campaign: ICampaign): string {
    return campaign.customFields['f/e_expiry_date'];
  }

  public isCampaignNew(campaign: ICampaign): boolean {
    return campaign.categoryTags.some(category => category.title.toLowerCase() === 'new');
  }

  private dayOfWeekAsString(dayIndex: number): string {
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayIndex];
  }

  // works but can't wrap sat and sun
  private dayArrToIntuitiveStringDayRange(daysMapArr: boolean[]): string {
    let dayRange = '', multiDayRange = '';
    let findingRange = false;

    for (let i = 0; i <= daysMapArr.length; i++) {
      if (daysMapArr[i]) {
        if (dayRange.length > 0 && !findingRange) {
          findingRange = true;
        } else if (dayRange.length === 0) { // first item in current range.
          dayRange = `${this.dayOfWeekAsString(i)}`;
        }
      } else if (dayRange.length > 0 && !daysMapArr[i]) { // first part of range already identified
        if (this.dayOfWeekAsString(i - 1) !== dayRange) {
          dayRange = `${dayRange} - ${this.dayOfWeekAsString(i - 1)}`;
        }
        if (multiDayRange.length === 0) {
          multiDayRange = dayRange;
        } else {
          multiDayRange = `${multiDayRange}, ${dayRange}`;
        }
        dayRange = ''; // reset for more ranges;
        findingRange = false;
      }
    }
    return multiDayRange;
  }

  private initCampaigns(): void {
    this.campaignsWithRewards$ = this.campaigns$.pipe(
      switchMap(
        (campaigns: ICampaign[]) => zip(...campaigns.map(campaign => this.campaignService.getVoucherLeftCount(campaign.id))
        )),
      tap(rewardsArr => {
        rewardsArr.forEach((reward) => {
          this.rewardsCountBvrSubjects[reward.campaignId] = new BehaviorSubject(0);
          this.rewardsCountBvrSubjects[reward.campaignId].next(reward.count);
        });
      }),
      withLatestFrom(this.campaigns$),
      map(
        ([rewardsArr, campaigns]) => {
          const rewardsCampaignIndexedObj = rewardsArr.reduce((acc, curr) => ({
            ...acc, [curr.campaignId]: curr.count
          }), {});
          return campaigns.map(campaign => ({ ...campaign, rewardsCount: rewardsCampaignIndexedObj[campaign.id] }));
        }
      ));


    this.settingsService.getRemoteFlagsSettings()
      .pipe(
        tap((flags: IFlags) => {
          this.showOperatingHours = flags.showHappyHourOperatingHours ? flags.showHappyHourOperatingHours : false;
        }),
        switchMap(() => iif(
          () => this.withRewardsCounter,
          this.campaignsWithRewards$,
          this.campaigns$
        )),
        tap((campaigns) => {
          this.campaigns = campaigns;
        }),
        // for each campaign, fetch associated games to figure out completion
        switchMap((campaigns) => combineLatest([
          ...campaigns.map((campaign: ICampaign) => {
            if (this.gameType === GameType.quiz) {
              return this.quizService.getQuizFromCampaign(campaign.id).pipe(
                catchError((() => of([])))
              );
            }
            if (this.gameType === GameType.survey) {
              return this.surveyService.getSurveyFromCampaign(campaign.id).pipe(
                catchError((() => of([])))
              );
            }
            return this.gamesService.getGamesFromCampaign(campaign);
          })
        ]))
      ).subscribe(
        (res: (IQuiz | IGame[])[]) => {
          if (this.gameType === GameType.quiz) {
            this.quizzes = res as IQuiz[];
            this.quizzes.forEach((quiz: IQuiz) => {
              if (quiz.campaignId && !this.isCampaignDisabled[quiz.campaignId]) {
                this.isCampaignDisabled[quiz.campaignId] =
                  this.isCampaignComplete(quiz.campaignId) ||
                  this.isQuizRewardsEmpty(quiz.campaignId);
              }
            });
          }
          this.gamesLoaded = true;
        },
        () => {
          this.gamesLoaded = true;
        }
      );
  }
}
