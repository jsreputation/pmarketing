import { IReferralReward, IReward } from '../../rewards/models/reward.model';
import { WInformationCollectionSettingType, IWProperties } from '@perxtech/whistler';

export interface CampaignDisplayProperties {
  landingPage?: CampaignLandingPage;
  informationCollectionSetting?: WInformationCollectionSettingType;
  weblink?: boolean;
  noRewardsPopUp?: IWProperties;
  successPopUp?: IWProperties;
}

export interface CampaignLandingPage {
  body?: { en: { text: string } };
  media?: { youtube?: string; };
  heading?: { en: { text: string } };
  buttonText?: { en: { text: string } };
  subHeading?: { en: { text: string } };
  backgroundUrl?: string;
}

export enum CampaignType {
  // eslint-disable-next-line
  give_reward = 'give_reward', // instant_outcome
  stamp = 'stamp', // loyalty
  game = 'game',
  survey = 'survey',
  invite = 'invite'
}

export enum CampaignState {
  active = 'active',
  inactive = 'inactive',
  draft = 'draft'
}

export interface CampaignProgress {
  stages: number;
  current: number;
  stageLabels: string|number[];
}

export interface ICampaign {
  id: number;
  name: string;
  description: string | null;
  tnc?: string;
  type: CampaignType;
  subType?: string;
  state: CampaignState;
  endsAt: Date | null;
  beginsAt?: Date | null;
  rewards?: IReward[];
  rewardsCount?: number;
  thumbnailUrl?: string;
  campaignBannerUrl?: string;
  engagementId?: number;
  rawPayload?: any;
  displayProperties?: CampaignDisplayProperties;
  referralCodes?: string[];
  referralRewards?: IReferralReward[];
  refersAttained?: number;
  progress?: CampaignProgress;
}

export enum CommChannel {
  sms = 'sms',
  email = 'email'
}

export interface IReferral {
  // no empty interface rule
  success?: string;
}
