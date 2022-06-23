import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { oc } from 'ts-optchain';
import { from, Observable, of, throwError, timer } from 'rxjs';
import { filter, flatMap, map, mergeAll, mergeMap, scan, share, skip, switchMap, tap, toArray } from 'rxjs/operators';

import { IStamp, IStampCard, IStampOutcome, StampCardState, StampState, } from './models/stamp.model';

import { IVoucher } from '../vouchers/models/voucher.model';
import { IVoucherService } from '../vouchers/ivoucher.service';
import { StampService } from './stamp.service';
import { ICampaignService } from '../campaign/icampaign.service';
import {  CampaignOutcomeType, CampaignType, ICampaign } from '../campaign/models/campaign.model';
import { ConfigService } from '../config/config.service';
import { IConfig } from '../config/models/config.model';
import { Asset } from '../quest/v4-quest.service';
import { IV4AdditionalSection, IV4CampaignOutcome, V4CampaignService } from '../campaign/v4-campaign.service';

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
  outcomes?: IV4StampOutcome[];
}

export interface IV4StampOutcome {
  id: number;
  actual_outcome_type: CampaignOutcomeType; // todo: this has always been mapped incorrectly
  actual_outcome_id: number;
  campaign_prize_type: CampaignOutcomeType;
  campaign_prize_id: number;
  state: string;
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

interface IV4StampCard {
  id: number;
  user_account_id: number;
  team_id?: number;
  state: StampCardState;
  campaign_id: number;
  card_number: number;
  campaign_config?: {
    total_slots: number;
    rewards: IV4CampaignOutcome[];
  };
  display_properties: StampCampaignDisplayProperties
  stamps?: IV4Stamp[];
}

export interface StampCampaignDisplayProperties {
  landing_page?: {
    header?: {
      type: string;
      value: {
        title: string;
        description: string;
      }
    };
    body?: { en: { text: string } };
    media?: { youtube?: string; banner_image?: Asset;};
    heading: string;
    button_text?: { en: { text: string } };
    button_text2?: { en: { text: string } };
    tnc?: { en: { text: string } };
    sub_heading?: string;
    additional_sections?: IV4AdditionalSection [];
    sub_headline?:string;
  };
  button_text?: string;
  cols?: number;
  rows?: number;
  header?: {
    value: {
      title: string;
      description: string;
    }
  }
  card_image?: {
    value?: {
      image_url?: string;
      file?: string; // default if image_url is not present
    }
  };
  //  todo: temporarily map this until v4 dashboard fixes naming
  card_background_image?: {
    value?: {
      image_url?: string;
      file?: string;
    }
  };
  gift_active_image?: {
    value?: {
      image_url?: string;
      file?: string;
    }
  };
  stamp_active_image?: {
    value?: {
      image_url?: string;
      file?: string;
    }
  };
  gift_inactive_image?: {
    value?: {
      image_url?: string;
      file?: string;
    }
  };
  stamp_inactive_image?: {
    value?: {
      image_url?: string;
      file?: string;
    }
  };
  total_slots?: number;
  display_campaign_as: string;
  background_image?: {
    value?: {
      image_url?: string;
      file?: string;
    }
  };
  thumbnail_image?: {
    value?: {
      image_url?: string;
      file?: string;
    }
  };
  reward_positions?: number[];
  button_Bg_colour?: string;
  button_text_colour?: string;
  risk_disclaimer?: string;
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
    private configService: ConfigService,
    private vouchersService: IVoucherService,
    private campaignService: ICampaignService
  ) {
    this.configService.readAppConfig().subscribe(
      (config: IConfig<void>) => {
        this.baseUrl = config.apiHost as string;
      });
  }

  private static v4StampToStamp(stamp: IV4Stamp): IStamp {
    const outcomes = stamp.outcomes && stamp.outcomes.map(outcome => V4StampService.v4StampOutcomeToStampOutcome(outcome));

    return {
      id: stamp.id,
      userAccountId: stamp.user_account_id,
      stampCardId: stamp.stamp_card_id,
      state: stamp.state,
      createdAt: stamp.created_at,
      updatedAt: stamp.updated_at,
      campaignId: stamp.campaign_id,
      vouchers: stamp.vouchers,
      ...(outcomes && outcomes.length && { outcomes }),
    };
  }

