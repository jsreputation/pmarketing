import { Component, OnInit } from '@angular/core';
import {
  AuthenticationService,
  ConfigService,
  ICampaign,
  IConfig,
  IFlags,
  IGame,
  IGameService,
  IPopupConfig,
  IProfile,
  ITheme,
  LoyaltyService,
  NotificationService,
  PopupComponent,
  ProfileService,
  RewardPopupComponent,
  SettingsService,
  ThemesService,
  TokenStorage
} from '@perxtech/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, filter, first, map, switchMap, tap, } from 'rxjs/operators';
import { AnalyticsService, IEvent, PageType } from './analytics.service';
import { EMPTY, iif, of, throwError, timer } from 'rxjs';
import { Router } from '@angular/router';
import { IStarhubConfig } from './home/home/home.component';
import { oc } from 'ts-optchain';
import { Title } from '@angular/platform-browser';

export interface IdataLayerSH {
  pageName: string;
  channel: string;
  pageType: string;
  siteSectionLevel1: string;
  siteSectionLevel2: string;
  siteSectionLevel3: string;
  perxID: string;
  loginStatus: boolean;
}

// tslint:disable-next-line
//@ts-ignore
declare var dataLayerSH: IdataLayerSH; // eslint-disable-line

declare const _satellite: {
  track: (ev: string) => void;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // public selectedCampaign: ICampaign;
  public game?: IGame;
  public theme: ITheme;
  public holdingGateOpened: boolean = true;
  public loading: boolean = true;

  constructor(
    // private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    // private activeRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private gameService: IGameService,
    private tokenStorage: TokenStorage,
    private analytics: AnalyticsService,
    private loyaltyService: LoyaltyService,
    private profileService: ProfileService,
    private configService: ConfigService,
    private settingsService: SettingsService,
    private authenticationService: AuthenticationService,
    private themesService: ThemesService,
    private titleService: Title,
  ) {
    this.data.pageName = '';
    this.data.channel = 'msa';
    this.data.pageType = '';
    this.data.siteSectionLevel1 = 'rewards';
    this.data.siteSectionLevel2 = '';
    this.data.siteSectionLevel3 = '';
    this.data.perxID = '';
    this.data.loginStatus = true;
  }

  private get data(): Partial<IdataLayerSH> {
    // tslint:disable-next-line: no-use-before-declare
    if (dataLayerSH === undefined) {
      return {};
    }
    return dataLayerSH;
  }

  public ngOnInit(): void {
    // init theme
    this.configService.readAppConfig().pipe(
      map(() => this.authenticationService.getAppAccessToken()),
      switchMap((appToken: string) =>
        iif(() => !!appToken && appToken.length > 0,
          this.themesService.getThemeSetting(),
          this.authenticationService.getAppToken().pipe(
            switchMap(() => this.themesService.getThemeSetting())
          )
        )
      )
    ).subscribe(
      (res: ITheme) => {
        const title: string = res.properties['--title'] ? res.properties['--title'] : '\u00A0';
        this.titleService.setTitle(title);
      },
      (err) => console.error(`Error ${err}`),
    );

    this.authenticationService.isAuthorized().subscribe((isAuth: boolean) => {
      if (!isAuth) {
        this.loading = false;
        this.router.navigateByUrl('/error', { state : {errorType: 'unauthorized'}});
      }
    });
    this.notificationService.$popup
      .subscribe((data: IPopupConfig) =>
        this.dialog.open(PopupComponent, {
          data, ...data.panelClass && { panelClass: data.panelClass }
        }));

    this.notificationService.$snack
      .subscribe(
        (msg: string) => {
          if (msg === 'LOGIN_SESSION_EXPIRED') {
            this.router.navigate(['/error']);
            msg = 'Login Session Expired';
          }
          this.snackBar.open(msg, 'x', { duration: 2000 });
        },
        (err) => console.error(err)
      );

    this.analytics.events$.subscribe(
      (event: IEvent) => {
        if (event.pageType === PageType.overlay) {
          this.data.pageName = `${this.data.pageName}:${event.pageName}`;
        } else {
          this.data.pageName = event.pageName;
        }
        this.data.pageName = this.data.pageName.toLowerCase();
        this.data.pageName = this.data.pageName.replace(/\s/g, '-');

        this.data.pageType = event.pageType;
        if (event.siteSectionLevel2) {
          this.data.siteSectionLevel2 = event.siteSectionLevel2;
        }
        if (event.siteSectionLevel3) {
          this.data.siteSectionLevel3 = event.siteSectionLevel3;
        }

        if (typeof _satellite === 'undefined') {
          return;
        }
        _satellite.track('msa-rewards-virtual-page');
      }
    );

    // init holding
    this.configService.readAppConfig<IStarhubConfig>().pipe(
      tap((config: IConfig<IStarhubConfig>) => {
        if (config.appVersion) {
          (window as any).PERX_APP_VERSION = config.appVersion;
        }
        if (oc(config).custom.UXCR()) {
          document.body.classList.add('electric-green');
        }
      }),
      switchMap(() => this.settingsService.getRemoteFlagsSettings()),
      switchMap((flags: IFlags) => iif(
        () => flags.gatekeeperUrl !== undefined && flags.gatekeeperUrl?.length > 0,
        timer(0, flags && flags.gatekeeperPollingInterval || 2000)
          .pipe(
            switchMap(() => this.settingsService.isGatekeeperOpen().pipe(
              catchError((err: string) => {
                throwError(err);
                console.error(err);
                this.holdingGateOpened = false;
                return EMPTY;
              })
            )),
          ),
        of(true)
      )),
      first(res => res === true)
    ).subscribe(() => {
      this.loadApp();
      this.loading = false;
    });
  }

  private loadApp(): void {
    this.loyaltyService.getLoyalty().pipe(
      switchMap(() => this.profileService.whoAmI())
    ).subscribe((profile: IProfile) => {
      (window as any).dataLayer.push({ user_properties: { identifier: profile.identifier } });
      if ((window as any).newrelic) {
        (window as any).newrelic.interaction().end();
      }
      if ((window as any).appboy) {
        (window as any).appboy.changeUser(profile.identifier);
      }
    });
  }

  protected checkGame(campaign: ICampaign): void {
    this.gameService.getGamesFromCampaign(campaign)
      .pipe(
        filter(games => games.length > 0),
        map(games => games[0])
      )
      .subscribe(
        (game: IGame) => {
          this.game = game;
          const data = {
            imageUrl: './assets/tap-tap.png',
            text: campaign.name, // You’ve got a “Shake the Tree” reward!
            buttonTxt: 'Play now',
            afterClosedCallBack: this,
          };
          this.analytics.addEvent({
            pageType: PageType.overlay,
            pageName: campaign.name
          });
          this.putIdInStorage(campaign.id);
          this.dialog.open(RewardPopupComponent, { data });
        },
        () => {
          // nothing to do here, just fail silently
        }
      );
  }

  private putIdInStorage(id: number): void {
    const ids: number[] = this.idsInStorage;
    ids.push(id);
    this.tokenStorage.setAppInfoProperty(JSON.stringify(ids), 'campaignIdsPopup');
  }

  private get idsInStorage(): number[] {
    const campaignIdsInLocalStorage = this.tokenStorage.getAppInfoProperty('campaignIdsPopup');
    return campaignIdsInLocalStorage ? JSON.parse(campaignIdsInLocalStorage) : [];
  }
}
