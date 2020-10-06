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
  public transform(value: number, rewardMode: string, campaignName: string): any {
    switch (rewardMode) {
      case CampaignRewardMode.TransactionQuantity:
        if (campaignName === 'Getting Started' || campaignName === 'Ultimate Reward') {
          return `You've completed <strong>${value}</strong> mission${value > 1 ? 's' : ''}`;
        }
        return `You've made <strong>${value}</strong> Transaction${value > 1 ? 's' : ''}`;
      case CampaignRewardMode.TransactionAmount:
        return `You've transacted <strong>$${value}</strong>`;
      case CampaignRewardMode.Referral:
        return `You've made <strong>${value} referral${value > 1 ? 's' : ''}</strong>`;
      default:
        return `You have made ${value} point${value > 1 ? 's' : ''}`;

    }
    return null;
  }

}
