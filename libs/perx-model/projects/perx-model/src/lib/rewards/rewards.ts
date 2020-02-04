export const enum PRewardState {
  active = 'active',
  ended = 'ended',
  inactive = 'inactive',
  draft = 'draft',
  approved = 'approved',
  private = 'private',
  system = 'system',
  sell_fast = 'sell_fast',
  sold_out = 'sold_out'
}

export interface IPRewards {
  data: IPReward[];
  meta: {
    count: number;
    size: number;
    total_pages: number;
    page: number;
  };
}

export interface IPPostReward {
  is_draft: boolean;
  newReward: boolean;
  timezone: string;
  is_private: boolean;
  is_system: boolean;
  reward_cost_amount: number;
  reward_prices: any[];
  reward_publicity_type: string;
  reward_cost_currency: string;
  campaign_interval_period: string;
  account_interval_period: string;
  grace_time_in_period: string;
  transaction_expires_in_period: string;
  transaction_validity_period_type: string;
  code_generation_method: string;
  voucher_type: string;
  user_generated: boolean;
  display_even_when_sold_out: boolean;
  display_even_when_user_limit_reached: boolean;
  transaction_issues_at: string;
  begins_at: string;
  redemption_type: string;
  sneak_peek_loyalty_list: any[];
  loyalty_list: any[];
  og_title: string;
  name_en: string;
  is_giftable: boolean;
  active_at: string;
}

export interface IPReward {
  id: number;
  name: string;
  subtitle: null;
  description: null;
  meta: {
    translatable_fields: string[];
  };
  state: PRewardState;
  merchant_name: null;
  begins_at: string;
  ends_at: null;
  images: any[];
  activatable: boolean;
  deactivatable: boolean;
  is_private: boolean;
  is_system: boolean;
  og_title: null;
  og_description: null;
  og_image: null;
  al_ios_url: null;
  al_android_url: null;
  og_url: null;
  categories: any[];
  name_en: string;
  name_th: null;
  name_zh: null;
  description_en: null;
  description_th: null;
  description_zh: null;
  subtitle_en: null;
  subtitle_th: null;
  subtitle_zh: null;
  steps_to_redeem_en: null;
  steps_to_redeem_th: null;
  steps_to_redeem_zh: null;
  terms_and_conditions_en: null;
  terms_and_conditions_th: null;
  terms_and_conditions_zh: null;
  lifetime_rewards_available: null;
  lifetime_max_rewards: null;
  voucher_codes_count: number;
  transaction_expires_at: null;
  transaction_validity_period_type: string;
  transaction_expires_in_units: null;
  transaction_expires_in_period: string;
  transaction_issues_at: string;
  grace_time_in_units: null;
  grace_time_in_period: string;
  code_generation_method: string;
  tags: any[];
}

export interface IPPostRewardResponse {
  data: {
    id: 2;
    name: string;
    subtitle: null | string;
    description: null;
    meta: {
      translatable_fields: string[]
    };
    catalogs: any[];
    terms_and_conditions: null;
    begins_at: string;
    ends_at: null;
    active_at: string;
    active_units: null;
    active_period: null;
    active_days: null;
    state: PRewardState;
    images: any[];
    alt_merchant_name: null;
    alt_merchant_website: null;
    alt_merchant_text: null;
    reward_cost_currency: string;
    reward_cost_amount: number;
    reward_prices: any[];
    custom_fields: any[];
    voucher_code_type: null;
    display_voucher_code_as: null;
    voucher_code_prefix: null;
    generic_voucher_code: string;
    voucher_code_file_url: null;
    campaign_lifetime_max_available: null;
    campaign_interval_max_available: null;
    campaign_interval_units: null;
    campaign_interval_period: string;
    account_lifetime_max_available: null;
    account_interval_max_available: null;
    account_interval_units: null;
    account_interval_period: string;
    display_even_when_sold_out: boolean;
    display_even_when_user_limit_reached: boolean;
    transaction_validity_period_type: string;
    transaction_expires_in_units: null;
    transaction_expires_in_period: string;
    grace_time_in_units: null;
    grace_time_in_period: string;
    transaction_issues_at: string;
    transaction_expires_at: null;
    redemption_type: string;
    redemption_url: null;
    timer_units: null;
    timer_period: null;
    loyalty: any[];
    voucher_codes_count: number;
    code_generation_method: string;
    loyalty_list: any[];
    sneak_peek_loyalty_list: any[];
    merchant_membership_levels: any[];
    reward_price_currency_code: string;
    reward_price_amount: null;
    voucher_type: string;
    merchant_account_id: null;
    merchant_location_ids: any[];
    audience_ids: any[];
    include_audience_ids: any[];
    exclude_audience_ids: any[];
    random_voucher_code_length: null;
    random_voucher_code_format: null;
    timezone: string;
    activatable: boolean;
    deactivatable: boolean;
    is_private: boolean;
    is_system: boolean;
    tags: any[];
    categories: any[];
    labels: any[];
    is_giftable: boolean;
    og_title: null;
    og_description: null;
    og_image: null;
    al_ios_url: null;
    al_android_url: null;
    og_url: null;
    reward_publicity_type: string;
    name_en: string;
    name_th: null;
    name_zh: null;
    description_en: null;
    description_th: null;
    description_zh: null;
    subtitle_en: null;
    subtitle_th: null;
    subtitle_zh: null;
    steps_to_redeem_en: null;
    steps_to_redeem_th: null;
    steps_to_redeem_zh: null;
    terms_and_conditions_en: null;
    terms_and_conditions_th: null;
    terms_and_conditions_zh: null;
    keywords_en: any[];
    keywords_th: any[];
    keywords_zh: any[];
    lifetime_rewards_available: null;
    lifetime_max_rewards: null;
    brands: any[];
    merchant: null;
  };
}

export interface IPPutReward {
  is_draft: boolean;
  hideDurationEndDate: boolean;
  hideSellingEndDate: boolean;
  code_generation_method_: string;
  user_generated: boolean;
  origin_begins_at: string;
  name_en: string;
  subtitle_en: string;
  grace_time_in_period: string;
  transaction_expires_in_period: string;
  campaign_interval_period: string;
  account_interval_period: string;
  isDuplicated: boolean;
  is_private: boolean;
  is_system: boolean;
  state: PRewardState;
  tags: any[];
  brands: any[];
  catalogs: any[];
  categories: any[];
  labels: any[];
  merchant_account_id: null;
  custom_fields: any[];
  reward_cost_amount: string;
  timezone: string;
  keywords_en: any[];
  begins_at: string;
  sneak_peek_loyalty_list: any[];
  reward_cost_currency: string;
  id: number;
  name: string;
  meta: {
    translatable_fields: string[]
  };
  active_at: string;
  images: any[];
  reward_prices: any[];
  generic_voucher_code: string;
  display_even_when_sold_out: boolean;
  display_even_when_user_limit_reached: boolean;
  transaction_validity_period_type: string;
  transaction_issues_at: string;
  redemption_type: string;
  loyalty: any[];
  voucher_codes_count: 0;
  code_generation_method: string;
  loyalty_list: any[];
  merchant_membership_levels: any[];
  reward_price_currency_code: string;
  voucher_type: string;
  merchant_location_ids: any[];
  audience_ids: any[];
  include_audience_ids: any[];
  exclude_audience_ids: any[];
  activatable: boolean;
  deactivatable: boolean;
  is_giftable: boolean;
  reward_publicity_type: string;
  keywords_th: any[];
  keywords_zh: any[];
}
