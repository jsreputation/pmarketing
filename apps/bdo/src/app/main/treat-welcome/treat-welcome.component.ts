import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICampaign, ICampaignService } from '@perxtech/core';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'bdo-treat-welcome',
  templateUrl: './treat-welcome.component.html',
  styleUrls: ['./treat-welcome.component.scss']
})
export class TreatWelcomeComponent implements OnInit{
  lstDeal = [
    1,2,3,4
  ];
  campaign: ICampaign;
  constructor(private campaignService : ICampaignService,private activeRoute: ActivatedRoute){

  }
  ngOnInit(){
    this.activeRoute.params.pipe(switchMap((param) => this.campaignService.getCampaign(param.id))).subscribe( item=>{
      this.campaign = item;
    });
  }
  
}
