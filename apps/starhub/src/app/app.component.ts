import { Component, OnInit } from '@angular/core';
import {
  AuthenticationService,
  NotificationService,
  PopupComponent,
  IPopupConfig,
  ICampaign,
  IGameService,
  IGame,
  TokenStorage,
  ThemesService,
  ITheme
} from '@perx/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Params } from '@angular/router';
import { RewardPopupComponent } from './reward-popup/reward-popup.component';
import { filter, map } from 'rxjs/operators';
import { AnalyticsService, IEvent, PageType } from './analytics.service';

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

  constructor(
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private activeRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private gameService: IGameService,
    private tokenStorage: TokenStorage,
    private analytics: AnalyticsService,
    private themeService: ThemesService
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
    this.themeService.getThemeSetting().subscribe((theme) => this.theme = theme);
    this.notificationService.$popup
      .subscribe((data: IPopupConfig) =>
        this.dialog.open(PopupComponent, {
          data, ...data.panelClass && { panelClass: data.panelClass }
        }));

    this.notificationService.$snack.subscribe((msg: string) => this.snackBar.open(msg, 'x', { duration: 2000 }));

    this.activeRoute.queryParams
      .pipe(
        filter((params: Params) => params.token),
        map((params: Params) => params.token)
      )
      .subscribe((token: string) => {
        this.authenticationService.saveUserAccessToken(token);
      });

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
  }

  protected checkGame(campaign: ICampaign): void {
    this.gameService.getGamesFromCampaign(campaign.id)
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
        () => { /* nothing to do here, just fail silently */ }
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
