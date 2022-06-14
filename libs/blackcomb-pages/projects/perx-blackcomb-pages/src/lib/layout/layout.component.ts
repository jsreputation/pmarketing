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

import { SignIn2Component } from '../sign-in-2/sign-in-2.component';
import { HomeComponent } from '../home/home.component';
import { HistoryComponent } from '../history/history.component';
import { AccountComponent } from '../account/account.component';
import { WalletComponent } from '../wallet/wallet.component';
import { WalletHistoryComponent } from '../wallet-history/wallet-history.component';
import { ProfileComponent } from '../profile/profile.component';
import { BACK_ARROW_URLS } from '../perx-blackcomb-pages.constants';
import { TransactionHistoryComponent } from '../transaction-history/transaction-history.component';
import { CampaignStampsComponent } from '../campaign-stamps/campaign-stamps.component';
import { LeaderboardPageComponent } from '../leaderboard-page/leaderboard-page.component';
import { FindLocationComponent } from '../find-location/find-location.component';
import { RebatesWalletComponent } from '../rebates/rebates-wallet/rebates-wallet.component';
import { NearmeComponent } from '../nearme/nearme.component';
import { RewardsPageComponent } from '../rewards-page/rewards-page.component';
import { LeaderboardsComponent } from '../leaderboard/leaderboards.component';
import { BadgeLandingComponent } from '../badges/badge-landing/badge-landing.component';
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

  public showHeader: boolean;
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
      map((theme: ITheme) => {
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
      const preAuthFlag: boolean = paramArr && paramArr.includes('preAuth');
      let chromelessFlag: boolean = paramArr && paramArr.includes('chromeless') || !!flags.chromeless;
      console.log(chromelessFlag);

      // const chromelessFound = paramArr.indexOf('chromeless');
      // if (chromelessFound > 0) {
      //   this.flagLocalStorageService.setFlagInLocalStorage('chromeless', 'true');
      // } else {
      //   this.flagLocalStorageService.resetFlagInLocalStorage('chromeless');
      // }
      if (chromelessFlag) {
        this.flagLocalStorageService.setFlagInLocalStorage('chromeless', params.chromeless);
      }
      // else if ('flags' in params) {
      //   this.flagLocalStorageService.resetFlagInLocalStorage('chromeless');
      // }
      if (preAuthFlag) {
        this.flagLocalStorageService.setFlagInLocalStorage('preAuth', 'true');
      } else if ('flags' in params) {
        this.flagLocalStorageService.resetFlagInLocalStorage('preAuth');
      }

      this.showHeader = !chromelessFlag;
    });
  }

  public onActivate(ref: any): void {
    if (ref instanceof SignIn2Component) {
      this.showHeader = false;
    }

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
