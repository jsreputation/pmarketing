import { listAnimation } from '../games-collection/games-collection.animation';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ICampaign } from '@perxtech/core';
import { oc } from 'ts-optchain';

@Component({
  selector: 'perx-blackcomb-pages-campaigns-collection',
  templateUrl: './campaigns-collection.component.html',
  styleUrls: ['./campaigns-collection.component.scss'],
  animations: [listAnimation]
})
export class CampaignsCollectionComponent {
  @Input('campaigns')
  public campaigns$: Observable<ICampaign[]>;
  @Input()
  public defaultNbCampaigns: number = 2;
  @Input()
  public withRewardsCounter: boolean = false;

  public showAllCampaigns: boolean = false;

  @Output()
  public selected: EventEmitter<ICampaign> = new EventEmitter<ICampaign>();

  public selectCampaign(campaign: ICampaign): void {
    this.selected.emit(campaign);
  }

  public getCampaignImage(campaign: ICampaign): string {
    return campaign.campaignBannerUrl ? campaign.campaignBannerUrl : 'https://perx-cdn-staging.s3.amazonaws.com/reward/item/images/35/580b585b2edbce24c47b2415-48075171-3595-4e55-b630-8a00b412dcc4.png';
  }

  public getRewardsCount(campaign: ICampaign): number | undefined {
    if (!campaign.rewards) {
      return;
    }
    return campaign.rewards.reduce((sum, reward) => {
      const balance = oc(reward).inventory.rewardTotalBalance();
      if (balance !== undefined && balance !== null) {
        if (sum !== undefined) {
          // @ts-ignore
          return sum + balance;
        }
        return balance;
      }
      return sum;
    }, undefined);
  }
}
