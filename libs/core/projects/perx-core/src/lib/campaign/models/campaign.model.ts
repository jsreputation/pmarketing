import { IReward } from '../../rewards/models/reward.model';
import { WInformationCollectionSettingType, IWProperties } from '@perxtech/whistler';

export interface CampaignDisplayProperties {
  landingPage?: CampaignLandingPage;
  informationCollectionSetting?: WInformationCollectionSettingType;
  weblink?: boolean;
  noRewardsPopUp?: IWProperties;
  successPopUp?: IWProperties;
  questDetails?: QuestProperties;
}

export interface CampaignLandingPage {
  body?: { text: string };
  media?: { youtube?: string; };
  heading?: { text: string };
  buttonText?: { text: string };
  subHeading?: { text: string };
  backgroundUrl?: string;
}

export interface QuestProperties {
  title?: string;
  description?: string;
  body?: string;
  imageUrl?: string;
  successImageUrl?: string;
}

export enum CampaignType {
  // eslint-disable-next-line
  give_reward = 'give_reward', // instant_outcome
  stamp = 'stamp', // loyalty
  game = 'game',
  survey = 'survey',
  invite = 'invite',
  quest = 'quest'
}

export enum CampaignState {
  active = 'active',
  inactive = 'inactive',
  draft = 'draft'
}

export interface ProgressBarFields {
  stages: number;
  current: number;
  stageLabels: string|number[];
  lightStage?: number;
  // for pay and spend include pending and processed
  totalCurrent?: number;
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
  refersAttained?: number;
  progress?: ProgressBarFields;
  customFields?: any;
  enrolled?: boolean;
  termsAndConditions?: string;
}

export enum CommChannel {
  sms = 'sms',
  email = 'email'
}

export interface IReferral {
  // no empty interface rule
  success?: string;
}

export interface ITaggedItem {
  itemType: string;
  itemVal: ICampaign | IReward | number;
}

export interface ICampaignItem {
  itemId: number;
  itemType: string;
}

export enum CampaignOutcomeType {
  reward = 'Reward::Campaign',
  points = 'StoredValue::Campaign',
  custom = 'CustomOutcome'
}

export interface ICampaignOutcome {
  id: number;
  type: CampaignOutcomeType;
  name: string;
  pointsCount?: number;
}
