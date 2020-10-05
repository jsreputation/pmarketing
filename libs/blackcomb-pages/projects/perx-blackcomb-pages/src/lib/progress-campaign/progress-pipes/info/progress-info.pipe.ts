import { Pipe, PipeTransform } from '@angular/core';
import { CampaignRewardMode } from '../../progress-campaign.component';

@Pipe({
  name: 'progressInfo',
  pure: true
})
export class ProgressInfoPipe implements PipeTransform {
  public transform(value: number, rewardMode: string, campaignName: string): any {
    switch (rewardMode) {
      case CampaignRewardMode.TransactionQuantity:
        if (campaignName === 'Getting Started Task') {
          return `You've completed <strong>${value}</strong> mission`;
        }
        return `You've made <strong>${value}</strong> transactions`;
      case CampaignRewardMode.TransactionAmount:
        return `You've transacted <strong>$${value}</strong>`;
      case CampaignRewardMode.Referral:
        return `You've made <strong>${value} referrals</strong>`;
      default:
        return `You have made ${value} points.`;

    }
    return null;
  }

}
