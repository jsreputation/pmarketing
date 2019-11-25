import { Injectable } from '@angular/core';
import {ICampaign, IReward} from '@perx/core';

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
    if (sellingFrom && sellingFrom.getTime() > nowTime) {
      return {
        label: 'Coming Soon',
        class: 'coming-soon',
        isButtonEnabled: false
      };
    }

    // some of the reward balance is negative value
    let ratio: number | null = null;
    if (reward.inventory &&
      reward.inventory.rewardTotalBalance !== undefined &&
      reward.inventory.rewardTotalBalance !== null &&
      reward.inventory.rewardTotalLimit !== undefined &&
      reward.inventory.rewardTotalLimit !== null &&
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

    if (validToDate && validToDate.getTime() < nowTime) {
      return {
        label: 'Expired',
        class: 'expired',
        isButtonEnabled: true
      };
    }

    // Low inventory (<10%)
    if (ratio !== null && ratio <= 0.1) {
      return {
        label: 'Running out',
        class: 'running-out',
        rewardBalance: reward.inventory && reward.inventory.rewardTotalBalance || undefined,
        isButtonEnabled: true
      };
    }

    const thirtySixHours = 36 * 60 * 60 * 1000;
    if (validToDate && (validToDate.getTime() - nowTime) < thirtySixHours) {
      return {
        label: 'Expiring Soon',
        class: 'expiring',
        isButtonEnabled: true
      };
    }

    const seventyTwoHours = 72 * 60 * 60 * 1000;
    if (sellingFrom && (nowTime - sellingFrom.getTime()) < seventyTwoHours) {
      return {
        label: 'Just added',
        class: 'just-added',
        isButtonEnabled: true
      };
    }
    return null;
  }

  public getCampaignMacaron(campaign: ICampaign): IMacaron | null {
    const currentDate = new Date();
    const isComingSoon = campaign.beginsAt && campaign.beginsAt.getTime() > currentDate.getTime();
    if (isComingSoon) {
      return {
        label: 'Coming Soon',
        class: 'coming-soon',
        isButtonEnabled: false
      };
    }
    return null;
  }
}
