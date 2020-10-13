import { Pipe, PipeTransform } from '@angular/core';
import { CampaignRewardMode } from './rewards-large-list.component';

@Pipe({
  name: 'progressRequire',
  pure: true
})
export class ProgressRequirePipe implements PipeTransform {
  public transform(value: number, rewardMode: string): any {
    switch (rewardMode) {
      case CampaignRewardMode.TransactionQuantity:
        return `${value} transaction${value > 1 ? 's' : ''}`;
      case CampaignRewardMode.TransactionAmount:
        return `Spend $${value}`;
      case CampaignRewardMode.Referral:
        return `${value} referral${value > 1 ? 's' : ''}`;
      default:
        return '';
    }
  }

}
