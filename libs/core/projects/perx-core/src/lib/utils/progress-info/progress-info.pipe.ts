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
          return `You've completed <strong>${parseInt(value)}</strong> task${parseInt(value) > 1 ? 's' : ''}`;
        }
        return `You've made <strong>${parseInt(value)}</strong> Transaction${parseInt(value) > 1 ? 's' : ''}`;
      case CampaignRewardMode.TransactionAmount:
        return `You've spent <strong>$${value}</strong>`;
      case CampaignRewardMode.Referral:
        return `You've recruited <strong>${parseInt(value)} user${parseInt(value) > 1 ? 's' : ''}</strong>`;
      default:
        return `You have made ${parseInt(value)} point${+value > 1 ? 's' : ''}`;

    }
    return null;
  }

}
