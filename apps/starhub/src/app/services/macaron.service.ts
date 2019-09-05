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
    const sellingFrom = reward.sellingFrom;
    const validToDate = reward.validTo;

    const nowTime: number = (new Date()).getTime();
    if (reward.sellingFrom && sellingFrom.getTime() < nowTime) {
      return {
        label: 'Coming Soon',
        class: 'coming-soon',
        isButtonEnabled: false
      };
    }

    // some of the reward balance is negative value
    let ratio: number | null = null;
    if (reward.inventory &&
      reward.inventory.rewardTotalBalance &&
      reward.inventory.rewardTotalLimit &&
      reward.inventory.rewardTotalLimit !== 0) {
      ratio = reward.inventory.rewardTotalBalance / reward.inventory.rewardTotalLimit;
    }

    if (ratio !== null && ratio <= 0) {
      return {
        label: 'Fully redeemed',
        class: 'fully-redeemed',
        isButtonEnabled: false
      };
    }

    if (reward.validTo && validToDate.getTime() < nowTime) {
      return {
        label: 'Expired',
        class: 'expired',
        isButtonEnabled: false
      };
    }

    // Low inventory (<10%)
    if (ratio !== null && ratio < 0.1) {
      return {
        label: 'Running Out',
        class: 'running-out',
        rewardBalance: reward.inventory.rewardTotalBalance,
        isButtonEnabled: true
      };
    }

    const thirtySixHours = 36 * 60 * 1000;
    if (reward.validTo && (validToDate.getTime() - nowTime) < thirtySixHours) {
      return {
        label: 'Expiring Soon',
        class: 'expiring',
        isButtonEnabled: true
      };
    }

    const seventyTwoHours = 72 * 60 * 1000;
    if (reward.sellingFrom && (nowTime - sellingFrom.getTime()) < seventyTwoHours) {
      return {
        label: 'Just Added',
        class: 'just-added',
        isButtonEnabled: true
      };
    }
    return null;
  }
}
