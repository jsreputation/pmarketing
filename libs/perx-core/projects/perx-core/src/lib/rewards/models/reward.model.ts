export interface IReward {
  id: number;
  name: string;
  description: string;
  subtitle: string;
  validFrom: Date;
  validTo: Date;
  rewardPrice?: {
    rewardCurrency: string,
    rewardAmount: string
  };
  merchantId?: number;
  merchantName?: string;
  merchantWebsite?: string;
}
