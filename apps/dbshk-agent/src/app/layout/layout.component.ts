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
import { BACK_ARROW_URLS } from '../app.constants';
import { HomeComponent } from '../home/home.component';
import {
  AccountComponent,
  CampaignStampsComponent,
  FindLocationComponent,
  HistoryComponent,
  LeaderboardPageComponent,
  NearmeComponent,
  ProfileComponent,
  RebatesWalletComponent,
  RewardsPageComponent,
  SignIn2Component,
  TransactionHistoryComponent,
  WalletComponent,
  WalletHistoryComponent
} from '@perxtech/blackcomb-pages';
import { PerformanceComponent } from '../performance/performance.component';

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
    this.route.queryParams.subscribe((params) => {
      const paramArr: string[] = params.flags && params.flags.split(',');
      this.showHeader = paramArr && paramArr.includes('chromeless') ? false : !(ref instanceof SignIn2Component);
    });
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
      ref instanceof PerformanceComponent ||
      ref instanceof NearmeComponent;
    this.cd.detectChanges();
  }

  public backArrowClick(): void {
    if (this.backArrowIcon !== '') {
      this.location.back();
    }
  }

}