  private static v4StampCardToStampCard(stampCard: IV4StampCard): IStampCard {
    const stampCardDP = oc(stampCard).display_properties;
    const cardImageUrl = stampCardDP.card_image.value.image_url(
      stampCardDP.card_image.value.file(undefined) as unknown as string
    );
    const cardImage = cardImageUrl ? { value: { imageUrl: cardImageUrl } } : undefined;
    //  todo: temporarily map this until v4 dashboard fixes naming
    const cardBackgroundImageUrl = stampCardDP.card_background_image.value.image_url(
      stampCardDP.card_background_image.value.file(undefined) as unknown as string
    );
    const cardBackgroundImage = cardBackgroundImageUrl ? { value: { imageUrl: cardBackgroundImageUrl } } : undefined;
    const rewardPreStamp = stampCardDP.gift_inactive_image.value.image_url(
      stampCardDP.gift_inactive_image.value.file(undefined) as unknown as string
    );
    const rewardPostStamp = stampCardDP.gift_active_image.value.image_url(
      stampCardDP.gift_active_image.value.file(undefined) as unknown as string
    );
    const preStampImg = stampCardDP.stamp_inactive_image.value.image_url(
      stampCardDP.stamp_inactive_image.value.file(undefined) as unknown as string
    );
    const postStampImg = stampCardDP.stamp_active_image.value.image_url(
      stampCardDP.stamp_active_image.value.file(undefined) as unknown as string
    );
    const backgroundImgUrl = stampCardDP.background_image.value.image_url(
      stampCardDP.background_image.value.file(undefined) as unknown as string
    );
    const backgroundImg = backgroundImgUrl ? { value: { imageUrl: backgroundImgUrl } } : undefined;
    return {
      id: stampCard.id,
      teamId: stampCard.team_id,
      title: oc(stampCard).display_properties.header.value.title(),
      subTitle: oc(stampCard).display_properties.header.value.description(),
      userAccountId: stampCard.user_account_id,
      state: stampCard.state,
      campaignId: stampCard.campaign_id,
      cardNumber: stampCard.card_number,
      campaignConfig: {
        totalSlots: oc(stampCard).campaign_config.total_slots(0),
        rewards: oc(stampCard).campaign_config.rewards([])
          .map((rewards: IV4CampaignOutcome) => V4CampaignService.v4CampaignOutcomeToCampaignOutcome(rewards)),
      },
      results: {},
      displayProperties: {
        // They value pass from backend is actually number of items per col, so I need to switch
        numberOfRows: stampCard.display_properties.cols,
        numberOfCols: stampCard.display_properties.rows,
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
        thumbnailImg: oc(stampCard).display_properties.thumbnail_image.value.image_url(),
        buttonBgColour: stampCard.display_properties.button_Bg_colour,
        buttonTextColour: stampCard.display_properties.button_text_colour
      },
      stamps: stampCard.stamps ? stampCard.stamps.map((stamp: IV4Stamp) => V4StampService.v4StampToStamp(stamp)) : undefined,
      buttonText: stampCard.display_properties.button_text
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
      )),
      share()
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

  // pipe pairwise inside the component,bcz get Proxy for some reason, unable to get access to the value cached in svc
  public stampsChangedForStampCard(campaignId: number, intervalPeriod: number = 1500): Observable<IStampCard> {
    return timer(0, intervalPeriod).pipe(
      switchMap((_) => this.getCurrentCard(campaignId)),
      skip(1)
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

  public static v4StampOutcomeToStampOutcome(outcome: IV4StampOutcome): IStampOutcome {
    return {
      actualOutcomeId: outcome.actual_outcome_id,
      outcomeType: outcome.campaign_prize_type,
      state: outcome.state,
      prizeId: outcome.campaign_prize_id
    };
  }
}
