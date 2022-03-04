import { ChangeDetectorRef, Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

import { filter, map, switchMap, tap, } from 'rxjs/operators';

import {
  Config,
  ConfigService,
  FlagLocalStorageService,
  IConfig,
  IFlags,
  ITheme,
  SettingsService,
  ThemesService
} from '@perxtech/core';


import { AccountComponent } from '../account/account.component';
import {
  BACK_ARROW_URLS,
  BadgeLandingComponent,
  CampaignStampsComponent,
  FindLocationComponent,
  HistoryComponent,
  HomeComponent,
  LeaderboardPageComponent,
  LeaderboardsComponent,
  NearmeComponent,
  ProfileComponent,
  RebatesWalletComponent,
  RewardsPageComponent,
  SignIn2Component,
  TransactionHistoryComponent,
  WalletComponent,
  WalletHistoryComponent
} from '@perxtech/blackcomb-pages';
import { combineLatest } from 'rxjs';

export interface ShowTitleInHeader {
  getTitle(): string;
}

@Component({
  selector: 'perx-blackcomb-games-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  public showHeader: boolean = false;
  public headerTitle: string;
  public showToolbar: boolean;
  public backArrowIcon: string = '';
  public preAuth: boolean;
  public theme: ITheme;
  public appConfig: IConfig<void>;
  public appRemoteFlags: IFlags;
  public tenant: string;
  public isLeaderboardPage: boolean = false;

  private initBackArrow(url: string): void {
    this.backArrowIcon = BACK_ARROW_URLS.some(test => url.startsWith(test)) ? 'arrow_backward' : '';
  }

  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private themesService: ThemesService,
    private titleService: Title,
    private cd: ChangeDetectorRef,
    private config: Config,
    private configService: ConfigService,
    private settingsService: SettingsService,
    private flagLocalStorageService: FlagLocalStorageService
  ) {
    if (config) {
      this.preAuth = this.config.preAuth || false;
    }
  }

  public ngOnInit(): void {
    this.isLeaderboardPage = this.router.url.startsWith('/leaderboard') ? true : false;

    this.route.data.subscribe(
      (dataObj) => {
        this.tenant = dataObj.tenant;
      }
    );
    this.configService.readAppConfig().pipe(
      tap((config: IConfig<void>) => this.appConfig = config),
      switchMap(() => this.themesService.getThemeSetting()),
      map(theme => {
        this.theme = theme;
        const title = (theme.properties ? theme.properties['--title'] : undefined) || '';
        if (title.length > 0) {
          this.titleService.setTitle(title);
        }
      }),
      switchMap(() => this.settingsService.getRemoteFlagsSettings()),
    ).subscribe(
      (flags: IFlags) => this.appRemoteFlags = flags
    );

    this.router.events
      .pipe(
        filter((event: Event) => event instanceof NavigationEnd),
        map((event: NavigationEnd) => event.urlAfterRedirects)
      )
      .subscribe(url => {
        this.isLeaderboardPage = url.startsWith('/leaderboard') ? true : false;
        this.initBackArrow(url);
      });
    this.initBackArrow(this.router.url);
    combineLatest([
      this.route.queryParams,
      this.settingsService.getRemoteFlagsSettings()
    ]).subscribe(([params, flags]) => {
      const paramArr: string[] = params.flags && params.flags.split(',');
      const chromelessFlag: boolean = paramArr && paramArr.includes('chromeless') || !!flags.chromeless;

      if (chromelessFlag) {
        this.flagLocalStorageService.setFlagInLocalStorage('chromeless', 'true');
      } else if (params && params.flags === '') {
        this.flagLocalStorageService.resetFlagInLocalStorage('chromeless');
      }
    });
  }

  public onActivate(ref: any): void {

    const chromeless = Boolean(this.flagLocalStorageService.getFlagInLocalStorage('chromeless'));
    this.showHeader = chromeless ? false : !(ref instanceof SignIn2Component);

    this.showToolbar = ref instanceof HomeComponent ||
      ref instanceof HistoryComponent ||
      ref instanceof AccountComponent ||
      ref instanceof WalletComponent ||
      ref instanceof WalletHistoryComponent ||
      ref instanceof ProfileComponent ||
      ref instanceof CampaignStampsComponent ||
      ref instanceof LeaderboardPageComponent ||
      ref instanceof LeaderboardsComponent ||
      ref instanceof FindLocationComponent ||
      ref instanceof TransactionHistoryComponent ||
      ref instanceof RebatesWalletComponent ||
      ref instanceof RewardsPageComponent ||
      ref instanceof NearmeComponent ||
      ref instanceof BadgeLandingComponent;
    this.cd.detectChanges();
  }

  public backArrowClick(): void {
    if (this.backArrowIcon !== '') {
      this.location.back();
    }
  }

}
