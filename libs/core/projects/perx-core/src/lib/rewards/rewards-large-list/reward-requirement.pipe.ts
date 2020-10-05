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
        return `Make ${value} Transaction${value > 1? 's' : ''}`;
      case CampaignRewardMode.TransactionAmount:
        return `Transact at least $${value}`;
      case CampaignRewardMode.Referral:
        return `Make ${value} referral${value > 1? 's' : ''}`;
      default:
        return `Require: ${value} points`;
    }
  }

}
