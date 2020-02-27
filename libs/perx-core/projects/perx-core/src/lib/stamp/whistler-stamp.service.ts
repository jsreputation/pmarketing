import { switchMap, map, tap, mergeMap, distinctUntilChanged } from 'rxjs/operators';
import {
  IStampCard,
  IStamp,
  StampCardState,
} from './models/stamp.model';
import { Observable, of, combineLatest, ReplaySubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config/config';
import { StampService } from './stamp.service';
import { Injectable } from '@angular/core';

import {
  IJsonApiItemPayload,
  IJsonApiItem,
  IWAttbsObjStamp,
} from '@perx/whistler';
import { oc } from 'ts-optchain';
import { ICampaignService } from '../campaign/icampaign.service';
import { CampaignType, ICampaign } from '../campaign/models/campaign.model';

@Injectable({
  providedIn: 'root'
})
export class WhistlerStampService implements StampService {
  public baseUrl: string;
  private cache: { [cid: number]: IStampCard } = {};
  private engagementCacheQuery: { [cid: number]: Subject<IStampCard> } = {};

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
      results: {},
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
    if (this.cache[campaignId]) {
      return of(this.cache[campaignId]);
    }

    return this.cs.getCampaign(campaignId)
      .pipe(
        switchMap(campaign => this.getEngagement(campaign.rawPayload.engagement_id)),
        map((res: IStampCard) => ({ ...res, campaignId })),
        tap(sc => this.cache[campaignId] = sc)
      );
  }

  public getStamps(campaignId: number): Observable<IStamp[]> {
    throw new Error(`Method not implemented. ${campaignId}`);
  }

  public stampsChangedForStampCard(campaignId: number): Observable<IStampCard> {
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
      .pipe(
        mergeMap(
          (cs: ICampaign[]) => combineLatest([...cs.map(c => of(c)), ...cs.map(c => this.getEngagement(c.rawPayload.engagement_id))])
        ),
        map((res: (ICampaign | IStampCard)[]) => {
          const campaigns: ICampaign[] = res.splice(0, res.length / 2) as ICampaign[];
          const cards = res as IStampCard[];

          for (let i = 0; i < cards.length; i++) {
            cards[i].campaignId = campaigns[i].id;
            cards[i].displayProperties.thumbnailImg = cards[i].displayProperties.thumbnailImg ?
              cards[i].displayProperties.thumbnailImg : cards[i].displayProperties.rewardPostStamp;
          }
          return cards;
        })
      );
  }

  private getEngagement(engagementId: number): Observable<IStampCard> {
    if (!this.engagementCacheQuery[engagementId]) {
      this.engagementCacheQuery[engagementId] = new ReplaySubject();

      this.http.get<IJsonApiItemPayload<IWAttbsObjStamp, void>>(`${this.baseUrl}/loyalty/engagements/${engagementId}`)
        .pipe(
          map((res: IJsonApiItemPayload<IWAttbsObjStamp, void>) => WhistlerStampService.WStampCardToStampCard(res.data))
        )
        .subscribe((sc: IStampCard) => this.engagementCacheQuery[engagementId].next(sc));
    }
    return this.engagementCacheQuery[engagementId].pipe(distinctUntilChanged());
  }
}
