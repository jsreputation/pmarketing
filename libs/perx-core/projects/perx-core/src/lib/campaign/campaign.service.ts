import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { EnvConfig } from './env-config';
import { flatMap, map, mergeAll, scan, tap } from 'rxjs/operators';
import { VouchersService } from '../vouchers/vouchers.service';
import { ICampaign, CAMPAIGN_TYPE, CAMPAIGN_STATE } from './models/campaign.model';
import { ICampaignService } from './icampaign.service';
import { IGame } from '../game/game.model';

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

/*
 * Not in use, the build is failing if its not commented
 */
// interface IV4CampaignsResponse {
//   data: ICampaign[];
//   meta: {
//     count: number;
//   };
// }

interface IV4Campaign {
  id: number;
  name: string;
  description: string;
  begins_at: string;
  ends_at: any|null;
  enrolled: boolean;
  campaign_type: CAMPAIGN_TYPE;
  campaign_referral_type: any|null;
  game_config?: any;
  campaign_config: {
    campaign_results: {
      count: number;
      first_result_id: any|null;
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
  state: CAMPAIGN_STATE;
  games?: IGame[];
  stampCards?: IStampCard[];
  icon: string;
}

/*
 * Not in use, the build is failing if its not commented
 */
// interface IV4CampaignResponse {
//   data: ICampaign;
//   meta: {
//     size: null;
//     page: null;
//     sort_by: null;
//     order: null;
//     count: number;
//   };
// }

@Injectable({ providedIn: 'root' })
export class CampaignService implements ICampaignService {
  public baseUrl: string;

  constructor(private http: HttpClient, config: EnvConfig, private vouchersService: VouchersService) {
    this.baseUrl = config.env.apiHost;
  }

  public static v4CampaignToCampaign(campaign: IV4Campaign): ICampaign {
    return {
      id: campaign.id,
      name: campaign.name,
      description: campaign.description,
      type: campaign.campaign_type,
      state: campaign.state ? campaign.state : null,
      games: campaign.games ? campaign.games : null,
      stampCards: campaign.stampCards ? campaign.stampCards : null,
      icon: campaign.icon ? campaign.icon : null,
    };
  }

  public getCampaigns(): Observable<ICampaign[]> {
    return this.http.get<ICampaign[]>(
      `${ this.baseUrl }/v4/campaigns`
    )
    .pipe(
      map( campaigns => campaigns[`data`].map((campaign: IV4Campaign) => CampaignService.v4CampaignToCampaign(campaign)))
    );
  }

  public getCards(campaignId: number): Observable<IStampCard[]> {
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

  public getCurrentCard(campaignId: number): Observable<IStampCardResponse> {
    return this.http.get<IStampCardResponse>(
      `${ this.baseUrl }/v4/campaigns/${ campaignId }/stamp_cards/current`
    );
  }

  public putStampTransaction(stampTransactionId: number): Observable<IPutStampTransactionResponse> {
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

  public getAllStampTransaction(campaignId: number): Observable<any> {
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

  public getAllFromPage(campaignId: number, page: number): Observable<IStampTransaction[]> {
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
