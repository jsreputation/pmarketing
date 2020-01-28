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
  IJsonApiItemPayload,
  IJsonApiItem,
  IWCampaignDisplayProperties,
  IWAttbsObjStamp,
  IWCampaignAttributes,
} from '@perx/whistler';
import { oc } from 'ts-optchain';
import { ICampaignService } from '../campaign/icampaign.service';
import { CampaignType } from '../campaign/models/campaign.model';

@Injectable({
  providedIn: 'root'
})
export class WhistlerStampService implements StampService {
  public baseUrl: string;
  private cache: { [cid: number]: IStampCard } = {};

  constructor(
    private http: HttpClient,
    config: Config,
    private cs: ICampaignService
  ) {
    this.baseUrl = `${config.apiHost}`;
  }

  private static WStampCardToStampCard(stampCard: IJsonApiItem<IWAttbsObjStamp>): IStampCard {
    const attributesObj = stampCard.attributes as IWAttbsObjStamp;
    return {
      title: attributesObj.display_properties.title,
      subTitle: oc(attributesObj).display_properties.sub_title(),
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
    let disProp: IWCampaignDisplayProperties | undefined;
    if (this.cache[campaignId]) {
      return of(this.cache[campaignId]);
    }
    return this.http.get<IJsonApiItemPayload<IWCampaignAttributes>>(`${this.baseUrl}/campaign/entities/${campaignId}`)
      .pipe(
        map(res => res.data.attributes),
        switchMap(correctEntityAttribute => {
          disProp = correctEntityAttribute.display_properties;
          return this.http.get<IJsonApiItemPayload<IWAttbsObjStamp, void>>(
            `${this.baseUrl}/loyalty/engagements/${correctEntityAttribute.engagement_id}`
          );
        }),
        map((res: IJsonApiItemPayload<IWAttbsObjStamp, void>) => {
          const stampData: IStampCard = WhistlerStampService.WStampCardToStampCard(res.data);
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

  // @ts-ignore
  public getActiveCards(stampType?: string): Observable<IStampCard[]> {
    return this.cs.getCampaigns({ type: CampaignType.stamp })
      .pipe(map(() => []));
    // return throwError('getActiveCards - Not implemented yet');
  }
}
