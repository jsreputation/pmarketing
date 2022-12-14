import {
  Component,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  Router,
  NavigationEnd,
  Event,
  ActivatedRoute,
} from '@angular/router';
import { Location } from '@angular/common';

import {
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

import {
  PopupComponent,
  NotificationService,
  IPopupConfig,
  ConfigService,
  IConfig,
  ITheme,
  ThemesService,
  TokenStorage,
  SettingsService,
} from '@perxtech/core';
import {
  HistoryComponent,
  AccountComponent,
  SignIn2Component,
  WalletComponent,
  WalletHistoryComponent,
  ProfileComponent,
  LeaderboardPageComponent,
  LeaderboardsComponent,
  FindLocationComponent,
  TransactionHistoryComponent,
  RebatesWalletComponent,
  RewardsPageComponent,
  NearmeComponent,
} from '@perxtech/blackcomb-pages';

import { BACK_ARROW_URLS } from './app.constants';
import { Title } from '@angular/platform-browser';
import { combineLatest } from 'rxjs';
import { HomeComponent } from './home/home.component';
import { CampaignStampsComponent } from './campaign-stamps/campaign-stamps.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public showHeader: boolean;
  public showToolbar: boolean;
  public backArrowIcon: string = '';
  public preAuth: boolean;
  public translationLoaded: boolean = false;
  public navigateToLoading: boolean = false;
  public jwtTokenAuth: boolean;

  private initBackArrow(url: string): void {
    this.backArrowIcon = BACK_ARROW_URLS.some(test => url.startsWith(test)) ? 'arrow_backward' : '';
  }

  constructor(
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private location: Location,
    private router: Router,
    private cd: ChangeDetectorRef,
    private snack: MatSnackBar,
    private config: ConfigService,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private themesService: ThemesService,
    private titleService: Title,
    private storage: TokenStorage,
    private settingsService: SettingsService,
  ) {
  }

  public ngOnInit(): void {
    const langCode = this.storage.getAppInfoProperty('lang') || this.translate.getBrowserLang() || 'en';
    // to store so that it works with interceptor
    this.translate.onLangChange.pipe(
      // tap((change: LangChangeEvent) => console.info(change, 'a lang change occured')),
      tap((change: LangChangeEvent) => {
        this.storage.setAppInfoProperty(change.lang, 'lang');
        document.documentElement.lang = change.lang;
      }),
    ).subscribe();
    this.config.readAppConfig<ITheme>()
      .pipe(
        tap((config: IConfig<ITheme>) => {
          if (config.appVersion) {
            (window as any).PERX_APP_VERSION = config.appVersion;
          }
        }),
        tap((conf) => {
          if (conf.homeAsProgressPage) {
            this.navigateToLoading = conf.homeAsProgressPage;
          }
          this.storage.setAppInfoProperty(langCode, 'lang');
          this.jwtTokenAuth = conf?.jwtTokenAuth as boolean;
        }),
        // any avail languages needs to be 'gotten' first for lang toggle after to be responsive
        switchMap(() =>
          // getTranslation fetches the translation and registers the language
          // for when default lang is not 'en'
          // only after fetching the translations do you .use() it
          this.translate.getTranslation(langCode)
        ),
        tap((config: IConfig<ITheme>) => {
          // this.translate.getLangs() to get langs avail, in future pass array of langs
          // loop thru each lang string and .getTranslation it
          this.translationLoaded = true;
          this.preAuth = config.preAuth as boolean;
        }),
        switchMap((config: IConfig<ITheme>) => this.themesService.getThemeSetting(config))
      )
      .subscribe((res: ITheme) => {
        const title: string = res.properties['--title'] ? res.properties['--title'] : '\u00A0';
        this.titleService.setTitle(title);
      });

    this.notificationService.$popup
      .subscribe(
        (data: IPopupConfig) => this.dialog.open(PopupComponent, { data }),
        (err) => console.error(err)
      );
    this.notificationService.$snack
      .subscribe(
        (msg: string) => {
          if (msg === 'LOGIN_SESSION_EXPIRED') {
            if (this.jwtTokenAuth) {
              this.router.navigate(['/access-verify']);
            } else {
              this.router.navigate([this.navigateToLoading ? '/loading' : '/login']);
              this.translate.get('LOGIN_SESSION_EXPIRED').subscribe(txt => this.snack.open(txt, 'x', { duration: 2000 }));
            }
          } else {
            this.snack.open(msg, 'x', { duration: 2000 });
          }
        },
        (err) => console.error(err)
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
    combineLatest([
      this.route.queryParams,
      this.settingsService.getRemoteFlagsSettings()
    ]).subscribe(([params, flags]) => {
      const paramArr: string[] = params.flags && params.flags.split(',');
      this.showHeader = (paramArr && paramArr.includes('chromeless') || !!flags.chromeless) ? false : !(ref instanceof SignIn2Component);
    });
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
