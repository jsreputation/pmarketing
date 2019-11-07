import { switchMap, map, tap } from 'rxjs/operators';
import {
  IStampCard,
  IStamp,
  StampCardState,
} from './models/stamp.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config/config';
import { StampService } from './stamp.service';
import { Injectable } from '@angular/core';

import {
  IWJsonApiItemPayload,
  IWJsonApiItem,
  IWCampaignDisplayProperties,
  IWAttbsObjStamp,
  IWAttbsObjEntity,
} from '@perx/whistler';

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

  private static WStampCardToStampCard(stampCard: IWJsonApiItem<IWAttbsObjStamp>): IStampCard {
    const attributesObj = stampCard.attributes as IWAttbsObjStamp;
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
    let disProp: IWCampaignDisplayProperties;
    if (this.cache[campaignId]) {
      return of(this.cache[campaignId]);
    }
    return this.http.get<IWJsonApiItemPayload<IWAttbsObjEntity>>(`${this.baseUrl}/campaign/entities/${campaignId}`)
      .pipe(
        map(res => res.data.attributes),
        switchMap(correctEntityAttribute => {
          disProp = correctEntityAttribute.display_properties;
          return this.http.get<IWJsonApiItemPayload<IWAttbsObjStamp>>(
            `${this.baseUrl}/loyalty/engagements/${correctEntityAttribute.engagement_id}`
          );
        }),
        map((res) => {
          const stampData = WhistlerStampService.WStampCardToStampCard(res.data);
          return { ...stampData, campaignId, displayProperties: { ...stampData.displayProperties, ...disProp } };
        }),
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

  public play(): Observable<boolean> {
    return of(true);
  }
}
