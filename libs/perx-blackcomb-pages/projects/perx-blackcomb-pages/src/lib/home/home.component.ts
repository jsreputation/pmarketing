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
  mergeMap,
  retry,
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
} from '@perx/core';

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
    tabName: 'Food & Beverage',
    rewardsList: null,
    rewardsType: 'Food & Beverage'
  }, {
    filterKey: null,
    filterValue: null,
    tabName: 'Travel',
    rewardsList: null,
    rewardsType: 'Travel'
  },
  {
    filterKey: null,
    filterValue: null,
    tabName: 'Electronics',
    rewardsList: null,
    rewardsType: 'Electronics'
  },
  {
    filterKey: null,
    filterValue: null,
    tabName: 'Wellness',
    rewardsList: null,
    rewardsType: 'Wellness'
  },
  {
    filterKey: null,
    filterValue: null,
    tabName: 'Entertainment',
    rewardsList: null,
    rewardsType: 'Entertainment'
  },
  {
    filterKey: null,
    filterValue: null,
    tabName: 'Shopping',
    rewardsList: null,
    rewardsType: 'Shopping'
  },
  {
    filterKey: null,
    filterValue: null,
    tabName: 'Merchant Self',
    rewardsList: null,
    rewardsType: 'Merchant Self'
  },
  {
    filterKey: null,
    filterValue: null,
    tabName: 'Others',
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

  private initCampaign(): void {
    this.games$ = new Observable((subject: Subscriber<IGame[]>) => {
      const gameByCid: { [cid: number]: IGame } = {};
      this.campaingService.getCampaigns()
        .pipe(
          map((cs: ICampaign[]) => cs.filter(c => c.type === CampaignType.game)),
          map((cs: ICampaign[]) => cs.filter(c => gameByCid[c.id] === undefined)),
          mergeMap((arrOfCampaigns: ICampaign[]) => {
            let gameIds = arrOfCampaigns.map(c => c.engagementId);
            gameIds = gameIds.filter((item, index) => gameIds.indexOf(item) === index);
            return combineLatest(
              ...gameIds.map(id => this.gamesService.get(id)
                .pipe(
                  retry(1),
                  tap((g: IGame) => {
                    const matchingCampaigns = arrOfCampaigns.filter(c => c.engagementId === g.id);
                    matchingCampaigns.forEach(c => gameByCid[c.id] = g);
                    subject.next(Object.values(gameByCid).sort((a, b) => a.campaignId - b.campaignId));
                  })
                ))
            );
          })
          // complete the observable once all have been completed
        ).subscribe(() => subject.complete());
    });
  }

  constructor(
    private campaingService: ICampaignService,
    private rewardsService: RewardsService,
    private gamesService: IGameService,
    private router: Router
  ) {
  }

  public ngOnInit(): void {
    this.initCampaign();
    this.rewards$ = this.rewardsService.getAllRewards(['featured']);
    this.staticTab = stubTabs;
    this.getTabedList();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getTabedList(): void {
    this.tabs$.next(this.staticTab);
    forkJoin(this.staticTab.map((tab) =>
      this.rewardsService.getAllRewards(null, tab.rewardsType ? [tab.rewardsType] : null)
        .pipe(
          tap((reward) => {
            tab.rewardsList = of(reward);
            this.tabs$.next(this.staticTab);
          }),
          takeUntil(this.destroy$)
        )
    )).subscribe(() => {
      this.tabs$.next(this.staticTab);
    });
  }

  public goToReward(reward: IReward): void {
    this.router.navigate([`/reward-detail/${reward.id}`]);
  }
}
