import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';

import {
  Observable,
  BehaviorSubject,
  forkJoin,
  of,
  Subject,
  combineLatest,
  Subscriber,
} from 'rxjs';
import {
  tap,
  takeUntil,
  map,
  retry,
  switchMap,
  mergeMap,
} from 'rxjs/operators';

import {
  ICampaignService,
  ICampaign,
  RewardsService,
  IReward,
  ITabConfigExtended,
  IGameService,
  IGame,
  CampaignType,
  IProfile,
} from '@perx/core';
import { TranslateService } from '@ngx-translate/core';

const stubTabs: ITabConfigExtended[] = [
  {
    filterKey: null,
    filterValue: null,
    tabName: 'ALL',
    rewardsList: null,
    rewardsType: null
  }
  , {
    filterKey: null,
    filterValue: null,
    tabName: 'FOOD_BEVERAGE',
    rewardsList: null,
    rewardsType: 'Food & Beverage'
  }, {
    filterKey: null,
    filterValue: null,
    tabName: 'TRAVEL',
    rewardsList: null,
    rewardsType: 'Travel'
  },
  {
    filterKey: null,
    filterValue: null,
    tabName: 'ELECTRONICS',
    rewardsList: null,
    rewardsType: 'Electronics'
  },
  {
    filterKey: null,
    filterValue: null,
    tabName: 'WELLNESS',
    rewardsList: null,
    rewardsType: 'Wellness'
  },
  {
    filterKey: null,
    filterValue: null,
    tabName: 'ENTERTAINMENT',
    rewardsList: null,
    rewardsType: 'Entertainment'
  },
  {
    filterKey: null,
    filterValue: null,
    tabName: 'SHOPPING',
    rewardsList: null,
    rewardsType: 'Shopping'
  },
  {
    filterKey: null,
    filterValue: null,
    tabName: 'MERCHANT_SELF',
    rewardsList: null,
    rewardsType: 'Merchant Self'
  },
  {
    filterKey: null,
    filterValue: null,
    tabName: 'OTHERS',
    rewardsList: null,
    rewardsType: 'Others'
  },
];

@Component({
  selector: 'perx-blackcomb-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();

  public rewards$: Observable<IReward[]>;
  public games$: Observable<IGame[]>;
  public tabs$: BehaviorSubject<ITabConfigExtended[]> = new BehaviorSubject<ITabConfigExtended[]>([]);
  public staticTab: ITabConfigExtended[];
  public titleFn: (profile: IProfile) => string;
  public showGames: boolean = false;
  private initCampaign(): void {
    this.games$ = (new Observable((subject: Subscriber<IGame[]>) => {
      const gameByCid: { [cid: number]: IGame } = {};
      this.campaingService.getCampaigns()
        .pipe(
          map((cs: ICampaign[]) => cs.filter(c => c.type === CampaignType.game)),
          map((cs: ICampaign[]) => cs.filter(c => gameByCid[c.id] === undefined)),
          switchMap((arrOfCampaigns: ICampaign[]) => {
            let gameIds = arrOfCampaigns.map(c => c.engagementId);
            gameIds = gameIds.filter((item, index) => gameIds.indexOf(item) === index);
            return combineLatest(
              ...gameIds.map(id => this.gamesService.get(id)
                .pipe(
                  retry(1),
                  map((g: IGame) => {
                    const existingCampaign = arrOfCampaigns.find(c => c.engagementId === g.id);
                    const existingCampaignId = existingCampaign && existingCampaign.id;
                    return { ...g, campaignId: existingCampaignId };
                  }),
                  tap((g: IGame) => {
                    const matchingCampaigns = arrOfCampaigns.filter(c => c.engagementId === g.id);
                    matchingCampaigns.forEach(c => {
                      const campaignId = c.id;
                      gameByCid[c.id] = { ...g, campaignId };
                    });
                    subject.next(Object.values(gameByCid).sort((a, b) => a.campaignId - b.campaignId));
                  })
                ))
            );
          })
        ).subscribe((games) => {
          this.showGames = games.length > 0;
          return subject.complete();
        });
    }));
  }

  constructor(
    private campaingService: ICampaignService,
    private rewardsService: RewardsService,
    private gamesService: IGameService,
    private router: Router,
    private translate: TranslateService
  ) {
  }

  public ngOnInit(): void {
    this.translate.get(['YOU_HAVE', 'HELLO', 'POINTS_EXPITING'])
      .subscribe((res: any) => {
        this.titleFn = (profile: IProfile) => `${res.HELLO} ${profile && profile.lastName ? profile.lastName : ''},`;
      });
    this.initCampaign();
    this.rewards$ = this.rewardsService.getAllRewards(['featured']);
    this.getTabedList();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getTabedList(): void {
    this.getTabs()
      .pipe(mergeMap((tabs) => {
        this.staticTab = tabs;
        this.tabs$.next(this.staticTab);
        return forkJoin(this.staticTab.map((tab) =>
          this.rewardsService.getAllRewards(null, tab.rewardsType ? [tab.rewardsType] : null)
            .pipe(
              map((reward) => {
                tab.rewardsList = of(reward);
                this.tabs$.next(this.staticTab);
                return tab;
              }),
              takeUntil(this.destroy$)
            )));
      })).subscribe((tab) => {
        this.staticTab = tab;
        this.tabs$.next(this.staticTab);
      });
  }
  private getTabs(): Observable<ITabConfigExtended[]> {
    return this.translate.get(stubTabs.map(tab => tab.tabName))
      .pipe(map((translation) => stubTabs.map((tab) => {
        tab.tabName = translation[tab.tabName];
        return tab;
      })));
  }
  public goToReward(reward: IReward): void {
    this.router.navigate([`/reward-detail/${reward.id}`]);
  }
}
