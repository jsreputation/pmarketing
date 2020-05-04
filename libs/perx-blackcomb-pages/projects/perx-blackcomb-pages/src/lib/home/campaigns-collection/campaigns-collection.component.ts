import { listAnimation } from '../games-collection/games-collection.animation';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  iif,
  Observable,
  of,
  zip,
} from 'rxjs';
import {
  GameType,
  ICampaign, ICampaignService,
  IGame,
  IGameService,
  IQuiz,
  QuizService
} from '@perxtech/core';
import { TranslateService } from '@ngx-translate/core';
import {
  catchError,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

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
  public gameType: string;

  @Output()
  public selected: EventEmitter<ICampaign> = new EventEmitter<ICampaign>();

  public showAllCampaigns: boolean = false;
  public rewardsLeft: string;
  public campaigns: ICampaign[];
  public campaignsWithRewards$: Observable<ICampaign[]>;
  // private games: IGame[];
  private quizzes: IQuiz[] = [];
  public gamesLoaded: boolean = false;
  public rewardsCountBvrSubjects: { [campaignId: string]: BehaviorSubject<number> } = {};

  constructor(
    private translate: TranslateService,
    private gamesService: IGameService,
    private campaignService: ICampaignService,
    private quizService: QuizService,
  ) { }


  public ngOnInit(): void {
    this.translate.get('HOME.REWARDS_LEFT').subscribe((text) => {
      this.rewardsLeft = text;
    });

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
          return campaigns.map(campaign => ({...campaign, rewardsCount: rewardsCampaignIndexedObj[campaign.id]}));
        }
      ));

    iif(
      () => this.withRewardsCounter,
      this.campaignsWithRewards$,
      this.campaigns$
    ).pipe(
      tap((campaigns) => this.campaigns = campaigns),
      // for each campaign, fetch associated games to figure out completion
      switchMap((campaigns) => combineLatest([
        ...campaigns.map((campaign: ICampaign) => {
          if (this.gameType === GameType.quiz) {
            return this.quizService.getQuizFromCampaign(campaign.id).pipe(
              catchError(( () => of([])))
            );
          }
          return this.gamesService.getGamesFromCampaign(campaign.id);
        })
      ]))
    ).subscribe(
      (res: (IQuiz | IGame[])[]) => {
        if (this.gameType === GameType.quiz) {
          this.quizzes = res as IQuiz[];
          // } else {
          // todo: test games input when games get refactored in.
          // expected stamp cards to hit this but since we don't actually have games in stamp campaigns it will be empty array
          // this.games = (res as IGame[][])[0];
        }
        this.gamesLoaded = true;
      },
      () => {
        this.gamesLoaded = true;
      }
    );
  }

  public selectCampaign(campaign: ICampaign): void {
    if (!this.isCampaignComplete(campaign.id)) {
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
}
