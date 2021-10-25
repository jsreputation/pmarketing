import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICampaignRule, ICampaignService } from '@perxtech/core';

@Component({
  selector: 'bdo-treat-welcome',
  templateUrl: './treat-welcome.component.html',
  styleUrls: ['./treat-welcome.component.scss']
})
export class TreatWelcomeComponent {
  lstCampaignRule: ICampaignRule[];
  constructor(private campaignService:ICampaignService,private activeRoute: ActivatedRoute){}
  ngOnInit() : void{
    this.activeRoute.params.subscribe((param) => {
      this.campaignService.getCampaignsRules(param.id).subscribe(item=>{
        this.lstCampaignRule = item;
       });
    })
  }
  lstDeal = [
    1,2,3,4
  ];

}
