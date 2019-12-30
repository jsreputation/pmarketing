import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Router } from '@angular/router';

import {
  Observable,
  BehaviorSubject,
  forkJoin,
  of,
  Subject,
  combineLatest,
  Subscriber
} from 'rxjs';
import {
  tap,
  takeUntil,
  map,
  retry,
  mergeMap,
  takeLast
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
  FeedReaderService,
  FeedItem,
  ThemesService,
  ITheme,
  IConfig,
  ConfigService
} from '@perx/core';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { MatTabChangeEvent } from '@angular/material';

const stubTabs: ITabConfigExtended[] = [
  {
    filterKey: null,
    filterValue: null,
    tabName: 'ALL',
    rewardsType: null,
    currentPage: 1,
    completePagination: false
  },
  {
    filterKey: null,
    filterValue: null,
    tabName: 'FOOD_BEVERAGE',
    rewardsType: 'Food & Beverage',
    currentPage: 1,
    completePagination: false
  },
  {
    filterKey: null,
    filterValue: null,
    tabName: 'TRAVEL',
    rewardsType: 'Travel',
    currentPage: 1,
    completePagination: false
  },
  {
    filterKey: null,
    filterValue: null,
    tabName: 'ELECTRONICS',
    rewardsType: 'Electronics',
    currentPage: 1,
    completePagination: false
  },
  {
    filterKey: null,
    filterValue: null,
    tabName: 'WELLNESS',
    rewardsType: 'Wellness',
    currentPage: 1,
    completePagination: false
  },
  {
    filterKey: null,
    filterValue: null,
    tabName: 'ENTERTAINMENT',
    rewardsType: 'Entertainment',
    currentPage: 1,
    completePagination: false
  },
  {
    filterKey: null,
    filterValue: null,
    tabName: 'SHOPPING',
    rewardsType: 'Shopping',
    currentPage: 1,
    completePagination: false
  },
  {
    filterKey: null,
    filterValue: null,
    tabName: 'MERCHANT_SELF',
    rewardsType: 'Merchant Self',
    currentPage: 1,
    completePagination: false
  },
  {
    filterKey: null,
    filterValue: null,
    tabName: 'OTHERS',
    rewardsType: 'Others',
    currentPage: 1,
    completePagination: false
  },
];

@Component({
  selector: 'perx-blackcomb-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private pageSize: number = 10;
  private currentTabIndex: number = 0;
  private destroy$: Subject<void> = new Subject();
  public theme: ITheme;
  public appConfig: IConfig;
  public newsFeedItems: Observable<FeedItem[]>;
  public rewards$: Observable<IReward[]>;
  public games$: Observable<IGame[]>;
  public tabs$: BehaviorSubject<ITabConfigExtended[]> = new BehaviorSubject<ITabConfigExtended[]>([]);
  public staticTab: ITabConfigExtended[];
  public titleFn: (profile: IProfile) => string;
  public showGames: boolean = false;
  private static compareGamesByCid(a: IGame, b: IGame): number {
    if (!a.campaignId) {
      return -1;
    }
    if (!b.campaignId) {
      return 1;
    }
    return a.campaignId - b.campaignId;
  }

  private initCampaign(): void {
    this.games$ = (new Observable((subject: Subscriber<IGame[]>) => {
      const gameByCid: { [cid: number]: IGame } = {};
      this.campaingService.getCampaigns()
        .pipe(
          map((cs: ICampaign[]) => cs.filter(c => c.type === CampaignType.game)),
          map((cs: ICampaign[]) => cs.filter(c => gameByCid[c.id] === undefined)),
          mergeMap((arrOfCampaigns: ICampaign[]) => {
            let gameIds: number[] = arrOfCampaigns.map(c => c.engagementId)
              .filter((id: number) => id !== undefined) as number[];
            gameIds = gameIds.filter((item, index) => gameIds.indexOf(item) === index);
            return combineLatest(
              ...gameIds.filter(id => id !== undefined)
                .map((id: number) => this.gamesService.get(id)
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
                      subject.next(Object.values(gameByCid).sort(HomeComponent.compareGamesByCid));
                    })
                  ))
            );
          }),
          tap((games: IGame[]) => this.showGames = games.length > 0),
          takeLast(1)
        ).subscribe(() => subject.complete());
    }));

    this.newsFeedItems = this.feedService.getFromUrl('https://cdn.perxtech.io/content/starhub/rss.xml');

  }

  constructor(
    private campaingService: ICampaignService,
    private rewardsService: RewardsService,
    private gamesService: IGameService,
    private router: Router,
    private titleService: Title,
    private translate: TranslateService,
    private feedService: FeedReaderService,
    private themesService: ThemesService,
    private configService: ConfigService
  ) {
  }

  public ngOnInit(): void {
    this.translate.get(['YOU_HAVE', 'HELLO', 'POINTS_EXPITING'])
      .subscribe((res: any) => {
        this.titleFn = (profile: IProfile) => `${res.HELLO} ${profile && profile.lastName ? profile.lastName : ''},`;
      });
    this.initCampaign();
    this.rewards$ = this.rewardsService.getAllRewards(['featured']);
    this.getTabbedList();

    this.themesService.getThemeSetting().subscribe(
      theme => {
        this.theme = theme;
        const title = (theme.properties ? theme.properties['--title'] : undefined) || 'Blackcomb';
        this.titleService.setTitle(title);
      }
    );

    this.configService.readAppConfig().subscribe(
      (config: IConfig) => this.appConfig = config
    );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getTabbedList(): void {
    this.getTabs()
      .pipe(mergeMap((tabs) => {
        this.staticTab = tabs;
        this.tabs$.next(this.staticTab);
        return forkJoin(this.staticTab.map((tab) =>
          this.rewardsService.getRewards(1, this.pageSize, undefined, tab.rewardsType ? [tab.rewardsType] : undefined)
            .pipe(
              map((reward) => {
                tab.currentPage = 1;
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

  public onScroll(): void {
    const stTab = this.staticTab[this.currentTabIndex];
    if (!stTab || !stTab.rewardsList || stTab.completePagination) {
      return;
    }
    if (!stTab.rewardsList) {
      stTab.rewardsList = of([]);
    }
    stTab.currentPage = stTab.currentPage ? ++stTab.currentPage : 1;
    forkJoin(this.rewardsService.getRewards(
      stTab.currentPage,
      this.pageSize,
      undefined,
      stTab.rewardsType ? [stTab.rewardsType] : undefined), stTab.rewardsList
    ).subscribe((val) => {
      if (val[0].length < this.pageSize) {
        stTab.completePagination = true;
      }
      stTab.rewardsList = of([...val[1], ...val[0]]);
    });
  }

  public tabChanged(event: MatTabChangeEvent): void {
    this.currentTabIndex = event.index;
  }
}
