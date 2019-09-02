import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { ICampaign, CampaignType, CampaignService } from '@perx/core';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit {
  public campaigns: ICampaign[];

  @Output()
  public tapped: EventEmitter<ICampaign> = new EventEmitter();

  constructor(
    private campaignService: CampaignService
  ) {}

  public ngOnInit (): void {
    this.campaignService.getCampaigns()
      .subscribe((campaigns: ICampaign[]) => {
        if (campaigns.length > 0) {
          this.campaigns = campaigns.filter((campaign) => campaign.type === CampaignType.game);
        };
      });
  }

  public selected(campaign: ICampaign): void {
    this.tapped.emit(campaign);
  }
}
