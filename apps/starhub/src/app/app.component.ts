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
} from '@perx/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RewardPopupComponent } from './reward-popup/reward-popup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, PopUpClosedCallBack {
  public selectedCampaign: ICampaign;

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
      .subscribe((campaigns: ICampaign[]) => {
        if (campaigns.length > 0) {
          campaigns.map(
            (campaign: ICampaign) => {
              if (campaign.type === 'give_reward') {
                // TODO : Use rewardService to fetch reward first.
                const data = {
                  text: campaign.name,
                  imageUrl: 'assets/reward.png',
                  buttonTxt: 'Claim!',
                  rewardId: 1, // TODO: To be replaced with actual 'rewardId'
                  afterClosedCallBack: this,
                  validTo: new Date('2019-08-30T03:24:00')  // TODO: replace this date with reward.validTo
                };
                this.dialog.open(RewardPopupComponent, { data });
              }
            }
          );

          if (campaigns[0].type === 'game') {
            this.selectedCampaign = campaigns[0];
            this.notificationService.addPopup({
              imageUrl: './assets/shake.png',
              text: campaigns[0].name, // You’ve got a “Shake the Tree” reward!
              buttonTxt: 'Play now',
              afterClosedCallBack: this,
            });
          }

        } else {
          this.notificationService.addPopup({
            title: 'Got no campaign',
            text: 'Try again another day'
          });
        }
    });
  }

  public dialogClosed(): void {
    this.router.navigate(['/game'], { queryParams: { id: this.selectedCampaign.id } });
  }
}
