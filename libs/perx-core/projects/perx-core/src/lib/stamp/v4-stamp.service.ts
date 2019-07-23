import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import {
  map,
  flatMap,
  mergeAll,
  scan,
  tap
} from 'rxjs/operators';

import { EnvConfig } from '../shared/env-config';
import {
  IStampCard,
  IStamp, STAMP_CARD_STATE, IReward,
} from './models/stamp.model';

import { VouchersService } from '../vouchers/vouchers.service';
import { StampService } from './stamp.service';

interface IV4GetStampCardResponse {
  data: IStampCard;
}

interface IV4GetStampCardsResponse {
  data: IStampCard[];
}

interface IV4GetStampTransactionsResponse {
  data: IStamp[];
  meta: {
    count: number,
    size: number,
    total_pages: number,
    page: number,
  };
}

export interface IV4PutStampTransactionResponse {
  data: IStamp;
}

interface IV4StampAllTransactionResponse {
  data: IStampCard;
}

interface IV4Reward {
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

interface IV4StampCard {
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
      }[]
    };
    total_slots: number;
  };
  stamps?: IStamp[];
}

@Injectable({
  providedIn: 'root'
})
export class V4StampService implements StampService {
  public baseUrl: string;

  constructor(
    private http: HttpClient,
    config: EnvConfig,
    private vouchersService: VouchersService
  ) {
    this.baseUrl = config.env.apiHost as string;
  }

  public getCards(campaignId: number): Observable<IStampCard[]> {
    return this.http.get<IV4GetStampCardsResponse>(
      `${ this.baseUrl }/v4/campaigns/${ campaignId }/stamp_cards`, {
        params: {
          size: '100'
        }
      }
    ).pipe(
      map(res => res.data)
    );
  }

  public getCurrentCard(campaignId: number): Observable<IStampCard> {
    return this.http.get<IV4GetStampCardResponse>(
      `${ this.baseUrl }/v4/campaigns/${ campaignId }/stamp_cards/current`
    ).pipe(
      map(res => res.data)
    );
  }

  public getStamps(campaignId: number): Observable<IStamp[]> {
    return this.http.get<IV4GetStampTransactionsResponse>(
      `${ this.baseUrl }/v4/campaigns/${ campaignId }/stamp_transactions`, {
        params: {
          size: '100'
        }
      }
    ).pipe(
      flatMap((resp: IV4GetStampTransactionsResponse) => {
        const streams = [
          of(resp.data)
        ];
        for (let i = 2; i <= resp.meta.total_pages; i++) {
          const stream: Observable<IStamp[]> = this.getAllFromPage(campaignId, i);
          streams.push(stream);
        }
        return streams;
      }),
      mergeAll(),
      scan((acc: IStamp[], curr: IStamp[]) => acc.concat(curr), []),
      map((stamps: IStamp[]) => stamps.sort((v1, v2) => v1.id - v2.id))
    );
  }

  private getAllFromPage(campaignId: number, page: number): Observable<IStamp[]> {
    return this.http.get<IV4GetStampTransactionsResponse>(
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

  public putStamp(stampId: number): Observable<IStamp> {
    return this.http.put<IV4PutStampTransactionResponse>(
      `${ this.baseUrl }/v4/stamp_transactions/${ stampId }`,
      null
    ).pipe(
      tap((res: IV4PutStampTransactionResponse) => {
        if (res.data.vouchers && res.data.vouchers.length > 0) {
          this.vouchersService.reset();
        }
      }),
      map(res => res.data)
    );
  }

  public stampAll(cardId: number): Observable<IStamp[]> {
    return this.http.post<IV4StampAllTransactionResponse>(
      `${ this.baseUrl }/v4/stamp_cards/${ cardId }/redeem`,
      null
    ).pipe(
      map(res => res.data.stamps),
      tap((res) => {
        res.map(r => {
          if (r.vouchers && r.vouchers.length > 0) {
            this.vouchersService.reset();
          }
        });
      }),
      map(res => res)
    );
  }
}
