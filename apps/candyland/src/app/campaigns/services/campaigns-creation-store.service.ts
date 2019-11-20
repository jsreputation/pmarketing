import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ICampaign } from '@cl-core/models/campaign/campaign.interface';

export interface ICampaignChoice {
  title: string;
  value: string;
}
export interface ICampaignConfig {
  typeFilterConfig: ICampaignChoice[];
  durationLimits: ICampaignChoice[];
  days: ICampaignChoice[];
  shortcodes: ICampaignChoice[];
  goals: ICampaignChoice[];
  channelTypes: ICampaignChoice[];
  informationCollectionSettingTypes: ICampaignChoice[];
}

@Injectable()
export class CampaignCreationStoreService {
  public currentCampaign$: BehaviorSubject<ICampaign> = new BehaviorSubject<ICampaign>(null);
  public config: ICampaignConfig = {
    typeFilterConfig: [
      { title: 'All', value: null },
      { title: 'Survey', value: 'Survey' },
      { title: 'Stamp', value: 'Stamp' },
      { title: 'Game', value: 'Game' },
      { title: 'Instant Reward', value: 'Instant Reward' }
    ],
    durationLimits: [
      { title: 'DAY', value: 'day' },
      { title: 'WEEK', value: 'week' },
      { title: 'MONTH', value: 'month' },
      { title: 'CAMPAIGN.CAMPAIGN', value: 'campaign' }
    ],
    days: [
      { title: 'S', value: 'sunday' },
      { title: 'M', value: 'monday' },
      { title: 'T', value: 'tuesday' },
      { title: 'W', value: 'wednesday' },
      { title: 'T', value: 'thursday' },
      { title: 'F', value: 'friday' },
      { title: 'S', value: 'Saturday' },
    ],
    shortcodes: [
      { title: 'Campaign Url', value: '[campaignUrl]' },
      { title: 'User ID', value: '[userId]' },
      { title: 'First name', value: '[userFirstName]' },
      { title: 'Last name', value: '[userLastName]' },
      { title: 'Salutation', value: '[salutation]' },
    ],
    goals: [
      { title: 'Build awareness', value: 'Build awareness' },
      { title: 'Acquire customers', value: 'Acquire customers' },
      { title: 'Drive sales', value: 'Drive sales' },
      { title: 'Re-engage audience', value: 'Re-engage audience' },
      { title: 'Surprise & Delight', value: 'Surprise & Delight' },
    ],
    channelTypes: [
      { title: 'CAMPAIGN.ChannelTypes.WEBLINK', value: 'weblink' },
      { title: 'CAMPAIGN.ChannelTypes.SMS', value: 'sms' },
    ],
    informationCollectionSettingTypes: [
      { title: 'CAMPAIGN.InformationCollectionSettingTypes.NO_INFORMATION', value: 'not_required' },
      { title: 'CAMPAIGN.InformationCollectionSettingTypes.PI_INFORMATION', value: 'pi_required' },
      { title: 'CAMPAIGN.InformationCollectionSettingTypes.SIGNUP_INFORMATION', value: 'signup_required' },
    ]
  };

  public set currentCampaign(value: ICampaign) {
    this.currentCampaign$.next(value);
  }

  public get currentCampaign(): ICampaign {
    return this.currentCampaign$.value ? this.currentCampaign$.value : {};
  }

  public updateCampaign(value: ICampaign): void {
    if ('rewards' in value) {
      this.currentCampaign.rewards = value.rewards;
    }
    this.currentCampaign = Object.assign(this.currentCampaign, value);
  }

  public resetCampaign(): void {
    this.currentCampaign = {};
  }

  public initCampaign(value: ICampaign): void {
    this.currentCampaign = Object.assign({}, value);
  }

  public get template$(): any {
    return this.currentCampaign$
      .pipe(
        filter((value: ICampaign) => value && value.template),
        map(value => value.template)
      );
  }

}
