import { WEngagementType } from '../public-api';

export interface IWRewardDisplayProperties {
  merchantPinText?: IWProperties;
  rewardSuccessPopUp?: IWProperties;
  codeInstructionsText?: IWProperties;
  errorPopUp?: IWProperties;
  CTAButtonTxt?: string;
}

export interface IWCampaignDisplayProperties {
  noRewardsPopUp?: IWProperties;
  successPopUp?: IWProperties;
}

export interface IWProperties {
  headLine?: string;
  subHeadLine?: string;
  imageURL?: string;
  buttonTxt?: string;
}

export interface IWAttbsObjEntity {
  urn: string;
  created_at: string;
  updated_at: string;
  name: string;
  status: string;
  goal: null;
  start_date_time: null;
  end_date_time: null;
  comm_channel: null;
  engagement_type: WEngagementType;
  engagement_id: number;
  pool_id: null;
  display_properties?: IWCampaignDisplayProperties;
}
