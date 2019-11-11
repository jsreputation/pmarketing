// api related
/* eslint-disable */
export interface ILoyaltyApi {
  name: string;
  unit: string;
  pool_id?: string;
  status?: string;
  custom_tiers_count?: number;
  created_at?: string;
}

export interface IBasicTierApi {
  image_url: string;
  earn_ratio_money: number;
  earn_ratio_point: number;
  burn_ratio_money: number;
  burn_ratio_point: number;
  expiry_period: number;
  expiry_period_type: string;
  expiry_period_trigger: string;
  join_method: IJoinMethodApi;
}

export interface ICustomTierApi {
  name: string;
  image_url: string;
  bonus_ratio: string;
  discount_ratio: string;
  expiry_period: number;
  expiry_period_type: string;
  expiry_period_trigger: string;
  join_method: IJoinMethodApi;
}

export interface IJoinMethodApi {
  transaction_amount?: boolean;
  sign_up?: boolean;
  invite_only?: boolean;
  amount?: number;
  points_threshold?: boolean;
  points?: number;
}
