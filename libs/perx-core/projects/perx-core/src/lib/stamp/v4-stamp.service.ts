import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { oc } from 'ts-optchain';
import {interval, Observable, of, throwError, from } from 'rxjs';
import {
  map,
  flatMap,
  mergeAll,
  scan,
  tap,
  filter,
  mergeMap,
  toArray
} from 'rxjs/operators';

import {
  IStampCard,
  IStamp,
  StampCardState,
  StampState,
  ICampaignOutcome,
} from './models/stamp.model';

import { IVoucher } from '../vouchers/models/voucher.model';

import { IVoucherService } from '../vouchers/ivoucher.service';
import { StampService } from './stamp.service';
import { Config } from '../config/config';
import { ICampaignService } from '../campaign/icampaign.service';
import { CampaignType, ICampaign } from '../campaign/models/campaign.model';

interface IV4GetStampCardResponse {
  data: IV4StampCard;
}

interface IV4GetStampCardsResponse {
  data: IV4StampCard[];
}

export interface IV4Stamp {
  id: number;
  user_account_id: number;
  stamp_card_id: number;
  state: StampState;
  created_at: string;
  updated_at: string;
  campaign_id: number;
  vouchers?: IVoucher[];
}

interface IV4GetStampTransactionsResponse {
  data: IV4Stamp[];
  meta: {
    count: number,
    size: number,
    total_pages: number,
    page: number,
  };
}

export interface IV4PutStampTransactionResponse {
  data: IV4Stamp;
}

interface IV4StampAllTransactionResponse {
  data: IV4StampCard;
}

interface IV4Outcome {
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
  state: StampCardState;
  campaign_id: number;
  card_number: number;
  campaign_config?: {
    total_slots: number;
    rewards: IV4Outcome[];
  };
  display_properties: {
    number_of_cols?: number;
    number_of_rows?: number;
    card_img?: {
      value?: {
        image_url?: string;
      }
    };
    //  todo: temporarily map this until v4 dashboard fixes naming
    card_background_img?: {
      value?: {
        image_url?: string;
      }
    };
    gift_active_img?: {
      value?: {
        image_url?: string;
      }
    };
    stamp_active_img?: {
      value?: {
        image_url?: string;
      }
    };
    gift_inactive_img?: {
      value?: {
        image_url?: string;
      }
    };
    stamp_inactive_img?: {
      value?: {
        image_url?: string;
      }
    };
    total_slots?: number;
    display_campaign_as: string;
    background_img?: {
      value?: {
        image_url?: string;
      }
    };
    thumbnail_img?: {
      value?: {
        image_url?: string;
      }
    };
    reward_positions?: number[];
  };
  stamps?: IV4Stamp[];
}

// tslint:disable-next-line:max-line-length
// https://github.com/markwhitfeld/store/blob/15101c2a03624730366df1fd634b6bf6047d2e37/docs/concepts/select.md#angular-libraries-use-of-lambdas-in-static-functions
// @dynamic
@Injectable({
  providedIn: 'root'
})
export class V4StampService implements StampService {
  public baseUrl: string;

  constructor(
    private http: HttpClient,
    config: Config,
    private vouchersService: IVoucherService,
    private campaignService: ICampaignService
  ) {
    this.baseUrl = config.apiHost as string;
  }

  private static v4StampToStamp(stamp: IV4Stamp): IStamp {
    return {
      id: stamp.id,
      userAccountId: stamp.user_account_id,
      stampCardId: stamp.stamp_card_id,
      state: stamp.state,
      createdAt: stamp.created_at,
      updatedAt: stamp.updated_at,
      campaignId: stamp.campaign_id,
      vouchers: stamp.vouchers,
    };
  }

  private static v4OutcomeToOutcome(reward: IV4Outcome): ICampaignOutcome {
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
    const cardImageUrl = oc(stampCard).display_properties.card_img.value.image_url();
    const cardImage = cardImageUrl ? { value: { imageUrl: cardImageUrl } } : undefined;
    //  todo: temporarily map this until v4 dashboard fixes naming
    const cardBackgroundImageUrl = oc(stampCard).display_properties.card_background_img.value.image_url();
    const cardBackgroundImage = cardBackgroundImageUrl ? { value: { imageUrl: cardBackgroundImageUrl } } : undefined;
    const rewardPreStamp = oc(stampCard).display_properties.gift_inactive_img.value.image_url(undefined);
    const rewardPostStamp = oc(stampCard).display_properties.gift_active_img.value.image_url(undefined);
    const preStampImg = oc(stampCard).display_properties.stamp_inactive_img.value.image_url(undefined);
    const postStampImg = oc(stampCard).display_properties.stamp_active_img.value.image_url(undefined);
    const backgroundImgUrl = oc(stampCard).display_properties.background_img.value.image_url();
    const backgroundImg = backgroundImgUrl ? { value: { imageUrl: backgroundImgUrl } } : undefined;
    return {
      id: stampCard.id,
      userAccountId: stampCard.user_account_id,
      state: stampCard.state,
      campaignId: stampCard.campaign_id,
      cardNumber: stampCard.card_number,
      campaignConfig: {
        totalSlots: oc(stampCard).campaign_config.total_slots(0),
        rewards: oc(stampCard).campaign_config.rewards([])
          .map((rewards: IV4Outcome) => V4StampService.v4OutcomeToOutcome(rewards)),
      },
      displayProperties: {
        numberOfCols: stampCard.display_properties.number_of_cols,
        numberOfRows: stampCard.display_properties.number_of_rows,
        cardImage,
        // todo: temporarily map this until v4 dashboard fixes naming
        cardBackgroundImage,
        rewardPreStamp,
        rewardPostStamp,
        preStampImg,
        postStampImg,
        totalSlots: stampCard.display_properties.total_slots,
        displayCampaignAs: oc(stampCard).display_properties.display_campaign_as('stamp_card'),
        backgroundImg,
        rewardPositions: stampCard.display_properties.reward_positions,
        thumbnailImg: oc(stampCard).display_properties.thumbnail_img.value.image_url()
      },
      stamps: stampCard.stamps ? stampCard.stamps.map((stamp: IV4Stamp) => V4StampService.v4StampToStamp(stamp)) : undefined
    };
  }

