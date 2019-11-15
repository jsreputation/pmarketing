import { IWRewardDisplayProperties } from '@perx/whistler';

export enum RedemptionType {
  pin = 'pin',
  txtCode = 'txtCode',
  qr = 'qrcode',
  none = 'none',
  offline = 'offline'
}

export interface IReward {
  id: number;
  name: string;
  description: string;
  subtitle: string;
  validFrom: Date;
  validTo: Date | null;
  sellingFrom?: Date;
  rewardThumbnail?: string;
  rewardBanner: string;
  merchantImg?: string;
  rewardPrice?: IPrice[];
  merchantId?: number;
  merchantName?: string;
  merchantWebsite?: string;
  termsAndConditions: string;
  howToRedeem: string;
  redemptionType?: RedemptionType;
  categoryTags?: ICategoryTags[];
  inventory?: Inventory;
  redemptionText?: string;
  rawPayload?: any;
  displayProperties?: IWRewardDisplayProperties;
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
  id: number;
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
