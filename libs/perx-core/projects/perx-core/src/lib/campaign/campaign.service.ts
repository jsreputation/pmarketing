import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvConfig } from './env-config';

export enum TRANSACTION_STATE {
  redeemed = 'redeemed',
  issued = 'issued',
}

export interface IReward {
  id: number;
  campaign_id: number;
  modularizable_type: string;
  modularizable_id: number;
  created_at: string;
  updated_at: string;
  ordering: any | null;
  referee_required_for_reward: number;
  total_reward_limit: number;
  total_user_limit: number;
  award_to_referral: boolean;
  award_to_referee: boolean;
  total_referree_limit: number;
  stamp_number: number;
  total_referree_reward_limit: any | null;
  hidden: any | null;
}

export enum STAMP_CARD_STATUS {
  active = 'active'
}

export interface IStampTransaction {
  id: number;
  user_account_id: number;
  stamp_card_id: number;
  state: TRANSACTION_STATE;
  transactions: {
    ids: any[],
    records: any
  };
  created_at: string;
  updated_at: string;
  campaign_id: 11;
}

export interface IStampCard {
  id: number;
  user_account_id: number;
  state: STAMP_CARD_STATUS;
  campaign_id: number;
  campaign_config: {
    total_slots: number;
    rewards: IReward[];
  };
  stamps?: IStampTransaction[];
}

export interface IStampCardResponse {
  data: IStampCard;
}

export interface IStampCardsResponse {
  data: IStampCard[];
}

export interface IVoucher {
  id: string;
  name: string;
}

export interface IPutStampTransactionResponse {
  stamp_transaction: {
    id: string;
    state: TRANSACTION_STATE;
    vouchers: IVoucher[];
  };
}
export enum CAMPAIGN_TYPE {
  give_reward = 'give_reward',
  stamp = 'stamp',
  game = 'game'
}
export interface ICampaign {
  id: number;
  name: string;
  description: string;
  begins_at: string;
  ends_at: any | null;
  enrolled: boolean;
  campaign_type: CAMPAIGN_TYPE;
  campaign_referral_type: any | null;
  game_config?: any;
  campaign_config: {
    campaign_results: {
      count: number;
      first_result_id: any | null;
    };
    auto_issue_voucher?: boolean;
    burn_stamps_when_redeeming_for_voucher?: false,
    use_once_only?: false,
    used_message_title?: string;
    used_message_description?: string;
    stamps_slots?: 10,
    stamp_slots?: any[]
  };
  images: any[];
  favourite: boolean;
  custom_fields: any;
  category_tags: any[];
  tags: any[];
}
export interface ICampaignsResponse {
  data: ICampaign[];
  meta: {
    count: number;
  };
}
export interface ICampaignResponse {
  data: ICampaign;
  meta: {
    size: null;
    page: null;
    sort_by: null;
    order: null;
    count: number;
  };
}

@Injectable({ providedIn: 'root' })
export class CampaignService {
  baseUrl: string;

  constructor(private http: HttpClient, config: EnvConfig) {
    this.baseUrl = config.env.apiHost;
  }

  getCampaigns(): Observable<ICampaignsResponse> {
    return this.http.get<ICampaignsResponse>(
      `${this.baseUrl}/v4/campaigns`
    );
  }

  getCampaign(id: number): Observable<ICampaignResponse> {
    return this.http.get<ICampaignResponse>(
      `${this.baseUrl}/v4/campaigns`
    );
  }

  getCards(campaignId: number): Observable<IStampCard[]> {
    return this.http.get<IStampCard[]>(
      `${this.baseUrl}/v4/campaigns/${campaignId}/stamp_cards`
    );
  }

  getCurrentCard(campaignId: number): Observable<IStampCardResponse> {
    return this.http.get<IStampCardResponse>(
      `${this.baseUrl}/v4/campaigns/${campaignId}/stamp_cards/current`
    );
  }

  getTransactions(campaignId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/v4/campaigns/${campaignId}/stamp_cards`);
  }

  putStampTransaction(stampTransactionId: string): Observable<IPutStampTransactionResponse> {
    return this.http.put<IPutStampTransactionResponse>(
      `${this.baseUrl}/v4/stamp_transactions/${stampTransactionId}`,
      null
    );
  }
}
