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
      { title: 'CAMPAIGN.CAMPAIGN_LIMIT', value: 'campaign' }
    ],
    goals: [
      { title: 'CAMPAIGN.BUILD_AWARE', value: 'Build awareness' },
      { title: 'CAMPAIGN.ACQUIRE_CUST', value: 'Acquire customers' },
      { title: 'CAMPAIGN.DRIVE_SALES', value: 'Drive sales' },
      { title: 'CAMPAIGN.REENGAGE_AUD', value: 'Re-engage audience' },
      { title: 'CAMPAIGN.SURPRISE_DELIGHT', value: 'Surprise & Delight' },
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
      { title: 'CAMPAIGN.URL', value: '[campaignUrl]' },
      { title: 'CAMPAIGN.USER_ID', value: '[userId]' },
      { title: 'CAMPAIGN.FIRST_NAME', value: '[userFirstName]' },
      { title: 'CAMPAIGN.LAST_NAME', value: '[userLastName]' },
      { title: 'CAMPAIGN.SALUTATION', value: '[salutation]' },
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
