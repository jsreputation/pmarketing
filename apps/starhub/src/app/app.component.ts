import { Component, OnInit } from '@angular/core';
import {
  AuthenticationService,
  NotificationService,
  PopupComponent,
  IPopupConfig,
  PopUpClosedCallBack,
  ProfileService,
  CampaignService,
  ICampaign,
  CampaignType,
  IReward
} from '@perx/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RewardPopupComponent } from './reward-popup/reward-popup.component';
import { map, switchMap } from 'rxjs/operators';

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
    private profileService: ProfileService,
    private activeRoute: ActivatedRoute,
    private campaignService: CampaignService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.notificationService.$popup.subscribe((data: IPopupConfig) => {
      this.dialog.open(PopupComponent, { data });
    });

    this.activeRoute.queryParams.subscribe((params: Params) => {
      if (params.token) {
        this.authenticationService.saveUserAccessToken(params.token);
        this.getCurrent();
      }
    });
  }

  private getCurrent(): void {
    this.profileService.whoAmI()
      .subscribe(
        () => this.fetchCampaign(),
        () => { }
      );
  }

  private fetchCampaign(): void {
    this.campaignService.getCampaigns()
      .pipe(
        map((campaigns: ICampaign[]) => campaigns[0]),
        switchMap((campaign: ICampaign) => this.campaignService.getCampaign(campaign.id))
      )
      .subscribe(
        (campaign: ICampaign) => {
          this.selectedCampaign = campaign;
          if (campaign.type === 'give_reward') {
            this.reward = campaign.rewards[0];
            if (campaign.rewards.length > 0) {
                const data = {
                  text: campaign.name,
                  imageUrl: 'assets/reward.png',
                  buttonTxt: 'Claim!',
                  rewardId: this.reward.id,
                  afterClosedCallBack: this,
                  validTo: new Date(campaign.endsAt)
                };
                this.dialog.open(RewardPopupComponent, { data });
              }
          }

          if (campaign.type === CampaignType.game) {
            this.selectedCampaign = campaign;
            const data = {
              imageUrl: './assets/shake.png',
              text: campaign.name, // You’ve got a “Shake the Tree” reward!
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
    let page: string;
    switch (campaignType) {
      case 'give_reward':
        page = 'reward';
        break;

      case 'game':
        page = 'game';
        break;

      default:
        break;
    }
    this.router.navigate([`/${page}`], { queryParams: { id: this.selectedCampaign.id } });
  }

}
