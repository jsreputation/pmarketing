import { Component } from '@angular/core';
import { ICampaignService } from '@perxtech/core';
import { ICampaignRule } from 'libs/core/projects/perx-core/src/lib/campaign/models/campaign.model';

@Component({
  selector: 'bdo-treat-welcome',
  templateUrl: './treat-welcome.component.html',
  styleUrls: ['./treat-welcome.component.scss']
})
export class TreatWelcomeComponent {
  lstCampaignRule: ICampaignRule[];
  constructor(private campaignService:ICampaignService){}
  ngOnInit() {
    this.campaignService.getCampaignsRules(1).subscribe(item=>{
     this.lstCampaignRule = item;
    });
  }
  lstDeal = [
    1,2,3,4
  ];

}
