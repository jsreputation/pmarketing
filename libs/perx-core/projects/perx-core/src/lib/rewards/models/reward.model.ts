export interface IReward {
  id: number;
  name: string;
  description: string;
  subtitle: string;
  valid_from: Date;
  valid_to: Date;
  reward_price?: {
    reward_currency: string,
    reward_amount: string
  };
  merchant_id?: number;
  merchant_name?: string;
  merchant_website?: string;
}
