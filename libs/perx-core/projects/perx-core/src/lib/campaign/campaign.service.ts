import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export enum TransactionState {
  redeemed = 'redeemed'
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

export enum IStampCardStatus {
  active = 'active'
}

export interface IStampTransaction {
  id: number;
  user_account_id: number;
  stamp_card_id: number;
  state: TransactionState;
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
  state: IStampCardStatus;
  campaign_id: number;
  campaign_config: {
    total_slots: number;
    rewards: IReward[];
  };
  stamps: IStampTransaction[];
}
export interface IVoucher {
  id: string;
  name: string;
}

export interface IPutStampTransactionResponse {
  stamp_transaction: {
    id: string;
    state: TransactionState;
    vouchers: IVoucher[];
  };
}
export enum CAMPAIGN_TYPE {
  give_reward = 'give_reward',
  stamp = 'stamp'
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

@Injectable({providedIn: 'root'})
export class CampaignService {
  baseUrl = 'https://api.perxtech.io';
  token = 'Bearer b95479cb2108b70333cfb25d4d4b3a0735d1cd0551a2032c87383e26d7c034f3';

  constructor(private http: HttpClient) { }

  getCampaigns(): Observable<ICampaignsResponse> {
    return this.http.get<ICampaignsResponse>(
      `${this.baseUrl}/v4/campaigns`,
      { headers: this.headers }
    );
  }

  getCampaign(id: string): Observable<ICampaignResponse> {
    return this.http.get<ICampaignResponse>(
      `${this.baseUrl}/v4/campaigns`,
      { headers: this.headers }
    );
  }

  getCards(campaignId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/v4/campaigns/${campaignId}/stamp_cards`);
  }

  getTransactions(campaignId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/v4/campaigns/${campaignId}/stamp_cards`);
  }

  putStampTransaction(stampTransactionId: string): Observable<IPutStampTransactionResponse> {
    return this.http.put<IPutStampTransactionResponse>(
      `${this.baseUrl}/v4/stamp_transactions/${stampTransactionId}`,
      {},
      { headers: this.headers }
    );
  }

  get headers(): { [header: string]: string | string[]; } {
    return {
      Authorization: this.token
    };
  }
}
