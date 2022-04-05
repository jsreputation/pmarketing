import { ChangeDetectorRef, Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

import { filter, map, switchMap, tap, } from 'rxjs/operators';

import { Config, ConfigService, IConfig, IFlags, ITheme, SettingsService, ThemesService, } from '@perxtech/core';
import {
  AccountComponent,
  BACK_ARROW_URLS,
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
      .subscribe(url => this.initBackArrow(url));
    this.initBackArrow(this.router.url);
    this.route.queryParams.subscribe((params) => {
      const paramArr: string[] = params.flags && params.flags.split(',');
      const chromelessFlag: boolean = paramArr && paramArr.includes('chromeless');
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
      ref instanceof NearmeComponent;
    this.cd.detectChanges();
  }

  public backArrowClick(): void {
    if (this.backArrowIcon !== '') {
      this.location.back();
    }
  }

}
