import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, EMPTY, forkJoin, iif, Observable, of, Subject } from 'rxjs';
import {
  catchError,
  filter,
  finalize,
  map,
  mergeMap,
  scan,
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
  FeedItem,
  FeedReaderService,
  GameType,
  ICampaign,
  ICampaignService,
  ICatalog,
  IConfig,
  IFlags,
  IGame,
  IGameService,
  IInstantOutcomeTransaction,
  IInstantOutcomeTransactionService,
  ILoyalty,
  InstantOutcomeService,
  InstantOutcomeTransactionState,
  IPopupConfig,
  IPrice,
  IProfile,
  IQuestService,
  IReward,
  IRssFeeds,
  IRssFeedsData,
  ITabConfigExtended,
  ITheme,
  NotificationService,
  ProfileService,
  RewardPopupComponent,
  RewardsService,
  RssFeedsPages,
  SettingsService,
  TeamsService,
  ThemesService,
  TokenStorage
} from '@perxtech/core';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'perx-blackcomb-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private pageSize: number = 10;
  private currentTabIndex: number = 0;
  private destroy$: Subject<void> = new Subject();
  public theme: ITheme;
  public appConfig: IConfig<any>;
  public appRemoteFlags: IFlags;
  public newsFeedItems: Observable<FeedItem[] | undefined>;
  public rewards$: Observable<IReward[]>;
  public games$: Observable<IGame[]>;
  public stampCampaigns$: Observable<ICampaign[]>;
  public questCampaigns$: Observable<ICampaign[]>;
  public progressCampaigns$: Observable<ICampaign[]>;
  public instantCampaigns$: Observable<ICampaign[]>;
  public tabs$: BehaviorSubject<ITabConfigExtended[]> = new BehaviorSubject<
    ITabConfigExtended[]
  >([]);
  public staticTab: ITabConfigExtended[];
  public displayPriceFn: (rewardPrice: IPrice) => Observable<string>;
  public subTitleFn: (loyalty: ILoyalty) => Observable<string>;
  public titleFn: (profile: IProfile) => Observable<string>;
  public summaryExpiringFn: (loyalty: ILoyalty) => Observable<string>;
  public pointToFn: () => Observable<string>;
  public memberFn: (membershipTierName: string) => Observable<string>;
  public membershipExpiryFn: (loyalty: ILoyalty) => Observable<string>;
  public showGames: boolean = false;
  public showCampaigns: boolean = false;
  private firstComefirstServeCampaign: ICampaign;
  public quizCampaigns$: BehaviorSubject<ICampaign[]> = new BehaviorSubject<ICampaign[]>([]);
  private quizCampaigns: ICampaign[] = [];
  public gameType: typeof GameType = GameType;

  public catalogsBvrSbjt: BehaviorSubject<ICatalog[]> = new BehaviorSubject<
    ICatalog[]
  >([]);
  public catalogs$: Observable<ICatalog[]>;
  public catalogsEnded: boolean = false;
  public surveyCampaigns$: Observable<ICampaign[]>;
  public favDisabled: boolean = false;
  public hideRewardsTitle: boolean = false;

  public quizCampaignsPage: number = 1;
  public quizCampaignsTotalPage: number = 0;

  public constructor(
    protected rewardsService: RewardsService,
    protected gamesService: IGameService,
    protected router: Router,
    protected titleService: Title,
    protected translate: TranslateService,
    protected themesService: ThemesService,
    protected configService: ConfigService,
    protected authService: AuthenticationService,
    protected campaignService: ICampaignService,
    protected instantOutcomeService: InstantOutcomeService,
    protected dialog: MatDialog,
    protected feedService: FeedReaderService,
    protected settingsService: SettingsService,
    protected profileService: ProfileService,
    protected currencyPipe: CurrencyPipe,
    protected tokenService: TokenStorage,
    protected datePipe: DatePipe,
    protected questService: IQuestService,
    protected teamsService: TeamsService,
    protected instantOutcomeTransactionService: IInstantOutcomeTransactionService,
    protected notificationService: NotificationService,
  ) { }

  public ngOnInit(): void {
    forkJoin([
      this.configService
        .readAppConfig<void>(),
      this.settingsService.getRemoteFlagsSettings(),
    ]).subscribe(([config, flags]) => {
      if (config.homeAsProgressPage) {
        this.router.navigate(['/legacy-progress-campaigns']);
      } else {
        this.authService.isAuthorized().subscribe((isAuth: boolean) => {
          if (isAuth && !this.configService.readAppStarted()) {
            this.configService.setAppStarted();
            if (config.showPopupCampaign || flags.showPopupCampaign) {
              this.fetchPopupCampaigns();
            }
          }
        });
      }
      this.appConfig = config;
      // todo: create a function to wrap all the rest of the init calls
      this.appRemoteFlags = flags;
      this.initCampaign();
    }, (error) => {
      console.error(error);
    });
    this.profileService
      .getCustomProperties()
      .pipe(
        switchMap((res) => {
          if (res.referralCode) {
            return this.campaignService.applyReferral(
              res.referralCode as string
            );
          }
          return EMPTY;
        })
      )
      .subscribe();
    this.initTranslate();
    this.rewards$ = this.rewardsService.getAllRewards(['featured']);
    this.getTabbedList();

    this.themesService.getThemeSetting().subscribe(
      theme => {
        this.theme = theme;
        const title = (theme.properties ? theme.properties['--title'] : undefined) || '';
        if (title.length > 0) {
          this.titleService.setTitle(title);
        }
      }
    );

    this.initCatalogsScan();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // requires public access for extended implementation
  public getTabbedList(): void {
    this.getTabs()
      .pipe(
        mergeMap((tabs) =>
          forkJoin(
            tabs.map((tab) =>
              this.rewardsService
                .getRewards(
                  1,
                  this.pageSize,
                  undefined,
                  tab.rewardsType ? [tab.rewardsType] : undefined
                )
                .pipe(
                  map((reward) => {
                    tab.currentPage = 1;
                    // hide list if none of the tabs have rewards
                    this.hideRewardsTitle = this.hideRewardsTitle || reward.length > 0;
                    tab.rewardsList = of(reward);
                    this.tabs$.next(this.staticTab);
                    return tab;
                  }),
                  takeUntil(this.destroy$)
                )
            )
          )
        )
      )
      .subscribe((tab) => {
        this.staticTab = tab;
        this.tabs$.next(this.staticTab);
      });
  }

  private getTabs(): Observable<ITabConfigExtended[]> {
    return this.rewardsService.getCategories();
  }

  public goToCampaignPage(campaign: ICampaign): void {
    const subTypeSupportLandingPage = ['quiz', 'survey'];
    if (this.appConfig.showCampaignLandingPage) {
      if (subTypeSupportLandingPage.includes(campaign.subType as string)) {
        this.router.navigate([`campaign-welcome/${campaign.id}`]);
        return;
      }
    }

    if (campaign.subType === 'quiz') {
      this.router.navigate([`quiz/${campaign.id}`]);
      return;
    }

    if (campaign.subType === 'survey') {
      this.router.navigate([`survey/${campaign.id}`]);
      return;
    }

    if (this.appRemoteFlags.showStampTeams &&
      campaign.type === 'stamp' &&
      campaign.teamSize! > 0) {
      this.teamsService.getTeam(campaign.id).subscribe(
        () => {
          this.router.navigate([`teams/pending/${campaign.id}`]);
        },
        () => {
          // expecting a error 500 in console
          this.router.navigate([`campaign-welcome/${campaign.id}`]);
        }
      );
      return;
    }

    if (campaign.type === CampaignType.instant) {
      this.router.navigate([` campaign-welcome/${campaign.id}`]);
      return;
    }

    if (campaign.type === 'quest') {
      this.router.navigate([`quest/${campaign.id}`]);
      return;
    }

    this.router.navigate([`${campaign.type}/${campaign.id}`]);
  }

  public goToCampaignGamePage(game: IGame): void {
    if (this.appConfig.showCampaignLandingPage) {
      this.router.navigate([`campaign-welcome/${game.campaignId}`]);
    } else {
      this.router.navigate([`game/${game.id}`]);
    }
  }

  public goToReward(reward: IReward): void {
    this.router.navigate([`/reward-detail/${reward.id}`]);
  }

  public catalogSelected(catalog: ICatalog): void {
    this.router.navigate(['/catalogs'], {
      queryParams: { catalog: catalog.id },
    });
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
    forkJoin(
      this.rewardsService.getRewards(
        stTab.currentPage,
        this.pageSize,
        undefined,
        stTab.rewardsType ? [stTab.rewardsType] : undefined
      ),
      stTab.rewardsList
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

  // requires public access for extended implementation
  public fetchPopupCampaigns(): void {
    this.instantOutcomeTransactionService
      .getInstantOutcomeTransactions()
      .pipe(catchError(() => of([])))
      .pipe(takeUntil(this.destroy$))
      .subscribe((instantOutcomeTransactions: IInstantOutcomeTransaction[]) => {
        const instantOutcomeTransactionsHaveOutcomes: IInstantOutcomeTransaction[] = instantOutcomeTransactions.filter(
          (iot) => iot.state === InstantOutcomeTransactionState.issued
        );
        const firstComeFirstServeTransaction:
          | IInstantOutcomeTransaction
          | undefined = instantOutcomeTransactionsHaveOutcomes.length
            ? instantOutcomeTransactionsHaveOutcomes[0]
            : undefined;
        if (firstComeFirstServeTransaction) {
          this.campaignService.getCampaign(firstComeFirstServeTransaction.campaignId)
            .subscribe(campaignRes => {
              const popupImageURL = campaignRes.displayProperties?.claimPrize?.image?.value.imageUrl || 'assets/png_icon_prize.svg';
              const enrollPopUpConf: IPopupConfig = {
                title: campaignRes.displayProperties?.claimPrize?.headline || 'Congrats! You earned a prize!',
                text: campaignRes.displayProperties?.claimPrize?.subHeadline || 'Claim now before they run out!',
                buttonTxt: campaignRes.displayProperties?.claimPrize?.buttonText || 'CLAIM PRIZE',
                imageUrl: popupImageURL,
                titleBelowImage: true,
                afterClosedCallBack: {
                  dialogClosed: (): void => { },
                  onOkFn: (): void => {
                    this.instantOutcomeTransactionService
                      .claimPrize(firstComeFirstServeTransaction.id)
                      .subscribe((res) => {
                        if (res) {
                          this.router.navigate([`/instant-reward-outcomes/${firstComeFirstServeTransaction.id}`]);
                        } else {
                          console.log('no instantOutcomeTransaction: ', res);
                        }
                      }, error => {
                        console.log('Error when claim prize: ', error);
                      });
                  },
                },
              };
              this.notificationService.addPopup(enrollPopUpConf);
            });
        }

      });

    this.campaignService
      .getCampaigns({ type: CampaignType.give_reward })
      .pipe(catchError(() => of([])))
      .pipe(
        // for each campaign, get detailed version
        mergeMap((campaigns: ICampaign[]) =>
          combineLatest(
            ...campaigns.map((campaign) =>
              this.campaignService
                .getCampaign(campaign.id)
                .pipe(catchError(() => of(void 0)))
            )
          )
        ),
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
          const popupImageURL = this.firstComefirstServeCampaign
            .campaignBannerUrl
            ? this.firstComefirstServeCampaign.campaignBannerUrl
            : 'assets/bd-campaign.svg';
          const data = {
            text: this.firstComefirstServeCampaign.description,
            imageUrl: popupImageURL,
            buttonTxt: 'Check it out',
            afterClosedCallBack: this,
            // @ts-ignore
            validTo: new Date(this.firstComefirstServeCampaign.endsAt),
          };
          this.dialog.open(RewardPopupComponent, { data });
        },
        (err) =>
          console.error(
            'Something fishy, we should not be here, without any reward or game. ERR print',
            err
          )
      );
  }

  public dialogClosed(): void {
    this.instantOutcomeService
      .claim(this.firstComefirstServeCampaign.id)
      .subscribe(
        () => this.router.navigate(['/wallet']),
        (err) => {
          if (err.error && err.error.code === 4103) {
            // user has already been issued voucher
            this.router.navigate(['/wallet']);
          }
          console.error(
            'Something fishy, we should not be here, without any reward or game. ERR print',
            err
          );
        }
      );
  }

  // requires public access for extended implementation
  public initCampaign(): void {
    // https://iamturns.com/continue-rxjs-streams-when-errors-occur/ also look at CatchError, exactly for this purpose
    if (!this.showGames) {
      // prevent calling unnecessarily (i.e. duped when perx-blackcomb-pages-campaigns-collection quiz present)
      this.games$ = this.gamesService.getActiveGames().pipe(
        tap((games: IGame[]) => (this.showGames = games.length > 0)),
        takeLast(1)
      );
    }

    if (this.appConfig.showStampCampaignsOnHomePage) {
      this.stampCampaigns$ = this.campaignService
        .getCampaigns({ type: CampaignType.stamp })
        .pipe(
          tap(
            (campaigns: ICampaign[]) =>
              (this.showCampaigns = campaigns.length > 0)
          ),
          switchMap((campaigns: ICampaign[]) =>
            of(campaigns).pipe(catchError((err) => of(err)))
          ),
          takeLast(1)
        );
      // this.stampCampaigns$ = of(mockCampaigns.filter(campaign => campaign.type === CampaignType.stamp));
    }

    if (this.appConfig.showSurveyOnHomePage) {
      this.surveyCampaigns$ = this.campaignService
        .getCampaigns({ gameType: GameType.survey })
        .pipe(
          switchMap((campaigns: ICampaign[]) =>
            of(campaigns).pipe(catchError((err) => of(err)))
          ),
          takeLast(1)
        );
    }

    if (this.appConfig.showQuestCampaignsOnHomePage) {
      this.questCampaigns$ = this.campaignService
        .getCampaigns({ type: CampaignType.quest })
        .pipe(
          switchMap((campaigns: ICampaign[]) =>
            of(campaigns).pipe(catchError((err) => of(err)))
          ),
          takeLast(1)
        );
    }

    if (this.appConfig.showQuizOnHomePage) {
      this.campaignService
        .getCampaigns({ gameType: GameType.quiz, page: this.quizCampaignsPage, size: this.pageSize })
        .pipe(
          switchMap((campaigns: ICampaign[]) =>
            of(campaigns).pipe(catchError((err) => of(err)))
          ),
          takeLast(1)
        ).subscribe((campaigns: ICampaign[]) => {
          this.quizCampaigns = [...campaigns];
          this.quizCampaigns$.next(campaigns);
        });
    }
    if (this.appConfig.showProgressBarCampaignsOnHomePage || this.appRemoteFlags?.showProgressBarCampaignsOnHomePage) {
      this.progressCampaigns$ = this.campaignService
        .getCampaigns({ type: CampaignType.progress })
        .pipe(
          switchMap((campaigns: ICampaign[]) =>
            of(campaigns).pipe(catchError((err) => of(err)))
          ),
          takeLast(1)
        );
      // this.progressCampaigns$ = of(mockCampaigns.filter(campaign => campaign.type === CampaignType.progress));
    }

    if (this.appConfig.showInstantRewardCampaignsOnHomePage || this.appRemoteFlags?.showInstantRewardCampaignsOnHomePage) {
      this.instantCampaigns$ = this.campaignService
        .getCampaigns({ type: CampaignType.instant })
        .pipe(
          switchMap((campaigns: ICampaign[]) =>
            of(campaigns).pipe(catchError((err) => of(err)))
          ),
          takeLast(1)
        );
    }

    this.newsFeedItems = this.settingsService.getRssFeeds().pipe(
      map((res: IRssFeeds) =>
        res.data
          ? res.data.find((feed) => feed.page === RssFeedsPages.HOME)
          : undefined
      ),
      switchMap((feedData: IRssFeedsData | undefined) => {
        if (!feedData || !feedData.url) {
          return of([] as FeedItem[]);
        }
        return this.feedService.getFromUrl(feedData && feedData.url);
      }),
      catchError(() => of([] as FeedItem[]))
    );
  }

  // ** catalogs component section **
  // for paging through and accumulating pages
  // requires public access for extended implementation
  public initCatalogsScan(): void {
    this.catalogs$ = this.catalogsBvrSbjt
      .asObservable()
      .pipe(scan((acc, curr) => [...acc, ...(curr ? curr : [])], []));
  }

  public loadCatalogs(pageNumber: number): void {
    this.rewardsService
      .getCatalogs(pageNumber, this.pageSize)
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

  private initTranslate(): void {
    // this.subTitleFn = () => this.translate.get('HOME.YOU_HAVE');
    this.tokenService.setAppInfoProperty(this.translate.currentLang, 'lang');
    this.titleFn = (profile: IProfile) =>
      this.translate.get('HOME.HELLO').pipe(
        map((msg) => {
          let returnString = msg;
          if (
            profile &&
            profile.firstName &&
            profile.firstName !== '' &&
            profile.lastName &&
            profile.lastName !== ''
          ) {
            returnString = `${returnString}, ${profile.firstName} ${profile.lastName}`;
          } else if (profile && profile.firstName && profile.firstName !== '') {
            returnString = `${returnString}, ${profile.firstName}`;
          } else if (profile && profile.lastName && profile.lastName !== '') {
            returnString = `${returnString}, ${profile.lastName}`;
          }
          return returnString;
        })
      );
    if (this.appConfig && this.appConfig.app === 'abenson') {
      // AB-599: returns rounded down result for points balance / currency rate
      const getBalance = (loyalty: ILoyalty) =>
        Math.floor(loyalty.pointsBalance / (loyalty.pointsToCurrencyRate ? loyalty.pointsToCurrencyRate : 1));
      this.subTitleFn = (loyalty: ILoyalty) =>
        this.translate
          .get('HOME.CASH_EQUIVALENT')
          .pipe(
            map((res) =>
              res.replace('{{amount}}', this.currencyPipe.transform(
                getBalance(loyalty), loyalty.currency,
                'symbol-narrow',
                '1.0-0',
                'en-PH'))
            ));
    }

    this.summaryExpiringFn = (loyalty: ILoyalty) =>
      this.translate
        .get('HOME.POINTS_EXPIRING')
        .pipe(
          map((res) =>
            loyalty &&
              loyalty.expiringPoints &&
              loyalty.expiringPoints.length &&
              loyalty.expiringPoints[0].points &&
              loyalty.expiringPoints[0].points !== 0
              ? res
                .replace(
                  '{{points}}',
                  (loyalty.expiringPoints[0].points
                    ? loyalty.expiringPoints[0].points
                    : 0
                  ).toString()
                )
                .replace(
                  '{{date}}',
                  loyalty.expiringPoints[0].expireDate
                    ? this.datePipe.transform(
                      loyalty.expiringPoints[0].expireDate,
                      'd MMM y'
                    )
                    : ''
                )
              : this.appConfig.app === 'abenson'
                ? `Your total points as of ${this.datePipe.transform(
                  new Date(),
                  'mediumDate'
                )}`
                : ''
          )
        );
    this.pointToFn = () => this.translate.get('HOME.POINT_TO');
    this.memberFn = (membershipTierName: string) =>
      this.translate
        .get([membershipTierName, 'HOME.MEMBER'])
        .pipe(map((res) => `${res[membershipTierName]}${res['HOME.MEMBER']}`));
    this.membershipExpiryFn = (loyalty: ILoyalty) =>
      loyalty && loyalty.membershipExpiry
        ? this.translate
          .get('HOME.ACCOUNT_EXPIRE')
          .pipe(
            map(
              (res) =>
                `${res}: ${this.datePipe.transform(
                  loyalty.membershipExpiry,
                  'mediumDate'
                )}`
            )
          )
        : of('');

    this.displayPriceFn = (rewardPrice: IPrice) =>
      this.translate.get('REWARD.POINT').pipe(
        mergeMap((text) => {
          if (rewardPrice.price && parseFloat(rewardPrice.price) > 0) {
            return of(
              `${rewardPrice.currencyCode} ${Math.floor(
                parseFloat(rewardPrice.price)
              )}`
            );
          }

          if (rewardPrice.points && rewardPrice.points > 0) {
            return of(`${rewardPrice.points} ${text}`);
          }
          return of(''); // is actually 0 or invalid value default
        })
      );
  }

  public rewardFavoriteHandler(rewardToggled: IReward): void {
    if (this.favDisabled) {
      return;
    }

    this.favDisabled = true;

    iif(() => (rewardToggled && (rewardToggled.favorite || false)),
      this.rewardsService.unfavoriteReward(rewardToggled.id),
      this.rewardsService.favoriteReward(rewardToggled.id)).pipe(
        tap(
          rewardChanged => {
            this.rewards$ = this.rewards$.pipe(
              map(rewards => {
                const foundIndex = rewards.findIndex(reward => reward.id === rewardToggled.id);
                rewards[foundIndex] = rewardChanged;
                return rewards;
              })
            );
          }
        ),
        finalize(() => setTimeout(() => {
          this.favDisabled = false;
        }, 500))
      ).subscribe();
  }

  public paginateQuizCampaign(): void {
    this.quizCampaignsPage = this.quizCampaignsPage === 1 ? 2 : 1;
    this.campaignService
      .getCampaigns({ gameType: GameType.quiz, page: this.quizCampaignsPage, size: this.pageSize })
      .pipe(
        switchMap((campaigns: ICampaign[]) =>
          of(campaigns).pipe(catchError((err) => of(err)))
        ),
        takeLast(1)
      ).subscribe((campaigns: ICampaign[]) => {
        const campaignArr: any[] = [...this.quizCampaignsPage === 2 ? this.quizCampaigns : []];
        campaigns?.forEach((campaign: ICampaign) => {
          campaignArr.push(campaign);
        });
        this.quizCampaigns$.next([...campaignArr]);
      });
  }
}
