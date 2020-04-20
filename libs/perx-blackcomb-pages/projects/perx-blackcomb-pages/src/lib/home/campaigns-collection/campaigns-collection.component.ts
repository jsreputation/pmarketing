import { listAnimation } from '../games-collection/games-collection.animation';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  combineLatest,
  Observable,
} from 'rxjs';
import {
  GameType,
  ICampaign,
  IGame,
  IGameService,
  IQuiz,
  QuizService
} from '@perxtech/core';
import { oc } from 'ts-optchain';
import { TranslateService } from '@ngx-translate/core';
import {
  switchMap,
  tap,
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
  private games: IGame[];
  private quizzes: IQuiz[] = [];
  public gamesLoaded: boolean = false;

  constructor(
    private translate: TranslateService,
    private gamesService: IGameService,
    private quizService: QuizService
  ) { }


  public ngOnInit(): void {
    this.translate.get('HOME.REWARDS_LEFT').subscribe((text) => {
      this.rewardsLeft = text;
    });

    this.campaigns$.pipe(
      tap((campaigns: ICampaign[]) => this.campaigns = campaigns),
      // for each campaign, fetch associated games
      switchMap((campaigns: ICampaign[]) => combineLatest([
        ...campaigns.map((campaign: ICampaign) =>{
          if (this.gameType === GameType.quiz) {
            return this.quizService.getQuizFromCampaign(campaign.id);
          }
          return this.gamesService.getGamesFromCampaign(campaign.id);
        })
      ]))
    ).subscribe(
      (res: (IQuiz | IGame[])[]) => {
        if (this.gameType === GameType.quiz) {
          this.quizzes = res as IQuiz[];
        } else {
          // UNTESTED
          // todo: test games input.
          this.games = (res as IGame[][])[0];
          console.log(this.games);
        }
        this.gamesLoaded = true;
      },
      () => {
        // at this point this should be a stamp campaign
        console.log('no game, is a stamp campaign');
        this.gamesLoaded = true;

      }
    );
  }

  public selectCampaign(campaign: ICampaign): void {
    this.selected.emit(campaign);
  }

  public getCampaignImage(campaign: ICampaign): string {
    return campaign.campaignBannerUrl ? campaign.campaignBannerUrl : 'https://perx-cdn-staging.s3.amazonaws.com/reward/item/images/35/580b585b2edbce24c47b2415-48075171-3595-4e55-b630-8a00b412dcc4.png';
  }

  public getRewardsCount(campaign: ICampaign): string | undefined {
    if (!campaign.rewards) {
      return;
    }
    const sumRewards = campaign.rewards.reduce((sum, reward) => {
      const balance = oc(reward).inventory.rewardTotalBalance();
      if (balance !== undefined && balance !== null) {
        if (sum !== undefined) {
          // @ts-ignore
          return sum + balance;
        }
        return balance;
      }
      return sum;
    }, undefined);

    return this.rewardsLeft.replace('{{rewardsCount', sumRewards);
  }
}
