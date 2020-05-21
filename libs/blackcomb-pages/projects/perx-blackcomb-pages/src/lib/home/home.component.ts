import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  combineLatest, EMPTY,
  forkJoin,
  Observable,
  of,
  Subject
} from 'rxjs';
import {
  catchError,
  filter,
  map,
  mergeMap, scan,
  switchMap,
  take,
  takeLast,
  takeUntil,
  tap
} from 'rxjs/operators';

import {
  AuthenticationService,
  CampaignType,
  ConfigService,
  ICampaign,
  ICampaignService,
  ICatalog,
  IConfig,
  IGame,
  IGameService,
  InstantOutcomeService,
  IProfile,
  IReward,
  ITabConfigExtended,
  ITheme,
  RewardPopupComponent,
  RewardsService,
  ThemesService,
  GameType,
  RssFeedsPages,
  FeedReaderService,
  SettingsService,
  IRssFeeds,
  IRssFeedsData,
  FeedItem,
  ProfileService
} from '@perxtech/core';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import {
  MatDialog,
  MatTabChangeEvent
} from '@angular/material';

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
  public newsFeedItems: Observable<FeedItem[] | undefined>;
  public rewards$: Observable<IReward[]>;
  public games$: Observable<IGame[]>;
  public stampCampaigns$: Observable<ICampaign[]>;
  public tabs$: BehaviorSubject<ITabConfigExtended[]> = new BehaviorSubject<ITabConfigExtended[]>([]);
  public staticTab: ITabConfigExtended[];
  public titleFn: (profile: IProfile) => string;
  public showGames: boolean = false;
  public showCampaigns: boolean = false;
  private firstComefirstServeCampaign: ICampaign;
  public quizCampaigns$: Observable<ICampaign[]>;
  public gameType: typeof GameType = GameType;

  public catalogsBvrSbjt: BehaviorSubject<ICatalog[]> = new BehaviorSubject<ICatalog[]>([]);
  public catalogs$: Observable<ICatalog[]>;
  public catalogsEnded: boolean = false;

  public constructor(
    private rewardsService: RewardsService,
    private gamesService: IGameService,
    private router: Router,
    private titleService: Title,
    private translate: TranslateService,
    private themesService: ThemesService,
    private configService: ConfigService,
    private authService: AuthenticationService,
    private campaignService: ICampaignService,
    private instantOutcomeService: InstantOutcomeService,
    private dialog: MatDialog,
    private feedService: FeedReaderService,
    private settingsService: SettingsService,
    private profileService: ProfileService
  ) {
  }

  public ngOnInit(): void {
    this.profileService.getCustomProperties()
      .pipe(
        switchMap(
          res => {
            if (res.referralCode) {
              return this.campaignService.applyReferral(res.referralCode as string);
            }
            return EMPTY;
          })
      ).subscribe();
    this.translate.get('HOME.HELLO').subscribe(
      (msg: string) => this.titleFn = (profile) => {
        let returnString = msg;
        if (profile &&
          profile.firstName && profile.firstName !== '' &&
          profile.lastName && profile.lastName !== '') {
          returnString = `${returnString}, ${profile.firstName} ${profile.lastName}`;
        } else if (profile && profile.firstName && profile.firstName !== '') {
          returnString = `${returnString}, ${profile.firstName}`;
        } else if (profile && profile.lastName && profile.lastName !== '') {
          returnString = `${returnString}, ${profile.lastName}`;
        }
        return returnString;
      }
    );
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
      (config: IConfig<void>) => {
        this.appConfig = config;
        this.initCampaign();
      }
    );

    this.authService.isAuthorized().subscribe((isAuth: boolean) => {
      if (isAuth) {
        this.fetchPopupCampaigns();
      }
    });

    this.initCatalogsScan();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getTabbedList(): void {
    this.getTabs()
      .pipe(mergeMap((tabs) => forkJoin(tabs.map((tab) =>
        this.rewardsService.getRewards(1, this.pageSize, undefined, tab.rewardsType ? [tab.rewardsType] : undefined)
          .pipe(
            map((reward) => {
              tab.currentPage = 1;
              tab.rewardsList = of(reward);
              this.tabs$.next(this.staticTab);
              return tab;
            }),
            takeUntil(this.destroy$)
          )))
      )).subscribe((tab) => {
        this.staticTab = tab;
        this.tabs$.next(this.staticTab);
      });
  }

  private getTabs(): Observable<ITabConfigExtended[]> {
    return this.rewardsService.getCategories();
  }

  public goToCampaignPage(campaign: ICampaign): void {
    if (campaign.type === CampaignType.game && campaign.subType === 'quiz') {
      // currently only the quiz have proper data for landing page, once other campaign
      // type have proper data, move this block out
      if (this.appConfig.showCampaignLandingPage) {
        this.router.navigate([`campaign-welcome/${campaign.id}`]);
        return;
      }

      this.router.navigate([`quiz/${campaign.id}`]);
      return;
    }

    this.router.navigate([`${campaign.type}/${campaign.id}`]);
  }

  public goToReward(reward: IReward): void {
    this.router.navigate([`/reward-detail/${reward.id}`]);
  }

  public catalogSelected(catalog: ICatalog): void {
    this.router.navigate(['/catalogs'], { queryParams: { catalog: catalog.id } });
  }

  public onScroll(): void {
    if (!this.staticTab) {
      return;
    }
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
          const popupImageURL = this.firstComefirstServeCampaign.campaignBannerUrl ?
            this.firstComefirstServeCampaign.campaignBannerUrl : 'assets/bd-campaign.svg';
          const data = {
            text: this.firstComefirstServeCampaign.description,
            imageUrl: popupImageURL,
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
    this.instantOutcomeService.claim(this.firstComefirstServeCampaign.id).subscribe(
      () => this.router.navigate(['/wallet']),
      (err) => {
        if (err.error && err.error.code === 4103) {
          // user has already been issued voucher
          this.router.navigate(['/wallet']);
        }
        console.error('Something fishy, we should not be here, without any reward or game. ERR print', err);
      }
    );
  }

  private initCampaign(): void {
    // https://iamturns.com/continue-rxjs-streams-when-errors-occur/ also look at CatchError, exactly for this purpose
    if (this.showGames) { // prevent calling unnecessarily (i.e. duped when perx-blackcomb-pages-campaigns-collection quiz present)
      this.games$ = this.gamesService.getActiveGames()
        .pipe(
          tap((games: IGame[]) => this.showGames = games.length > 0),
          switchMap((games: IGame[]) => of(games).pipe(catchError(err => of(err)))),
          takeLast(1)
        );
    }
    this.stampCampaigns$ = this.campaignService.getCampaigns({ type: CampaignType.stamp })
      .pipe(
        tap((campaigns: ICampaign[]) => this.showCampaigns = campaigns.length > 0),
        takeLast(1)
      );

    this.quizCampaigns$ = this.campaignService.getCampaigns({ gameType: GameType.quiz });

    this.newsFeedItems = this.settingsService.getRssFeeds().pipe(
      map((res: IRssFeeds) => res.data ? res.data.find(feed => feed.page === RssFeedsPages.HOME) : undefined),
      switchMap((feedData: IRssFeedsData | undefined) => {
        if (!feedData || !feedData.url) {
          return of([] as FeedItem[]);
        }
        return this.feedService.getFromUrl(feedData && feedData.url);
      })
    );
  }

  // ** catalogs component section **
  // for paging through and accumulating pages
  private initCatalogsScan(): void {
    this.catalogs$ = this.catalogsBvrSbjt.asObservable().pipe(
      scan((acc, curr) => [...acc, ...curr ? curr : []], [])
    );
  }

  public loadCatalogs(pageNumber: number): void {
    this.rewardsService.getCatalogs(pageNumber, this.pageSize)
      .subscribe((catalogs: ICatalog[]) => {
        if (!catalogs) {
          return;
        }
        this.catalogsBvrSbjt.next(catalogs);
        if (catalogs.length < this.pageSize) {
          this.catalogsEnded = true;
        }
      });
  }

}
