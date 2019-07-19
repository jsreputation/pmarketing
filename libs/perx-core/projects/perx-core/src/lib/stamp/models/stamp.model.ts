export interface IReward {
  id: number;
  campaign_id: number;
  modularizable_type: string;
  modularizable_id: number;
  created_at: string;
  updated_at: string;
  // ordering: any|null;
  referee_required_for_reward: number;
  total_reward_limit: number;
  total_user_limit: number;
  award_to_referral: boolean;
  award_to_referee: boolean;
  total_referree_limit: number;
  stamp_number: number;
  // total_referree_reward_limit: any|null;
  // hidden: any|null;
}

export enum STAMP_STATE {
  redeemed = 'redeemed',
  issued = 'issued',
}

export enum STAMP_CARD_STATE {
  active = 'active',
  inactive = 'inactive'
}

export interface IStamp {
  id: number;
  user_account_id: number;
  stamp_card_id: number;
  state: STAMP_STATE;
  created_at: string;
  updated_at: string;
  campaign_id: number;
  vouchers?: IVoucher[];
}

export interface IStampCard {
  id: number;
  user_account_id: number;
  state: STAMP_CARD_STATE;
  campaign_id: number;
  card_number: number;
  campaign_config: {
    total_slots: number;
    rewards: IReward[];
  };
  display_properties: {
    number_of_cols: number;
    number_of_rows: number;
    card_image: {
      value: {
        image_url: string;
      }
    };
    total_slots: number;
  };
  stamps?: IStamp[];
}

// TODO: Should move this to voucher
export interface IVoucher {
  id: string;
  name: string;
}

export interface IGetStampCardResponse {
  data: IStampCard;
}

export interface IGetStampCardsResponse {
  data: IStampCard[];
}

export interface IGetStampTransactionsResponse {
  data: IStamp[];
  meta: {
    count: number,
    size: number,
    total_pages: number,
    page: number,
  };
}

export interface IPutStampTransactionResponse {
  data: IStamp;
}

export interface IStampAllTransactionResponse {
  data: IStamp[];
}
