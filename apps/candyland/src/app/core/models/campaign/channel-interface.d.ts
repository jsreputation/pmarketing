import { InformationCollectionSettingType } from './campaign.enum';

export interface IChannel {
  webNotification: {
    webLink: boolean;
    webLinkOptions: InformationCollectionSettingType;
    id?: string;
  };
  sms: boolean;
  launch?: ICampaignNotificationGroup[];
  completed?: ICampaignNotificationGroup[];
  campaignEnds?: ICampaignNotificationGroup[];
  rewardExpires?: any[];
  noStampsReward?: any[];
  earnedStamp?: any[];
  earnedReward?: any[];
}

export interface ICampaignNotificationGroup {
  id: string;
  sentType: string;
  template: ITemplate;
  campaignId: string;
  numberPeriod?: string;
  type?: string;
  time?: string;
  channel?: any;
  templateId?: string;
  birthdayTime?: string;
  launchDateTime?: string;
  monthDay?: string;
}

export interface ITemplate {
  message: string;
  templateId: string;
}
