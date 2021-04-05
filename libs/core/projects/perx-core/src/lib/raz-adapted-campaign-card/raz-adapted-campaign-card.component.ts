import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICampaign, ProgressBarFields } from '../campaign/models/campaign.model';

@Component({
  selector: 'perx-core-raz-adapted-campaign-card',
  templateUrl: './raz-adapted-campaign-card.component.html',
  styleUrls: ['./raz-adapted-campaign-card.component.scss'],

})
export class RazAdaptedCampaignCardComponent {
  @Input()
  public showProgressLabels: boolean = false;

  @Input()
  public campaigns: (ICampaign & {progress?: ProgressBarFields})[];

  @Output()
  public clicked: EventEmitter<ICampaign> = new EventEmitter();

  public getCampaignImage(campaign: ICampaign): string {
    return campaign.thumbnailUrl ? campaign.thumbnailUrl :
      (campaign.campaignBannerUrl || 'https://perx-cdn-staging.s3.amazonaws.com/reward/item/images/35/580b585b2edbce24c47b2415-48075171-3595-4e55-b630-8a00b412dcc4.png');
  }

  public emitValue(campaign: ICampaign): void {
    this.clicked.emit(campaign);
  }

}
