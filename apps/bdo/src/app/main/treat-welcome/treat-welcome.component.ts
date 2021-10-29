import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ICampaign,
  ICampaignRule,
  ICampaignService,
  IReward
} from '@perxtech/core';
import { combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'bdo-treat-welcome',
  templateUrl: './treat-welcome.component.html',
  styleUrls: ['./treat-welcome.component.scss'],
})
export class TreatWelcomeComponent implements OnInit {
  lstDeal = [1, 2, 3, 4];
  defaultImageUrl = 'assets/images/light-gray-color-default-image.png';
  campaign: ICampaign;
  lstCampaignRule: ICampaignRule[];
  public rewards: IReward[];
  constructor(
    private campaignService: ICampaignService,
    private activeRoute: ActivatedRoute,
    private route: Router,
  ) {}
  ngOnInit() {
    this.activeRoute.params
      .pipe(
        switchMap((param) =>
          combineLatest(
            this.campaignService.getCampaign(param.id),
            this.campaignService.getCampaignsRules(param.id)
          )
        )
      )
      .subscribe(([campaign, campaignRule]) => {
        this.lstCampaignRule = campaignRule;
        this.campaign = campaign;
        console.log('cam', this.campaign);
      });
  }
  navigateEnrollPage() {
    this.route.navigate([`treat-enroll/${this.campaign.id}`]);
  }
}
