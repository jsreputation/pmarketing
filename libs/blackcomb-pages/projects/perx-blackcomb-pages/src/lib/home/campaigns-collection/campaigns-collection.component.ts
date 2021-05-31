import { listAnimation } from '../games-collection/games-collection.animation';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, combineLatest, iif, Observable, of, zip, } from 'rxjs';
import {
  GameType,
  ICampaign,
  ICampaignService,
  IGame,
  IGameService,
  IOperatingHours,
  IQuiz,
  QuizService,
  SurveyService
} from '@perxtech/core';
import { TranslateService } from '@ngx-translate/core';
import { catchError, map, switchMap, tap, withLatestFrom, } from 'rxjs/operators';

@Component({
  selector: 'perx-blackcomb-pages-campaigns-collection',
  templateUrl: './campaigns-collection.component.html',
  styleUrls: ['./campaigns-collection.component.scss'],
  animations: [listAnimation]
})
export class CampaignsCollectionComponent implements OnInit {
  @Input('campaigns')
  public campaigns$: Observable<ICampaign[]>;
  @Input()
  public defaultNbCampaigns: number = 2;
  @Input()
  public withRewardsCounter: boolean = false;
  @Input()
  public gameType: GameType;

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

  constructor(
    private translate: TranslateService,
    private gamesService: IGameService,
    private campaignService: ICampaignService,
    private quizService: QuizService,
    private surveyService: SurveyService
  ) { }


  public ngOnInit(): void {
    this.translate.get('HOME.REWARDS_LEFT').subscribe((text) => {
      this.rewardsLeft = text;
    });

    if (this.campaigns$) {
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
    }
    iif(
      () => this.withRewardsCounter,
      this.campaignsWithRewards$,
      this.campaigns$
    ).pipe(
      tap((campaigns) => {
        this.campaigns = campaigns;
        campaigns.forEach(campaign => {
          // check if campaign is operating
          this.isCampaignDisabled[campaign.id] = ! this.isCampaignOperating(campaign.id);
        });
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
          // } else {
          // todo: test games input when games get refactored in.
          // expected stamp cards to hit this but since we don't actually have games in stamp campaigns it will be empty array
          // this.games = (res as IGame[][])[0];
          // this.games.forEach((game: IGame) => {
          //   if (game.campaignId && !this.isCampaignDisabled[game.campaignId]) {
          //     this.isCampaignDisabled[game.campaignId] = this.isCampaignComplete(game.campaignId);
          //   }
          // });
          // }
        }
        this.gamesLoaded = true;
      },
      () => {
        this.gamesLoaded = true;
      }
    );
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
      'https://perx-cdn-staging.s3.amazonaws.com/reward/item/images/35/580b585b2edbce24c47b2415-48075171-3595-4e55-b630-8a00b412dcc4.png');
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

  public isCampaignOperating(campaignId: number): boolean {
    const matchingCampaign = this.campaigns.find((campaign: ICampaign) =>
      campaign.id === campaignId
    );
    return matchingCampaign?.isOperating || false;
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
    // Date obj that we only need the time from

    const openTime: Date = new Date(operatingHours.opensAt);
    const closeTime: Date = new Date(operatingHours.closesAt);

    const daysMapArr = [ false, false, false, false, false, false, false ]; // index 0 is sunday

    for (const dayIndex in operatingHours.days) {
      if (dayIndex) { // guard-for-in
        daysMapArr[operatingHours.days[dayIndex]] = true;
      }
    }
    const days: string = this.dayArrToIntuitiveStringDayRange(daysMapArr);
    const hours: string =
      `${openTime.getHours()}:${openTime.getMinutes()} - ${closeTime.getHours()}:${closeTime.getMinutes()}`;
    return `Campaign available during: ${days}, ${hours}`;
  }

  private dayOfWeekAsString(dayIndex: number): string {
    return [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ][dayIndex];
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
      } else if (dayRange.length > 0 && ! daysMapArr[i]) { // first part of range already identified
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
}
