import { Injectable } from '@angular/core';
import { IReward } from '@perx/core';

export interface IMacaron {
  label: string;
  class: string;
  rewardBalance?: number;
  isButtonEnabled: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MacaronService {

  public getMacaron(reward: IReward): IMacaron | null {
    const validFromDate = (new Date(reward.validFrom));
    const validToDate = (new Date(reward.validTo));

    const nowTime: number = (new Date()).getTime();
    if (reward.validFrom && (validFromDate).getTime() < nowTime) {
      return {
        label: 'Coming Soon',
        class: 'coming-soon',
        isButtonEnabled: false
      };
    }

    // some of the reward balance is negative value
    const ratio: number = reward.inventory.rewardTotalBalance / reward.inventory.rewardTotalLimit;
    const inventory: number = reward.inventory.rewardTotalBalance < 0 ? 0 : ratio;

    if (inventory === 0) {
      return {
        label: 'Fully redeemed',
        class: 'fully-redeemed',
        isButtonEnabled: false
      };
    }

    if (reward.validTo && (validToDate).getTime() < nowTime) {
      return {
        label: 'Expired',
        class: 'expired',
        isButtonEnabled: false
      };
    }

    // Low inventory (<10%)
    if (inventory < 0.1) {
      return {
        label: 'Running Out',
        class: 'running-out',
        rewardBalance: reward.inventory.rewardTotalBalance,
        isButtonEnabled: true
      };
    }

    const thirtySixHours = 36 * 60 * 1000;
    if (reward.validTo && ((validToDate).getTime() - nowTime) < thirtySixHours) {
      return {
        label: 'Expiring Soon',
        class: 'expiring',
        isButtonEnabled: true
      };
    }

    const seventyTwoHours = 72 * 60 * 1000;
    if (reward.validFrom && (seventyTwoHours - (validFromDate).getTime())) {

      return {
        label: 'Just Added',
        class: 'just-added',
        isButtonEnabled: true
      };
    }
    return null;
  }
}
