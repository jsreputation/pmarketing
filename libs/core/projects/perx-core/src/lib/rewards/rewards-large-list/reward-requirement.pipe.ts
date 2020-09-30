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
        return `Make ${value} Transactions`;
      case CampaignRewardMode.TransactionAmount:
        return `Transact at least $${value}`;
      case CampaignRewardMode.Referral:
        return `Make ${value} referrals`;
      default:
        return `Require: ${value} points`;
    }
  }

}
