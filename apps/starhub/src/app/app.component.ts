import { Component, OnInit } from '@angular/core';
import {
  AuthenticationService,
  NotificationService,
  PopupComponent,
  IPopupConfig,
  PopUpClosedCallBack,
  ICampaignService,
  ICampaign,
  CampaignType,
  IReward,
  IGameService,
  IGame,
  TokenStorage,
  ThemesService,
  ITheme
} from '@perx/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RewardPopupComponent } from './reward-popup/reward-popup.component';
import { switchMap, filter, map, catchError } from 'rxjs/operators';
import { combineLatest, of } from 'rxjs';
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
export class AppComponent implements OnInit, PopUpClosedCallBack {
  // public selectedCampaign: ICampaign;
  public reward?: IReward;
  public game?: IGame;
  private token: string;
  public theme: ITheme;
  private firstComefirstServeCampaign: ICampaign;

  constructor(
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private activeRoute: ActivatedRoute,
    private campaignService: ICampaignService,
    private dialog: MatDialog,
    private router: Router,
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
    this.authenticationService.getAccessToken().subscribe((token: string) => {
      this.token = token;
      if (this.token) {
        this.checkAuth();
      }
      this.data.perxID = this.token;
    });
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
        this.getAccessToken();

        if (typeof _satellite === 'undefined') {
          return;
        }
        _satellite.track('msa-rewards-virtual-page');
      }
    );
  }

  private getAccessToken(): void {
    this.authenticationService.getAccessToken().subscribe((token: string) => {
      this.token = token;
      if (this.token) {
        this.checkAuth();
      }
      this.data.perxID = this.token;
    });
  }

  private checkAuth(): void {
    this.authenticationService.isAuthorized().subscribe((isAuth: boolean) => {
      if (isAuth) {
        this.fetchPopupCampaigns();
      }
    });
  }

  private fetchPopupCampaigns(): void {
    this.campaignService.getCampaigns()
      .pipe(
        catchError(() => {
          this.router.navigateByUrl('error');
          return of([]);
        })
      )
      .pipe(
        // for each campaign, get detailed version
        switchMap((campaigns: ICampaign[]) => combineLatest(...campaigns.map(campaign => this.campaignService.getCampaign(campaign.id)))),
        map((campaigns: ICampaign[]) => campaigns.filter(c => !this.idExistsInStorage(c.id)))
      )
      .subscribe(
        (campaigns: ICampaign[]) => {
          const firstComeFirstServed: ICampaign[] = campaigns
            .filter(campaign => campaign.type === CampaignType.give_reward);
          // if there is a 1st come 1st served campaign and it has rewards, display the popup
          if (firstComeFirstServed.length > 0) {
            this.firstComefirstServeCampaign = firstComeFirstServed[0];
            // @ts-ignore
            // this.reward = campaign.rewards[0];

            const data = {
              text: this.firstComefirstServeCampaign.name,
              imageUrl: 'assets/reward.png',
              buttonTxt: 'Claim!',
              // rewardId: this.reward.id,
              afterClosedCallBack: this,
              // @ts-ignore
              validTo: new Date(this.firstComefirstServeCampaign.endsAt)
            };
            this.dialog.open(RewardPopupComponent, { data });
            this.analytics.addEvent({
              pageType: PageType.overlay,
              pageName: this.firstComefirstServeCampaign.name
            });
            return;
          }

          // else if there is a game campaign, display the popup
          const gameCampaign: ICampaign | undefined = campaigns.find(campaign => campaign.type === CampaignType.game);
          if (gameCampaign) {
            this.checkGame(gameCampaign);
          }
        },
        () => {
          // no campaign that is popup eligible. fail silently.
        }
      );
  }

  private checkGame(campaign: ICampaign): void {
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
          this.dialog.open(RewardPopupComponent, { data });
        },
        () => { /* nothing to do here, just fail silently */ }
      );
  }

  public dialogClosed(): void {
    if (this.game) {
      this.router.navigate([`/game`], { queryParams: { id: this.game.id } });
    } else {
      this.campaignService.issueAll(this.firstComefirstServeCampaign.id).subscribe(
        () => {
          this.router.navigate([`/home/vouchers`]);
        }
      );
    // } else {
    //   console.error('Something fishy, we should not be here, without any reward or game');
    }
  }

  protected idExistsInStorage(id: number): boolean {
    const campaignIdsInLocalStorage = this.tokenStorage.getAppInfoProperty('campaignIdsPopup');
    const ids: number[] = campaignIdsInLocalStorage ? JSON.parse(campaignIdsInLocalStorage) : [];

    if (ids.includes(id)) {
      return true;
    }

    ids.push(id);
    this.tokenStorage.setAppInfoProperty(JSON.stringify(ids), 'campaignIdsPopup');
    return false;
  }
}
