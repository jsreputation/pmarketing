import { Component, OnInit } from '@angular/core';
import {
  AuthenticationService,
  NotificationService,
  PopupComponent,
  IPopupConfig,
  PopUpClosedCallBack,
  CampaignService,
  ICampaign,
  CampaignType,
  IReward
} from '@perx/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Params, Router, Event, NavigationEnd } from '@angular/router';
import { RewardPopupComponent } from './reward-popup/reward-popup.component';
import { switchMap, filter } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

declare var dataLayerSH: any;
declare var pageTrack: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, PopUpClosedCallBack {
  public selectedCampaign: ICampaign;
  private reward: IReward;

  constructor(
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private activeRoute: ActivatedRoute,
    private campaignService: CampaignService,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
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

    this.subscribeToRouteChanges();
  }

  private subscribeToRouteChanges(): void {
    this.router.events.subscribe(
      (event: Event) => {
        if (event instanceof NavigationEnd) {
          const eventUrl = event.url;
          console.log(eventUrl);

          // TODO: These are temp values
          // TODO: A map is needed to map values between 'eventUrl' and 'dataLayerSH'
          dataLayerSH.pageName = 'rewards:discover';
          dataLayerSH.pageType = 'landing page';
          dataLayerSH.siteSectionLevel2 = 'rewards:discover';
          dataLayerSH.siteSectionLevel3 = 'rewards:discover';
          dataLayerSH.hubID = 'ZPfW6pgwrG5oSKixBpexJ14LMylsoxrdNXo6nahA8vY';

          pageTrack('msa-rewards-virtual-page');
        }
      }
    );
  }

  private fetchCampaigns(): void {
    this.campaignService.getCampaigns()
      .pipe(
        // for each campaign, get detailed version
        switchMap((campaigns: ICampaign[]) => combineLatest(...campaigns.map(campaign => this.campaignService.getCampaign(campaign.id))))
      )
      .subscribe(
        (campaigns: ICampaign[]) => {
          const firstComeFirstServed: ICampaign[] = campaigns.filter(campaign => campaign.type === CampaignType.give_reward)
            .filter(campaign => campaign.rewards && campaign.rewards.length > 0);
          // if there is a 1st come 1st served campaign and it has rewards, display the popup
          if (firstComeFirstServed.length > 0) {
            this.selectedCampaign = firstComeFirstServed[0];
            this.reward = this.selectedCampaign.rewards[0];
            const data = {
              text: this.selectedCampaign.name,
              imageUrl: 'assets/reward.png',
              buttonTxt: 'Claim!',
              rewardId: this.reward.id,
              afterClosedCallBack: this,
              validTo: new Date(this.selectedCampaign.endsAt)
            };
            this.dialog.open(RewardPopupComponent, { data });
            return;
          }

          // else if there is a game campaign, display the popup
          const gameCampaign: ICampaign | undefined = campaigns.find(campaign => campaign.type === CampaignType.game);
          if (gameCampaign) {
            this.selectedCampaign = gameCampaign;
            const data = {
              imageUrl: './assets/shake.png',
              text: gameCampaign.name, // You’ve got a “Shake the Tree” reward!
              buttonTxt: 'Play now',
              afterClosedCallBack: this,
            };
            this.dialog.open(RewardPopupComponent, { data });
          }
        }
      );
  }

  public dialogClosed(): void {
    const campaignType = this.selectedCampaign.type;
    switch (campaignType) {
      case CampaignType.give_reward:
        this.router.navigate([`/reward`], { queryParams: { id: this.reward.id } });
        return;

      case CampaignType.game:
        this.router.navigate([`/game`], { queryParams: { campaignId: this.selectedCampaign.id } });
        return;
    }
  }
}
