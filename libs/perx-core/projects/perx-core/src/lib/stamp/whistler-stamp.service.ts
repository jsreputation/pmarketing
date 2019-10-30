import { switchMap, map, tap } from 'rxjs/operators';
import {
  IStampCard,
  IStamp,
  StampCardState
} from './models/stamp.model';
import { IJsonApiItemPayload, IJsonApiItem } from '../jsonapi.payload';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config/config';
import { StampService } from './stamp.service';
import { Injectable } from '@angular/core';

interface AttbsObjEntity {
  urn: string;
  created_at: string;
  updated_at: string;
  name: string;
  status: string;
  goal: null;
  start_date_time: null;
  end_date_time: null;
  comm_channel: null;
  engagement_type: string;
  engagement_id: number;
  pool_id: null;
  display_properties?: any;
}

interface AttbsObjStamp {
  urn: string;
  created_at: string;
  updated_at: string;
  title: string;
  description: string;
  image_url: string;
  properties: object;
  display_properties: {
    slots: number[];
    title: string;
    sub_title?: string;
    button: string;
    nb_of_slots: number;
    pre_stamp_img_url: string;
    post_stamp_img_url: string;
    reward_pre_stamp_img_url: string;
    reward_post_stamp_img_url: string;
    card_background_img_url: string;
    background_img_url: string;
    display_campaign_as: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class WhistlerStampService implements StampService {
  public baseUrl: string;
  private cache: { [cid: number]: IStampCard } = {};

  constructor(
    private http: HttpClient,
    config: Config
  ) {
    this.baseUrl = `${config.apiHost}`;
  }

  private static WStampCardToStampCard(stampCard: IJsonApiItem<AttbsObjStamp>): IStampCard {
    const attributesObj = stampCard.attributes as AttbsObjStamp;
    return {
      title: attributesObj.display_properties.title,
      subTitle: attributesObj.display_properties.sub_title ? attributesObj.display_properties.sub_title : null,
      buttonText: attributesObj.display_properties.button,
      id: +stampCard.id,
      state: StampCardState.active,
      campaignConfig: {
        totalSlots: attributesObj.display_properties.nb_of_slots,
        collectionRewards:
          attributesObj.display_properties.slots.map(position => (
            { rewardPosition: position - 1 }
          )
          )
      },
      displayProperties: {
        preStampImg: attributesObj.display_properties.pre_stamp_img_url,
        postStampImg: attributesObj.display_properties.post_stamp_img_url,
        rewardPreStamp: attributesObj.display_properties.reward_pre_stamp_img_url,
        rewardPostStamp: attributesObj.display_properties.reward_post_stamp_img_url,
        bgImage: attributesObj.display_properties.background_img_url,
        cardBgImage: attributesObj.display_properties.card_background_img_url,
        displayCampaignAs: attributesObj.display_properties.display_campaign_as,
      }
    };
  }

  public getCards(campaignId: number): Observable<IStampCard[]> {
    return this.getCurrentCard(campaignId)
      .pipe(map((card: IStampCard) => [card]));
  }

  public getCurrentCard(campaignId: number): Observable<IStampCard> {
    let propertiesFromCampaign: any;
    if (this.cache[campaignId]) {
      return of(this.cache[campaignId]);
    }
    return this.http.get<IJsonApiItemPayload<AttbsObjEntity>>(`${this.baseUrl}/campaign/entities/${campaignId}`)
      .pipe(
        map(res => res.data.attributes),
        switchMap(correctEntityAttribute => {
          propertiesFromCampaign = correctEntityAttribute.display_properties;
          return this.http.get<IJsonApiItemPayload<AttbsObjStamp>>(
            `${this.baseUrl}/loyalty/engagements/${correctEntityAttribute.engagement_id}`
          );
        }),
        map((res) => ({ ...WhistlerStampService.WStampCardToStampCard(res.data), campaignId, propertiesFromCampaign })),
        tap(sc => this.cache[campaignId] = sc)
      );
  }

  public getStamps(campaignId: number): Observable<IStamp[]> {
    throw new Error(`Method not implemented. ${campaignId}`);
  }

  public putStamp(stampId: number): Observable<IStamp> {
    throw new Error(`Method not implemented. ${stampId}`);
  }

  public stampAll(cardId: number): Observable<IStamp[]> {
    throw new Error(`Method not implemented. ${cardId}`);
  }
}
