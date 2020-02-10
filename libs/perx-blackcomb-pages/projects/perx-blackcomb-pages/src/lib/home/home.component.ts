import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {BehaviorSubject, combineLatest, forkJoin, Observable, of, Subject} from 'rxjs';
import {catchError, filter, map, mergeMap, take, takeLast, takeUntil, tap} from 'rxjs/operators';

import {
  AuthenticationService,
  CampaignType,
  ConfigService,
  FeedItem,
  FeedReaderService,
  ICampaign,
  ICampaignService, ICatalog,
  IConfig,
  IGame,
  IGameService,
  IProfile,
  IReward,
  IRssFeeds,
  IRssFeedsData,
  ITabConfigExtended,
  ITheme,
  RewardPopupComponent,
  RewardsService,
  ThemesService,
} from '@perx/core';
import {TranslateService} from '@ngx-translate/core';
import {Title} from '@angular/platform-browser';
import {MatDialog, MatTabChangeEvent} from '@angular/material';

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
  // {
  //   filterKey: null,
  //   filterValue: null,
  //   tabName: 'ELECTRONICS',
  //   rewardsType: 'Electronics',
  //   currentPage: 1,
  //   completePagination: false
  // },
  {
    filterKey: null,
    filterValue: null,
    tabName: 'WELLNESS',
    rewardsType: 'Wellness',
    currentPage: 1,
    completePagination: false
  },
  // {
  //   filterKey: null,
  //   filterValue: null,
  //   tabName: 'ENTERTAINMENT',
  //   rewardsType: 'Entertainment',
  //   currentPage: 1,
  //   completePagination: false
  // },
  {
    filterKey: null,
    filterValue: null,
    tabName: 'SHOPPING',
    rewardsType: 'Shopping',
    currentPage: 1,
    completePagination: false
  },
  // {
  //   filterKey: null,
  //   filterValue: null,
  //   tabName: 'MERCHANT_SELF',
  //   rewardsType: 'Merchant Self',
  //   currentPage: 1,
  //   completePagination: false
  // },
  // {
  //   filterKey: null,
  //   filterValue: null,
  //   tabName: 'OTHERS',
  //   rewardsType: 'Others',
  //   currentPage: 1,
  //   completePagination: false
  // },
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
  public appConfig: IConfig<void>;
  public newsFeedItems: Observable<FeedItem[]>;
  public rewards$: Observable<IReward[]>;
  public games$: Observable<IGame[]>;
  public campaigns$: Observable<ICampaign[]>;
  public tabs$: BehaviorSubject<ITabConfigExtended[]> = new BehaviorSubject<ITabConfigExtended[]>([]);
  public staticTab: ITabConfigExtended[];
  public titleFn: (profile: IProfile) => string;
  public showGames: boolean = false;
  public showCampaigns: boolean = false;
  private firstComefirstServeCampaign: ICampaign;

  private async initCampaign(): Promise<void> {
    this.games$ = this.gamesService.getActiveGames()
      .pipe(
        tap((games: IGame[]) => this.showGames = games.length > 0),
        takeLast(1)
      );
    this.campaigns$ = this.campaignService.getCampaigns({type: CampaignType.stamp})
      .pipe(
        tap((campaigns: ICampaign[]) => this.showCampaigns = campaigns.length > 0),
        takeLast(1)
      );
    const rssFeeds: IRssFeeds = await this.configService.readRssFeeds().toPromise();
    if (!(rssFeeds && rssFeeds.data.length > 0)) {
      return;
    }

    const rssFeedsHome: IRssFeedsData | undefined = rssFeeds.data.find(feed => feed.page === 'home');
    if (!rssFeedsHome) {
      return;
    }

    const rssFeedsUrl: string = rssFeedsHome.url;
    this.newsFeedItems = this.feedService.getFromUrl(rssFeedsUrl);
  }

  constructor(
    private rewardsService: RewardsService,
    private gamesService: IGameService,
    private router: Router,
    private titleService: Title,
    private translate: TranslateService,
    private feedService: FeedReaderService,
    private themesService: ThemesService,
    private configService: ConfigService,
    private authService: AuthenticationService,
    private campaignService: ICampaignService,
    private dialog: MatDialog
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

    this.configService.readAppConfig<void>().subscribe(
      (config: IConfig<void>) => this.appConfig = config
    );

    this.authService.isAuthorized().subscribe((isAuth: boolean) => {
      if (isAuth) {
        this.fetchPopupCampaigns();
      }
    });
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

  public goToCampaignPage(campaign: ICampaign): void {
    this.router.navigate([`${campaign.type}/${campaign.id}`]);
  }

  public goToReward(reward: IReward): void {
    this.router.navigate([`/reward-detail/${reward.id}`]);
  }

  public catalogSelected(catalog: ICatalog): void {
    this.router.navigate(['/catalogs'], { queryParams: { catalog: catalog.id } });
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

  private fetchPopupCampaigns(): void {
    this.campaignService.getCampaigns({ type: CampaignType.give_reward })
      .pipe(
        catchError(() => of([]))
      )
      .pipe(
        // for each campaign, get detailed version
        mergeMap((campaigns: ICampaign[]) => combineLatest(
          ...campaigns.map(campaign => this.campaignService.getCampaign(campaign.id).pipe(catchError(() => of(void 0))))
        )),
        // just keep campaigns of type give_reward
        map((campaigns: ICampaign[]) => campaigns.filter(campaign => campaign !== undefined && campaign.type === CampaignType.give_reward)),
        // don't go further if it is an empty array
        filter((campaigns: ICampaign[]) => campaigns.length > 0),
        // get the first element
        map((campaigns: ICampaign[]) => campaigns[0]),
        // once we have one, we stop polling
        take(1),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (firstComeFirstServed: ICampaign) => {
          // if there is a 1st come 1st served campaign, display the popup
          this.firstComefirstServeCampaign = firstComeFirstServed;
          const data = {
            text: this.firstComefirstServeCampaign.description,
            imageUrl: 'assets/bd-campaign.svg',
            buttonTxt: 'Check it out',
            afterClosedCallBack: this,
            // @ts-ignore
            validTo: new Date(this.firstComefirstServeCampaign.endsAt)
          };
          this.dialog.open(RewardPopupComponent, { data });
        },
        err => console.error('Something fishy, we should not be here, without any reward or game. ERR print', err)
      );
  }

  public dialogClosed(): void {
    this.campaignService.issueAll(this.firstComefirstServeCampaign.id).subscribe(
      () => this.router.navigate([`/wallet`]),
      (err) => {
        if (err.error && err.error.code === 4103) {
          // user has already been issued voucher
          this.router.navigate([`/wallet`]);
        }
        console.error('Something fishy, we should not be here, without any reward or game. ERR print', err);
      }
    );
  }
}
