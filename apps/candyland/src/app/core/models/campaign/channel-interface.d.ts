declare interface IChannel {
  webNotification: {
    webLink: boolean;
    webLinkOptions: string;
    id: string;
  };
  sms: boolean;
  launch: ICampaignNotificationGroup[];
  completed: ICampaignNotificationGroup[];
  campaignEnds: ICampaignNotificationGroup[];
  rewardExpires?: any[];
  noStampsReward?: any[];
  earnedStamp?: any[];
  earnedReward?: any[];
}

declare interface ICampaignNotificationGroup {
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

declare interface ITemplate {
  message: string;
  templateId: string;
}
