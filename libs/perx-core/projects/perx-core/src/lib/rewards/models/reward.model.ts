export interface IReward {
  id: number;
  name: string;
  description: string;
  subtitle: string;
  validFrom: Date;
  validTo: Date;
  sellingFrom?: Date;
  rewardThumbnail?: string;
  rewardBanner: string;
  merchantImg: string;
  rewardPrice?: IPrice[];
  merchantId?: number;
  merchantName?: string;
  merchantWebsite?: string;
  termsAndConditions: string;
  howToRedeem: string;
  categoryTags?: ICategoryTags[];
  inventory?: Inventory;
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
}

export interface Inventory {
  rewardTotalBalance?: number;
  rewardTotalLimit?: number;
}
