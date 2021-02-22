import { Injectable } from '@angular/core';
import { IMacaron } from './models/macaron.model';
import { IReward } from '../rewards/models/reward.model';
import { ICampaign } from '../campaign/models/campaign.model';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MacaronService {
  public comingSoonTxt: string = '';
  public fullyRedeemedTxt: string = '';
  public expiredTxt: string = '';
  public expiringTxt: string = '';
  public balanceTxt: string = '';

  constructor(private translateService: TranslateService) {
    combineLatest([
      this.translateService.get('MACARON.BALANCE'),
      this.translateService.get('MACARON.COMING_SOON'),
      this.translateService.get('MACARON.EXPIRED'),
      this.translateService.get('MACARON.EXPIRING'),
      this.translateService.get('MACARON.FULLY_REDEEMED')])
      .subscribe(
        ([balance, comingSoon, expired, expiring, fullyRedeemed]) => {
          this.balanceTxt = balance;
          this.comingSoonTxt = comingSoon;
          this.expiredTxt = expired;
          this.expiringTxt = expiring;
          this.fullyRedeemedTxt = fullyRedeemed;
        }
      );
  }

  public getMacaron(reward: IReward): IMacaron | null {
    const sellingFrom = reward.sellingFrom;
    const validToDate = reward.validTo;

    const nowTime: number = (new Date()).getTime();
    if (sellingFrom && sellingFrom.getTime() > nowTime) {
      return {
        label: this.comingSoonTxt,
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
        label: this.fullyRedeemedTxt,
        class: 'fully-redeemed',
        isButtonEnabled: false
      };
    }

    if (validToDate && validToDate.getTime() < nowTime) {
      // console.log(validToDate, validToDate.getTime(), nowTime);
      return {
        label: this.expiredTxt,
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
        reward.inventory.rewardLimitPerUserPerPeriodBalance)) {

      // isInteger returns false when provided with null/undef so we force the compiler to ignore
      const lowestBalance = Math.min(
        // @ts-ignore
        Number.isInteger(reward.inventory.rewardTotalBalance) ?
          reward.inventory.rewardTotalBalance : Infinity,
        // @ts-ignore
        Number.isInteger(reward.inventory.rewardLimitPerUserPerPeriodBalance) ?
          reward.inventory.rewardLimitPerUserPerPeriodBalance : Infinity);

      if (lowestBalance === 0) {
        return {
          label: this.fullyRedeemedTxt,
          class: 'fully-redeemed',
          isButtonEnabled: false
        };
      }

      return {
        label: `${this.balanceTxt.replace('{{amount}}', lowestBalance.toString(10))}`,
        class: 'balance',
        isButtonEnabled: true
      };
    }


    const thirtySixHours = 36 * 60 * 60 * 1000;
    if (validToDate && (validToDate.getTime() - nowTime) < thirtySixHours) {
      return {
        label: this.expiringTxt,
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
        label: this.comingSoonTxt,
        class: 'coming-soon',
        isButtonEnabled: false
      };
    }
    return null;
  }
}
