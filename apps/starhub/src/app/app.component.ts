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
  TokenStorage
} from '@perx/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RewardPopupComponent } from './reward-popup/reward-popup.component';
import { switchMap, filter, map, catchError } from 'rxjs/operators';
import { combineLatest, of } from 'rxjs';
import { AnalyticsService, IEvent } from './analytics.service';

export interface IdataLayerSH {
  pageName: string;
  channel: string;
  pageType: string;
  siteSectionLevel1: string;
  siteSectionLevel2: string;
  siteSectionLevel3: string;
  hubID: string;
  perxID: string;
  loginStatus: boolean;
}

const dataLayerSH: IdataLayerSH = {
  pageName: '',
  channel: 'msa',
  pageType: '',
  siteSectionLevel1: 'rewards',
  siteSectionLevel2: '',
  siteSectionLevel3: '',
  hubID: '',
  perxID: '',
  loginStatus: true
};

declare var _satellite: {
  track: (ev: string) => void;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, PopUpClosedCallBack {
  // public selectedCampaign: ICampaign;
  private reward: IReward = null;
  private game: IGame = null;

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
    private analytics: AnalyticsService
  ) { }

  public ngOnInit(): void {
    this.notificationService.$popup.subscribe((data: IPopupConfig) => this.dialog.open(PopupComponent, { data }));

    this.notificationService.$snack.subscribe((msg: string) => this.snackBar.open(msg, 'x', { duration: 2000 }));

    this.activeRoute.queryParams
      .pipe(filter((params: Params) => params.token))
      .subscribe((params: Params) => {
        this.authenticationService.saveUserAccessToken(params.token);
        this.fetchCampaigns();
      });

    this.analytics.events$.subscribe(
      (event: IEvent) => {
        dataLayerSH.pageName = event.pageName;
        dataLayerSH.pageType = event.pageType;
        dataLayerSH.siteSectionLevel2 = event.siteSectionLevel2;
        dataLayerSH.siteSectionLevel3 = event.siteSectionLevel3;

        const token = 'todo';
        dataLayerSH.hubID = token;
        dataLayerSH.perxID = token;
        _satellite.track('msa-rewards-virtual-page');
      }
    );
  }

  private fetchCampaigns(): void {
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
            .filter(campaign => campaign.type === CampaignType.give_reward)
            .filter(campaign => campaign.rewards && campaign.rewards.length > 0);
          // if there is a 1st come 1st served campaign and it has rewards, display the popup
          if (firstComeFirstServed.length > 0) {
            const campaign = firstComeFirstServed[0];
            this.reward = campaign.rewards[0];

            const data = {
              text: campaign.name,
              imageUrl: 'assets/reward.png',
              buttonTxt: 'Claim!',
              rewardId: this.reward.id,
              afterClosedCallBack: this,
              validTo: new Date(campaign.endsAt)
            };
            this.dialog.open(RewardPopupComponent, { data });
            return;
          }

          // else if there is a game campaign, display the popup
          const gameCampaign: ICampaign | undefined = campaigns.find(campaign => campaign.type === CampaignType.game);
          if (gameCampaign) {
            this.checkGame(gameCampaign);
          }
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
          this.dialog.open(RewardPopupComponent, { data });
        },
        () => { /* nothing to do here, just fail silently */ }
      );
  }

  public dialogClosed(): void {
    if (this.reward !== null) {
      this.router.navigate([`/reward`], { queryParams: { id: this.reward.id } });
    } else if (this.game !== null) {
      this.router.navigate([`/game`], { queryParams: { id: this.game.id } });
    } else {
      console.error('Something fishy, we should not be here, without any reward or game');
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