  public getCards(campaignId: number): Observable<IStampCard[]> {
    if (!campaignId) {
      return throwError('Invalid campaign Id');
    }

    return this.http.get<IV4GetStampCardsResponse>(
      `${this.baseUrl}/v4/campaigns/${campaignId}/stamp_cards`,
      { params: { size: '100' } }
    ).pipe(
      map((res: IV4GetStampCardsResponse) => res.data),
      map((stampCards: IV4StampCard[]) => stampCards.map(
        (stampCard: IV4StampCard) => V4StampService.v4StampCardToStampCard(stampCard)
      ))
    );
  }

  public getCurrentCard(campaignId: number): Observable<IStampCard> {
    return this.http.get<IV4GetStampCardResponse>(
      `${this.baseUrl}/v4/campaigns/${campaignId}/stamp_cards/current`
    ).pipe(
      map((res: IV4GetStampCardResponse) => V4StampService.v4StampCardToStampCard(res.data))
    );
  }

  public getStamps(campaignId: number): Observable<IStamp[]> {
    return this.http.get<IV4GetStampTransactionsResponse>(
      `${this.baseUrl}/v4/campaigns/${campaignId}/stamp_transactions`,
      { params: { size: '100' } }
    ).pipe(
      flatMap((resp: IV4GetStampTransactionsResponse) => {
        const streams = [
          of(resp.data.map((stamp: IV4Stamp) => V4StampService.v4StampToStamp(stamp)))
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

  public stampsChangedForStampCard(stampCard: IStampCard, intervalPeriod: number = 2000): Observable<IStampCard> {
    let pass: number;
    let numberOfStamps = stampCard.stamps ? stampCard.stamps.length : 0;
    return interval(intervalPeriod).pipe(
      map(val => {
        pass = val;
        return this.getCurrentCard(stampCard.campaignId || 0);
      }),
      mergeAll(1),
      filter((card: IStampCard) => {
        if (pass === 0) {
          return true;
        }

        if (card.stamps && numberOfStamps < card.stamps.length) {
          numberOfStamps = card.stamps.length;
          return true;
        }
        return false;
      })
    );
  }

  private getAllFromPage(campaignId: number, page: number): Observable<IStamp[]> {
    return this.http.get<IV4GetStampTransactionsResponse>(
      `${this.baseUrl}/v4/campaigns/${campaignId}/stamp_transactions`,
      {
        params: {
          page: `${page}`,
          size: '100'
        }
      })
      .pipe(
        map((res: IV4GetStampTransactionsResponse) => res.data),
        map((stamps: IV4Stamp[]) => stamps.map(
          (stamp: IV4Stamp) => V4StampService.v4StampToStamp(stamp)
        ))
      );
  }

  public putStamp(stampId: number, sourceType?: string): Observable<IStamp> {
    let params = new HttpParams();
    if (sourceType) {
      params = params.set('source_type', sourceType);
    }
    return this.http.put<IV4PutStampTransactionResponse>(
      `${this.baseUrl}/v4/stamp_transactions/${stampId}`,
      sourceType ? params : null
    ).pipe(
      tap((res: IV4PutStampTransactionResponse) => {
        if (res.data.vouchers && res.data.vouchers.length > 0) {
          this.vouchersService.reset();
        }
      }),
      map((res: IV4PutStampTransactionResponse) => V4StampService.v4StampToStamp(res.data))
    );
  }

  public stampAll(cardId: number): Observable<IStamp[]> {
    return this.http.post<IV4StampAllTransactionResponse>(
      `${this.baseUrl}/v4/stamp_cards/${cardId}/redeem_all_stamps`,
      null
    ).pipe(
      map(res => res.data.stamps),
      filter(stamps => stamps !== undefined),
      tap((stamps: IV4Stamp[]) => {
        if (stamps.some(s => s.vouchers !== undefined && s.vouchers.length > 0)) {
          this.vouchersService.reset();
        }
      }),
      map((stamps: IV4Stamp[]) => stamps.map((stamp: IV4Stamp) => V4StampService.v4StampToStamp(stamp)))
    );
  }

  public getActiveCards(stampType?: string): Observable<IStampCard[]> {
    return this.campaignService.getCampaigns()
      .pipe(
        map(campaigns => campaigns.filter(camp => camp.type === CampaignType.stamp)),
        map(campaigns => {
          if (stampType === 'puzzle') {
            return campaigns.filter(camp => camp.type === CampaignType.stamp).slice(0, 1);
          }
          return campaigns;
        }),
        mergeMap(
          (campaigns: ICampaign[]) => from(campaigns).pipe(
            mergeMap((campaign: ICampaign) => this.getCurrentCard(campaign.id)),
            toArray(),
            map((stampCards: IStampCard[]) => stampCards.filter(card =>
              card.displayProperties.displayCampaignAs && card.displayProperties.displayCampaignAs === stampType
            )),
          )
        ),
      );
  }
}
