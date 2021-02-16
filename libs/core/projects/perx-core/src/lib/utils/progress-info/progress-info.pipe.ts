import { Pipe, PipeTransform } from '@angular/core';

export enum CampaignRewardMode {
  TransactionAmount = 'trans-amount',
  TransactionQuantity = 'trans-qty',
  Referral = 'referral'
}

@Pipe({
  name: 'progressInfo',
  pure: true
})
export class ProgressInfoPipe implements PipeTransform {
  public transform(value: string, rewardMode: string, campaignName: string): any {
    switch (rewardMode) {
      case CampaignRewardMode.TransactionQuantity:
        if (campaignName === 'Getting Started' || campaignName === 'Ultimate Reward') {
          return `You've completed <strong>${parseInt(value, 10)}</strong> tasks`;
        }
        return `You've made <strong>${parseInt(value, 10)}</strong> transaction${(+value > 1 || +value === 0) ? 's' : ''}`;
      case CampaignRewardMode.TransactionAmount:
        return `You've spent <strong>$${value}</strong>`;
      case CampaignRewardMode.Referral:
        return `You've recruited <strong>${parseInt(value, 10)} users</strong>`;
      default:
        return `You have made ${parseInt(value, 10)} point${+value > 1 ? 's' : ''}`;

    }
    return null;
  }

}
