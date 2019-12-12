export interface IWLoyalty {
    name: string;
    unit: string;
    status: string;
    custom_tiers_count: number;
}

export interface IWLoyaltyCard {
    balance: number;
    user_id: number;
}

export interface IWLoyaltyAttributes {
  name: string;
  unit: string;
  pool_id?: string;
  status?: string;
  custom_tiers_count?: number;
  created_at?: string;
}

export interface IWBasicTierAttributes {
  image_url: string;
  earn_ratio_money: number;
  earn_ratio_point: number;
  burn_ratio_money: number;
  burn_ratio_point: number;
  expiry_period: number;
  expiry_period_type: string;
  expiry_period_trigger: string;
  join_method: IWJoinMethod;
}

export interface IWCustomTierAttributes  {
  name: string;
  image_url: string;
  bonus_ratio: string;
  discount_ratio: string;
  expiry_period: number;
  expiry_period_type: string;
  expiry_period_trigger: string;
  join_method: IWJoinMethod;
}

export interface IWJoinMethod {
  transaction_amount?: boolean;
  sign_up?: boolean;
  invite_only?: boolean;
  amount?: number;
  points_threshold?: boolean;
  points?: number;
}

export interface IWLoyaltyRuleSetAttributes {
  domain_id: string;
  domain_type?: string;
  match_type: string;
}

export interface IWLoyaltyRuleAttributes {
  priority?: number;
  rule_set_id?: string;
  reward_type?: string;
  reward_id?: number;
  name: string;
  conditions?: IWLoyaltyRuleConditionAttributes[];
}

export type IWLoyaltyRuleConditionValueType = 'string' | 'integer' | 'date';

export type IWLoyaltyRuleConditionSign = 'equal' | 'unequal' | 'less' | 'greater' | 'less_or_equal' | 'greater_or_equal';

export interface IWLoyaltyRuleConditionAttributes {
  field: string;
  sign: IWLoyaltyRuleConditionSign;
  value: string | number | Date | null;
  value_type: IWLoyaltyRuleConditionValueType;
}
