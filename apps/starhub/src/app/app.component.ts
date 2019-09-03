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
        map((campaigns: ICampaign[]) => campaigns.filter(camp => camp.type === CampaignType.give_reward)),
        map(campaigns => campaigns[0]),
        switchMap((campaign: ICampaign) => this.campaignService.getCampaign(campaign.id))
      )
      .subscribe(
        (campaign: ICampaign) => {
          if (campaign.rewards.length > 0) {
            this.reward = campaign.rewards[0];
            if (campaign.type === 'give_reward') {
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
        }
      );
  }

  public dialogClosed(): void {
    this.router.navigate(['/reward'], { queryParams: { id: this.reward.id } });
  }
}
