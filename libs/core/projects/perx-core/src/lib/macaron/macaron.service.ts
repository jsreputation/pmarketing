import { Injectable } from '@angular/core';
import { IMacaron } from './models/macaron.model';
import { IReward } from '../rewards/models/reward.model';
import { ICampaign } from '../campaign/models/campaign.model';

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
    let rewardTotalRatio: number | null = null;
    if (reward.inventory &&
      (reward.inventory.rewardTotalBalance &&
        reward.inventory.rewardTotalLimit) &&
      reward.inventory.rewardTotalLimit !== 0) {
      rewardTotalRatio = reward.inventory.rewardTotalBalance / reward.inventory.rewardTotalLimit;
    }

    if (rewardTotalRatio !== null && rewardTotalRatio <= 0) {
      return {
        label: 'Fully redeemed',
        class: 'fully-redeemed',
        isButtonEnabled: false
      };
    }

    if (validToDate && validToDate.getTime() < nowTime) {
      // console.log(validToDate, validToDate.getTime(), nowTime);
      return {
        label: 'Expired',
        class: 'expired',
        isButtonEnabled: true
      };
    }

    // Low inventory (<10%)
    // if (rewardTotalRatio !== null && rewardTotalRatio <= 0.1) {
    //   return {
    //     label: 'Running out',
    //     class: 'running-out',
    //     rewardBalance: reward.inventory && reward.inventory.rewardTotalBalance || undefined,
    //     isButtonEnabled: true
    //   };
    // }

    // show the inventory count
    if (reward.inventory &&
      (reward.inventory.rewardTotalBalance ||
        reward.inventory.rewardLimitPerUserBalance ||
        reward.inventory.rewardLimitPerUserPerPeriodBalance)) {

      // isInteger returns false when provided with null/undef so we force the compiler to ignore
      const lowestBalance = Math.min(
        // @ts-ignore
        Number.isInteger(reward.inventory.rewardLimitPerUserBalance) ?
          reward.inventory.rewardLimitPerUserBalance : Infinity,
        // @ts-ignore
        Number.isInteger(reward.inventory.rewardTotalBalance) ?
          reward.inventory.rewardTotalBalance : Infinity,
        // @ts-ignore
        Number.isInteger(reward.inventory.rewardLimitPerUserPerPeriodBalance) ?
          reward.inventory.rewardLimitPerUserPerPeriodBalance : Infinity);

      if (lowestBalance === 0) {
        return {
          label: 'Fully redeemed1',
          class: 'fully-redeemed',
          isButtonEnabled: false
        };
      }

      return {
        label: `${lowestBalance} left`,
        class: 'balance',
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

    // currently have no requirement for showing newly added rewards
    // const seventyTwoHours = 72 * 60 * 60 * 1000;
    // if (sellingFrom && (nowTime - sellingFrom.getTime()) < seventyTwoHours) {
    //   return {
    //     label: 'Just added',
    //     class: 'just-added',
    //     isButtonEnabled: true
    //   };
    // }
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
