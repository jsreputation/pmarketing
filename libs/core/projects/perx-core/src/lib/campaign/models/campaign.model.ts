import { IReward } from '../../rewards/models/reward.model';
import { OutcomeType } from '../../outcome/models/outcome.model';
import { IWProperties, WInformationCollectionSettingType } from '@perxtech/whistler';
import { ICategoryTags } from '@perxtech/core';
import { ITag } from '../../merchants/models/merchants.model';

export interface CampaignDisplayProperties {
  landingPage?: CampaignLandingPage;
  informationCollectionSetting?: WInformationCollectionSettingType;
  weblink?: boolean;
  noRewardsPopUp?: IWProperties;
  successPopUp?: IWProperties;
  questDetails?: QuestProperties;
  progressDetails?: ProgressProperties;
  teamsDetails?: TeamsProperties;
  claimPrize?: ClaimPrizeProperties;
  enrolmentPage?: EnrolmentProperties;
  buttonText?: string;
  buttonBgColour?: string;
  buttonTextColour?: string;
  fontColor?: string;
  riskDisclaimer?: string;
}

export interface AdditionalSection {
  headerText: string;
  bodyText: string;
}

export interface CampaignLandingPage {
  body?: { text: string };
  media?: { youtube?: string; bannerImage?: string };
  heading?: { text: string };
  description?: { text: string };
  buttonText?: { text: string };
  buttonText2?: { text: string };
  subHeading?: { text: string };
  backgroundUrl?: string;
  tnc?: { text: string };
  additionalSections?: AdditionalSection[];
  subHeadline?: string;
}
export interface ICampaignRule {
  id: number;
  name: string;
  state: string;
}
export interface ClaimPrizeProperties {
  buttonText: string;
  headline: string;
  image?: {
    value: {
      filename: string;
      imageUrl: string;
    }
  };
  subHeadline: string;
}

export interface EnrolmentProperties {
  body?: string;
}

export interface QuestProperties {
  title?: string;
  description?: string;
  body?: string;
  imageUrl?: string;
  successImageUrl?: string;
}

export interface ProgressProperties extends QuestProperties {
  // title?: string;
  // description?: string;
  // body?: string;
  // imageUrl?: string;
  // successImageUrl?: string;
  intro?: {
    title: string;
    description: string;
  };
  levelTab?: {
    title: string;
    pointsAbbreviation: string;
  };
  howToTab?: {
    title: string;
    description: string;
  };
}

export interface TeamsProperties {
  landingPage?: {
    preEnrolmentMessage: string;
    stampsEarnMessage: string;
    teamComplete?: {
      buttonText?: string;
      buttonTextSecondary?: string;
    }
    teamIncomplete?: {
      buttonText?: string;
      buttonTextSecondary?: string;
    }
    image?: string;
  };
  joinPage?: {
    description: string;
  };
  inviteMessage?: {
    description: string;
    codeBlurb: string;
  };
}

export enum CampaignType {
  // eslint-disable-next-line
  give_reward = 'give_reward', // instant_outcome
  stamp = 'stamp', // loyalty
  game = 'game',
  survey = 'survey',
  invite = 'invite',
  quest = 'quest',
  progress = 'progress',
  instant = 'instant_outcome',
  rulegroup = 'rule_group'
}

export enum CampaignState {
  active = 'active',
  inactive = 'inactive',
  draft = 'draft'
}

export interface ProgressBarFields {
  stages: number;
  current: number;
  stageLabels: string | number[];
  lightStage?: number;
  // for pay and spend include pending and processed
  totalCurrent?: number;
}

export interface CampaignDistance {
  value?: string;
  unitOfMessage?: string;
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
  operatingHours?: IOperatingHours;
  isOperating?: boolean;
  teamSize?: number;
  categoryTags?: ICategoryTags[];
  tags?: ITag[];
  score?: number;
  miscImages?: { [key: string]: string };
  enrollableUntil?: Date | null;
  distance?: CampaignDistance;
  favourite?: boolean;
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
  custom = 'CustomOutcome',
  prizeSet = 'PrizeSet',
  badge = 'Badge'
}

export interface ICampaignOutcome {
  id: number;
  type: CampaignOutcomeType;
  name?: string;
  pointsCount?: number;
  prizeSetItems?: string[]; // populated from campaign landing pages logic, not from API
  campaignId: number;
  createdAt?: string;
  updatedAt?: string;
  // ordering: any|null;
  refereeRequiredForReward?: number;
  totalRewardLimit?: number;
  totalUserLimit?: number;
  awardToTeferral?: boolean;
  awardToReferee?: boolean;
  totalReferreeLimit?: number;
  stampNumber?: number;
  // totalReferreeReward_limit: any|null;
  // hidden: any|null;
}

export interface IPointsOutcome {
  id: number;
  outcomeType: OutcomeType.points;
  points: number;
  properties: any;
}

export interface IBadgeOutcome {
  badgeId: number;
  id: number;
  outcomeType: OutcomeType.badge;
  state: 'issued' | 'unissued';
}

export interface IOperatingHours {
  id: number;
  closesAt: string;
  opensAt: string;
  days: number[]; // expects 0 - 6, Sunday - Saturday
  formattedOffset: string;
}

export interface IBDOCampaignEnrolment {
  id: number;
  campaignId: number;
  campaignName: string;
  enrolledAt: Date;
  enrolmentReference: string;
  userAccountId: number;
}

export interface ICampaignCategory {
  id: number;
  description: string;
  title: string;
  usage: string[];
}

export interface ICampaignMeta {
  count: number;
  orderBy: string;
  page: number;
  sortBy: string;
  totalPages: number;
}

export interface IRawCampaigns {
  data: ICampaign[];
  meta: ICampaignMeta;
}
