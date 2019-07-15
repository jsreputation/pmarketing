import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { EnvConfig } from './env-config';
import { flatMap, map, mergeAll, scan, tap } from 'rxjs/operators';
import { VouchersService } from '../vouchers/vouchers.service';
import { ICampaign, CAMPAIGN_TYPE, CAMPAIGN_STATE } from './models/campaign.model';
import { ICampaignService } from './icampaign.service';

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
  ordering: any|null;
  referee_required_for_reward: number;
  total_reward_limit: number;
  total_user_limit: number;
  award_to_referral: boolean;
  award_to_referee: boolean;
  total_referree_limit: number;
  stamp_number: number;
  total_referree_reward_limit: any|null;
  hidden: any|null;
}

export enum STAMP_CARD_STATUS {
  active = 'active',
  inactive = 'inactive'
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
  data: {
    id: string;
    state: TRANSACTION_STATE;
    vouchers: IVoucher[];
  };
}

export interface IGetStampTransactionResponse {
  data: IStampTransaction[];
  meta: {
    count: number,
    size: number,
    total_pages: number,
    page: number,
  };
}

interface IV4Campaign {
  id: number;
  name: string;
  description: string;
  begins_at: string;
  ends_at?: string;
  enrolled: boolean;
  campaign_type: CAMPAIGN_TYPE;
  images: any[];
  favourite: boolean;
  custom_fields: any;
  category_tags: any[];
  tags: any[];
  state: CAMPAIGN_STATE;
}

interface IV4CampaignResponse {
  data: IV4Campaign;
  meta: {
    count: number;
  };
}

interface IV4CampaignsResponse {
  data: IV4Campaign[];
  meta: {
    count: number;
  };
}

@Injectable({ providedIn: 'root' })
export class CampaignService implements ICampaignService {
  baseUrl: string;

  constructor(private http: HttpClient, config: EnvConfig, private vouchersService: VouchersService) {
    this.baseUrl = config.env.apiHost;
  }

  public static v4CampaignToCampaign(campaign: IV4Campaign): ICampaign {
    return {
      id: campaign.id,
      name: campaign.name,
      description: campaign.description,
      type: campaign.campaign_type,
      state: campaign.state,
    };
  }

  getCampaigns(): Observable<ICampaign[]> {
    return this.http.get<IV4CampaignsResponse>(
      `${ this.baseUrl }/v4/campaigns`
    )
    .pipe(
      map(resp => resp.data),
      map((campaigns: IV4Campaign[]) => campaigns.map(campaign => CampaignService.v4CampaignToCampaign(campaign)))
    );
  }

  getCampaign(id: number): Observable<ICampaign> {
    return this.http.get<IV4CampaignResponse>(
      `${this.baseUrl}/v4/campaign/${id}`
    )
    .pipe(
      map(resp => resp.data),
      map((campaign: IV4Campaign) => CampaignService.v4CampaignToCampaign(campaign))
    );
  }

  getCards(campaignId: number): Observable<IStampCard[]> {
    return this.http.get<IStampCardsResponse>(
      `${ this.baseUrl }/v4/campaigns/${ campaignId }/stamp_cards`, {
        params: {
          size: '100'
        }
      }
    ).pipe(
      map(res => res.data)
    );
  }

  getCurrentCard(campaignId: number): Observable<IStampCardResponse> {
    return this.http.get<IStampCardResponse>(
      `${ this.baseUrl }/v4/campaigns/${ campaignId }/stamp_cards/current`
    );
  }

  putStampTransaction(stampTransactionId: number): Observable<IPutStampTransactionResponse> {
    return this.http.put<IPutStampTransactionResponse>(
      `${ this.baseUrl }/v4/stamp_transactions/${ stampTransactionId }`,
      null
    ).pipe(
      tap((res: IPutStampTransactionResponse) => {
        if (res.data.vouchers && res.data.vouchers.length > 0) {
          this.vouchersService.reset();
        }
      })
    );
  }

  getAllStampTransaction(campaignId: number) {
    return this.http.get<IGetStampTransactionResponse>(
      `${ this.baseUrl }/v4/campaigns/${ campaignId }/stamp_transactions`, {
        params: {
          size: '100'
        }
      }
    ).pipe(
      flatMap((resp: IGetStampTransactionResponse) => {
        const streams = [
          of(resp.data)
        ];
        for (let i = 2; i <= resp.meta.total_pages; i++) {
          const stream: Observable<IStampTransaction[]> = this.getAllFromPage(campaignId, i);
          streams.push(stream);
        }
        return streams;
      }),
      mergeAll(),
      scan((acc: IStampTransaction[], curr: IStampTransaction[]) => acc.concat(curr), []),
      map((stamps: IStampTransaction[]) => stamps.sort((v1, v2) => v1.id - v2.id))
    );
  }

  getAllFromPage(campaignId: number, page: number): Observable<IStampTransaction[]> {
    return this.http.get<IGetStampTransactionResponse>(
      `${ this.baseUrl }/v4/campaigns/${ campaignId }/stamp_transactions`,
      {
        params: {
          page: `${ page }`,
          size: '100'
        }
      })
      .pipe(
        map(res => res.data)
      );
  }
}
