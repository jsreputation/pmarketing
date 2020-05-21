import { IWRewardDisplayProperties } from '@perxtech/whistler';

export interface IReward {
  id: number;
  name: string;
  description: string;
  subtitle: string;
  validFrom: Date | null;
  validTo: Date | null;
  sellingFrom?: Date;
  rewardThumbnail?: string;
  rewardBanner: string;
  merchantImg?: string;
  rewardPrice?: IPrice[];
  rewardState?: IRewardState | null;
  merchantId?: number;
  merchantName?: string;
  merchantWebsite?: string;
  termsAndConditions: string;
  howToRedeem?: string;
  categoryTags?: ICategoryTags[];
  inventory?: Inventory | null;
  redemptionText?: string;
  rawPayload?: any;
  displayProperties?: IWRewardDisplayProperties;
}

export interface IRewardState {
  label: string;
  class: string;
  rewardBalance?: number;
  isButtonEnabled: boolean;
}

export interface ICatalog {
  id: number;
  name: string;
  description: string;
  catalogThumbnail: string;
  catalogBanner: string;
  rewardCount: number;
  rewards?: IReward[];
}

export interface IPrice {
  id?: number;
  rewardCampaignId?: number;
  price?: number;
  currencyCode?: string;
  points?: number;
  identifier?: string;
}

export interface ICategoryTags {
  id: number;
  title: string;
  parent?: any;
}

export interface IRewardParams {
  priceId?: number;
  locationId?: number;
  sourceType?: string;
}

export interface Inventory {
  rewardTotalBalance?: number | null;
  rewardTotalLimit?: number | null;
  rewardLimitPerUserBalance?: number | null;
}