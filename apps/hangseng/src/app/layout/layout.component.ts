import { ChangeDetectorRef, Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { combineLatest } from 'rxjs';
import { filter, map, switchMap, tap, } from 'rxjs/operators';

import { Config, ConfigService, IConfig, IFlags, ITheme, SettingsService, ThemesService } from '@perxtech/core';

import {
  SignIn2Component, HistoryComponent, AccountComponent, WalletComponent, WalletHistoryComponent,
  ProfileComponent, LeaderboardPageComponent, FindLocationComponent,
  RebatesWalletComponent, NearmeComponent, RewardsPageComponent, LeaderboardsComponent, BadgeLandingComponent,
} from '@perxtech/blackcomb-pages';
import { BACK_ARROW_URLS } from '../app.constants';
import { HomeComponent } from '../home/home.component';
import { CampaignStampsComponent } from '../campaign-stamps/campaign-stamps.component';


export interface ShowTitleInHeader {
  getTitle(): string;
}

@Component({
  selector: 'hangseng-games-layout',
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
    private settingsService: SettingsService
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
      const chromelessFlag: boolean = paramArr && paramArr.includes('chromeless') || !!flags.chromeless;
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
