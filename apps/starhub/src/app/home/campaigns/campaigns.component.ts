import { Component, Output, EventEmitter } from '@angular/core';
import { ICampaign, CampaignType, CampaignState } from '@perx/core';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent {
  public campaigns: ICampaign[];

  @Output()
  public tapped: EventEmitter<ICampaign> = new EventEmitter();

  constructor() {
    this.campaigns = [
      {
        id: 1,
        name: 'Shake the tree',
        description: '....',
        type: CampaignType.game,
        state: CampaignState.active,
        endsAt: '2017-12-17T03:24:00'
      }
    ];
  }

  public selected(campaign: ICampaign): void {
    this.tapped.emit(campaign);
  }
}
