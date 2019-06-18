import { Component, OnInit } from '@angular/core';
import { CampaignService, ICampaignsResponse, CAMPAIGN_TYPE } from '@perx/core/dist/perx-core';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.scss']
})
export class DrawComponent implements OnInit {
  n = 6;

  constructor(private campaignService: CampaignService) { }

  ngOnInit() {
    this.campaignService.getCampaigns()
      .subscribe((data: ICampaignsResponse) => {
        const campaign = data.data.filter(c => c.campaign_type === CAMPAIGN_TYPE.stamp);
        console.log(campaign);
      });
  }
}
