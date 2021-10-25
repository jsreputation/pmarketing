import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICampaign, ICampaignRule, ICampaignService } from '@perxtech/core';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'bdo-treat-welcome',
  templateUrl: './treat-welcome.component.html',
  styleUrls: ['./treat-welcome.component.scss'],
})
export class TreatWelcomeComponent implements OnInit {
  lstDeal = [1, 2, 3, 4];
  campaign: ICampaign;
  lstCampaignRule: ICampaignRule[];
  constructor(
    private campaignService: ICampaignService,
    private activeRoute: ActivatedRoute
  ) {}
  ngOnInit() {
    this.activeRoute.params.subscribe((param) => {
      combineLatest([
        this.campaignService.getCampaign(param.id),
        this.campaignService.getCampaignsRules(param.id),
      ]).subscribe(([campaign, campaignRule]) => {
        this.lstCampaignRule = campaignRule
        this.campaign = campaign;
      });
    });
  }
}
