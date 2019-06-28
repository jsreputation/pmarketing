import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CampaignService, ICampaign, CAMPAIGN_TYPE } from '@perx/core/dist/perx-core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  campaigns: ICampaign[];

  constructor(
    private router: Router,
    private campaignService: CampaignService
  ) { }

  ngOnInit() {
    this.campaignService.getCampaigns()
      .pipe(
        map(res => res.data),
        map(campaigns => campaigns.filter(camp => camp.campaign_type === CAMPAIGN_TYPE.stamp).slice(0, 1))
      )
      .subscribe(campaigns => {
        this.campaigns = campaigns;
      });
  }

  onRoute(id: string) {
    this.router.navigate([`/voucher/${id}`]);
  }
}
