import {
  Component,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import {
  Router,
  NavigationEnd,
  Event, ActivatedRoute
} from '@angular/router';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

import {
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';

import {
  ThemesService,
  ITheme,
  Config,
  ConfigService,
  IConfig,
  SettingsService,
  IFlags
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
        const title = (theme.properties ? theme.properties['--title'] : undefined) || 'Blackcomb';
        this.titleService.setTitle(title);
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
  }

  public onActivate(ref: any): void {
    this.showHeader = !(ref instanceof SignIn2Component);
    this.showToolbar = ref instanceof HomeComponent ||
      ref instanceof HistoryComponent ||
      ref instanceof AccountComponent ||
      ref instanceof WalletComponent ||
      ref instanceof WalletHistoryComponent ||
      ref instanceof ProfileComponent ||
      ref instanceof CampaignStampsComponent ||
      ref instanceof LeaderboardPageComponent ||
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
