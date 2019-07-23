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
  data: IV4StampCard;
}

interface IV4GetStampCardsResponse {
  data: IV4StampCard[];
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
  data: IV4StampCard;
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
    rewards: IV4Reward[];
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

  private static v4RewardToReward(reward: IV4Reward): IReward {
    return {
      id: reward.id,
      campaignId: reward.campaign_id,
      modularizableType: reward.modularizable_type,
      modularizableId: reward.modularizable_id,
      createdAt: reward.created_at,
      updatedAt: reward.updated_at,
      refereeRequiredForReward: reward.referee_required_for_reward,
      totalRewardLimit: reward.total_reward_limit,
      totalUserLimit: reward.total_user_limit,
      awardToTeferral: reward.award_to_referral,
      awardToReferee: reward.award_to_referee,
      totalReferreeLimit: reward.total_referree_limit,
      stampNumber: reward.stamp_number,
    };
  }

  private static v4StampCardToStampCard(stampCard: IV4StampCard): IStampCard {
    return {
      id: stampCard.id,
      userAccountId: stampCard.user_account_id,
      state: stampCard.state,
      campaignId: stampCard.campaign_id,
      cardNumber: stampCard.card_number,
      campaignConfig: {
        totalSlots: stampCard.campaign_config.total_slots,
        rewards: stampCard.campaign_config.rewards.map
        ((rewards: IV4Reward) => V4StampService.v4RewardToReward(rewards))
      },
      displayProperties: {
        numberOfCols: stampCard.display_properties.number_of_cols,
        numberOfRows: stampCard.display_properties.number_of_rows,
        cardImage: {
          value: {
            imageUrl: stampCard.display_properties.card_image.value.image_url,
          }
        },
        totalSlots: stampCard.display_properties.total_slots,
      },
      stamps: stampCard.stamps,
    };
  }

  public getCards(campaignId: number): Observable<IStampCard[]> {
    return this.http.get<IV4GetStampCardsResponse>(
      `${ this.baseUrl }/v4/campaigns/${ campaignId }/stamp_cards`, {
        params: {
          size: '100',
          serializer: 'new'
        }
      }
    ).pipe(
      map((res: IV4GetStampCardsResponse) => res.data),
      map((stampCards: IV4StampCard[]) => stampCards.map(
        (stampCard: IV4StampCard) => V4StampService.v4StampCardToStampCard(stampCard)
      )),
    );
  }

  public getCurrentCard(campaignId: number): Observable<IStampCard> {
    return this.http.get<IV4GetStampCardResponse>(
      `${ this.baseUrl }/v4/campaigns/${ campaignId }/stamp_cards/current`
    ).pipe(
      map((res: IV4GetStampCardResponse) => V4StampService.v4StampCardToStampCard(res.data))
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
