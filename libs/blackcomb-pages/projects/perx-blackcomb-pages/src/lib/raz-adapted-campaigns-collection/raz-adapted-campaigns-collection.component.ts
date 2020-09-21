import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, iif, Observable, zip } from 'rxjs';
import { CampaignType, GameType, ICampaign, ICampaignService, IGame, IQuiz, StampService } from '@perxtech/core';
import { TranslateService } from '@ngx-translate/core';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'perx-blackcomb-pages-raz-adapted-campaigns-collection',
  templateUrl: './raz-adapted-campaigns-collection.component.html',
  styleUrls: ['./raz-adapted-campaigns-collection.component.scss']
})
export class RazAdaptedCampaignsCollectionComponent implements OnInit {
  @Input('campaigns')
  public campaigns$: Observable<ICampaign[]>;
  @Input()
  public defaultNbCampaigns: number = 2;
  @Input()
  public withRewardsCounter: boolean = false;
  @Input()
  public withProgressBar: boolean;
  @Input()
  public gameType: string;

  @Output()
  public selected: EventEmitter<ICampaign> = new EventEmitter<ICampaign>();

  public showAllCampaigns: boolean = false;
  public rewardsLeft: string;
  public campaigns: ICampaign[];
  public campaignsWithRewards$: Observable<ICampaign[]>;
  public campaignsWithProgress$: Observable<any[]>;
  // private games: IGame[];
  private quizzes: IQuiz[] = [];
  public gamesLoaded: boolean = false;
  public isCampaignDisabled: boolean[] = [];
  public rewardsCountBvrSubjects: { [campaignId: string]: BehaviorSubject<number> } = {};

  constructor(
    private translate: TranslateService,
    // private gamesService: IGameService,
    private campaignService: ICampaignService,
    private stampService: StampService,
    // private quizService: QuizService,
    // private surveyService: SurveyService
  ) { }

  public razerMapperService(): any {
    // differentiate by the campaign_type
    // if stamps call the /stamp_cards api
    // if loyalty call /loyalty
    // if referral call as is but map the referral fields
  }

  public ngOnInit(): void {
    this.translate.get('HOME.REWARDS_LEFT').subscribe((text) => {
      this.rewardsLeft = text;
    });

    if (this.campaigns$) {
      this.campaignsWithProgress$ = this.campaigns$.pipe(
        // call the mapperService here, have it as a method here first, priority: do stamps first
        switchMap(
          (campaigns: ICampaign[]) => zip(...campaigns.map(campaign => {
              if (campaign.type === CampaignType.stamp) {
                return this.stampService.getCards(campaign.id).pipe(
                  map((stampCards) => ({
                      stages: stampCards[0].displayProperties.rewardPositions.length || 2,
                      current: stampCards[0].stamps && stampCards[0].stamps.length,
                      stageLabels: stampCards[0].displayProperties.rewardPositions
                    }
                  ))
                ) as any
              }
            })
          )),
        withLatestFrom(this.campaigns$),
        map(
          ([ stampCardProgress, campaigns ]) => {
            return campaigns.map(campaign => ({ ...campaign, progress: stampCardProgress }));
          }
        )
      );
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
          ([ rewardsArr, campaigns ]) => {
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
      iif(
        () => this.withProgressBar,
        this.campaignsWithProgress$,
        this.campaigns$
      )
    ).pipe(
      tap((campaigns) => this.campaigns = campaigns),
      // for each campaign, fetch associated games to figure out completion
      // switchMap((campaigns) => combineLatest([
      //   ...campaigns.map((campaign: ICampaign) => {
      //     if (this.gameType === GameType.quiz) {
      //       return this.quizService.getQuizFromCampaign(campaign.id).pipe(
      //         catchError(( () => of([])))
      //       );
      //     }
      //     if (this.gameType === GameType.survey) {
      //       return this.surveyService.getSurveyFromCampaign(campaign.id).pipe(
      //         catchError(( () => of([])))
      //       );
      //     }
      //     return this.gamesService.getGamesFromCampaign(campaign);
      //   })
      // ]))
    ).subscribe(
      (res: (IQuiz | IGame[])[]) => {
        if (this.gameType === GameType.quiz) {
          this.quizzes = res as IQuiz[];
          this.quizzes.forEach((quiz: IQuiz) => {
            if (quiz.campaignId && ! this.isCampaignDisabled[quiz.campaignId]) {
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
    return campaign.campaignBannerUrl ? campaign.campaignBannerUrl : 'https://perx-cdn-staging.s3.amazonaws.com/reward/item/images/35/580b585b2edbce24c47b2415-48075171-3595-4e55-b630-8a00b412dcc4.png';
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
      return matchingCampaign && matchingCampaign.rewardsCount ?  matchingCampaign.rewardsCount <= 0 : true;
    }
    return true;
  }
}
