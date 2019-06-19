import { Component, OnInit } from '@angular/core';
import { CampaignService, ICampaignsResponse, CAMPAIGN_TYPE, ICampaign, TRANSACTION_STATE } from '@perx/core/dist/perx-core';
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.scss']
})
export class DrawComponent implements OnInit {
  n = null;
  campaignId = 41;
  cardId = null;

  constructor(private campaignService: CampaignService) { }

  ngOnInit() {
    // this.campaignService.getCampaigns()
    //   .pipe(
    //     map((data: ICampaignsResponse) => data.data.filter(c => c.campaign_type === CAMPAIGN_TYPE.stamp)),
    //     map((campaigns: ICampaign[]) => campaigns[0]),
    //     switchMap((campaign: ICampaign) => this.campaignService.getCurrentCard(campaign.id))
    //   )
    //   .subscribe(cards => console.log(cards));
    this.campaignService.getCurrentCard(41)
      // .pipe(
      //   tap(card => console.log(card))
      // )
      .subscribe(card => {
        this.n = card.data.stamps.filter(stamp => stamp.state === TRANSACTION_STATE.issued).length;
        this.cardId = card.data.id;
      });
  }
}
