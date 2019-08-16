export interface IReward {
  id: number;
  name: string;
  description: string;
  subtitle: string;
  validFrom: Date;
  validTo: Date;
  rewardThumbnail: string;
  rewardBanner: string;
  merchantImg: string;
  rewardPrice?: {
    rewardCurrency: string,
    rewardAmount: string
  }[];
  merchantId?: number;
  merchantName?: string;
  merchantWebsite?: string;
  termsAndConditions: string;
  howToRedeem: string;
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
