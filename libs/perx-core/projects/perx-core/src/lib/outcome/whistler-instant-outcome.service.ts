import { InstantOutcomeService } from './instant-outcome.service';
import { IOutcome } from './models/outcome.model';
import { Observable, combineLatest } from 'rxjs';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config/config';
import { IReward } from '../rewards/models/reward.model';
import { RewardsService } from '../rewards/rewards.service';
import {
  IWInstantOutcomeTransactionAttributes,
  IWInstantOutcomeTxnReq,
  IWInstantOutcomeEngagementAttributes,
  IWOutcomeDisplayProperties,
  IWCampaignAttributes,
  IJsonApiItemPayload,
  IJsonApiItem,
  IWCampaignProperties,
  IWCampaignDisplayProperties,
  IJsonApiPostItem,
} from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class WhistlerInstantOutcomeService implements InstantOutcomeService {
  private baseUrl: string;

  constructor(private http: HttpClient, private config: Config, private rewardsService: RewardsService) {
    this.baseUrl = `${config.apiHost}/instant-outcome/transactions/`;
  }

  private getEngagementId(campaignId: number): Observable<IWCampaignProperties> {
    return this.http.get<IJsonApiItemPayload<IWCampaignAttributes>>(
      `${this.config.apiHost}/campaign/entities/${campaignId}`
    )
      .pipe(
        map(res => res.data.attributes),
        map(attributes => ({
          engagementId: attributes.engagement_id,
          display_properties: attributes.display_properties
        })),
      );
  }

  // usage is to get return from pipe to call other functions
  public getFromCampaign(campaignId: number): Observable<IOutcome> {
    let displayProps: IWCampaignDisplayProperties;
    return this.getEngagementId(campaignId)
      .pipe(
        switchMap((campaign: IWCampaignProperties) => {
          displayProps = campaign.display_properties;
          return this.http.get<IJsonApiItemPayload<IWInstantOutcomeEngagementAttributes>>(
            `${this.config.apiHost}/instant-outcome/engagements/${campaign.engagementId}`);
        }),
        map(res => res.data.attributes.display_properties),
        map((outcomeData: IWOutcomeDisplayProperties) =>
          ({
            title: outcomeData.title, subTitle: outcomeData.sub_title, button: outcomeData.button,
            banner: outcomeData.banner, backgroundImgUrl: outcomeData.background_img_url,
            cardBackgroundImgUrl: outcomeData.card_background_img_url,
            displayProperties: { ...outcomeData.displayProperties, ...displayProps }
          })
        ));
  }

  // @ts-ignore
  public claim(campaignId: number): Observable<IReward[]> {
    const buildBody: Observable<IJsonApiPostItem<IWInstantOutcomeTxnReq>> = this.getEngagementId(campaignId)
      .pipe(
        map((campaign: IWCampaignProperties): IJsonApiPostItem<IWInstantOutcomeTxnReq> => ({
          data: {
            type: 'transactions',
            attributes: {
              engagement_id: campaign.engagementId,
              campaign_entity_id: campaignId
            }
          }
        }))
      );

    const getRewardIds: Observable<number[]> = buildBody.pipe(
      switchMap(
        (body: IJsonApiPostItem<IWInstantOutcomeTxnReq>): Observable<IJsonApiItemPayload<IWInstantOutcomeTransactionAttributes>> =>
          this.http.post<IJsonApiItemPayload<IWInstantOutcomeTransactionAttributes>>(
            `${this.baseUrl}`,
            body,
            {headers: {'Content-Type': 'application/vnd.api+json'}}
          )
      ),
      map((res: IJsonApiItemPayload<IWInstantOutcomeTransactionAttributes>) => res.data),
      map((data: IJsonApiItem<IWInstantOutcomeTransactionAttributes>) => data.attributes.results),
      map(results => results.attributes.results),
      map((results): number[] => results.map(result => result.attributes.source_id))
    );

    return getRewardIds.pipe(
      map((ids: number[]): Observable<IReward>[] => ids.map(id => this.rewardsService.getReward(id))),
      mergeMap((queries: Observable<IReward>[]): Observable<IReward[]> => combineLatest(...queries))
    );
  }
}
