import { IJsonApiPostItem } from './../jsonapi.payload';
import { InstantOutcomeService } from './instant-outcome.service';
import { IOutcome } from './models/outcome.model';
import { Observable, combineLatest } from 'rxjs';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config/config';
import { IReward } from '../rewards/models/reward.model';
import { IJsonApiItemPayload, IJsonApiItem } from '../jsonapi.payload';
import { RewardsService } from '../rewards/rewards.service';
import {
  IInstantOutcomeTransactionAttributes,
  IInstantOutcomeTxnReq,
  IWInstantOutcomeEngagementAttributes,
  IWOutcomeDisplayProperties,
  ICampaignAttributes,
  IAssignedAttributes
} from '@perx/whistler';

import { ICampaignDisplayProperties } from '../perx-core.models';

interface CampaignProperties {
  engagementId: number;
  display_properties: ICampaignDisplayProperties;
}

@Injectable({
  providedIn: 'root'
})
export class WhistlerInstantOutcomeService implements InstantOutcomeService {
  private baseUrl: string;

  constructor(private http: HttpClient, private config: Config, private rewardsService: RewardsService) {
    this.baseUrl = `${config.apiHost}/instant-outcome/transactions/`;
  }

  private getEngagementId(campaignId: number): Observable<CampaignProperties> {
    return this.http.get<IJsonApiItemPayload<ICampaignAttributes>>(
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
    let displayProps: ICampaignDisplayProperties;
    return this.getEngagementId(campaignId)
      .pipe(
        switchMap((campaign: CampaignProperties) => {
          displayProps = campaign.display_properties;
          return this.http.get<IJsonApiItemPayload<IWInstantOutcomeEngagementAttributes>>(
            `${this.config.apiHost}/instant-outcome/engagements/${campaign.engagementId}`);
        }),
        map(res => res.data.attributes.display_properties),
        map((outcomeData: IWOutcomeDisplayProperties) =>
          ({ ...outcomeData, displayProperties: { ...outcomeData.displayProperties, ...displayProps } }))
      );
  }

  public claim(campaignId: number): Observable<IReward[]> {
    const buildBody: Observable<IJsonApiPostItem<IInstantOutcomeTxnReq>> = this.getEngagementId(campaignId)
      .pipe(
        map((campaign: CampaignProperties): IJsonApiPostItem<IInstantOutcomeTxnReq> => ({
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
      switchMap((body: IJsonApiPostItem<IInstantOutcomeTxnReq>): Observable<IJsonApiItemPayload<IInstantOutcomeTransactionAttributes>> =>
        this.http.post<IJsonApiItemPayload<IInstantOutcomeTransactionAttributes>>(
          `${this.baseUrl}`,
          body,
          { headers: { 'Content-Type': 'application/vnd.api+json' } }
        )
      ),
      map((res: IJsonApiItemPayload<IInstantOutcomeTransactionAttributes>) => res.data),
      map((data: IJsonApiItem<IInstantOutcomeTransactionAttributes>) => data.attributes.results),
      map(results => results.attributes.results),
      map((results): number[] => results.map(result => result.attributes.source_id))
    );

    return getRewardIds.pipe(
      map((ids: number[]): Observable<IReward>[] => ids.map(id => this.rewardsService.getReward(id))),
      mergeMap((queries: Observable<IReward>[]): Observable<IReward[]> => combineLatest(...queries))
    );
  }

  public prePlay(engagementId: number, campaignId?: number): Observable<IReward[]> {
    const body = {
      data: {
        type: 'transactions',
        attributes: {
          engagement_id: engagementId,
          campaign_entity_id: campaignId,
          status: 'reserved'
        }
      }
    };
    return this.http.post<IJsonApiItemPayload<IInstantOutcomeTransactionAttributes>>(
      `${this.config.apiHost}/instant-outcome/transactions`,
      body,
      { headers: { 'Content-Type': 'application/vnd.api+json' } }
    ).pipe(
      mergeMap(res => (
        combineLatest(...res.data.attributes.results.attributes.results.map(
          (outcome: IJsonApiItem<IAssignedAttributes>) => this.rewardsService.getReward(Number.parseInt(outcome.id, 10))
        )).pipe(
          map((vouchArr) => vouchArr.reduce((acc, currVouch) =>
            ({ ...acc, vouchers: [...acc.vouchers, currVouch] }), { vouchers: []})
          ))
      ))
    );
  }
  public prePlayConfirm(transactionId: number): Observable<void> {
    const body = {
      data: {
        type: 'transactions',
        id: transactionId,
        attributes: {
          status: 'confirmed'
        }
      }
    };
    return this.http.patch<IJsonApiItemPayload<IInstantOutcomeTransactionAttributes>>(
      `${this.config.apiHost}/instant-outcome/transactions/${transactionId}`,
      body,
      { headers: { 'Content-Type': 'application/vnd.api+json' } }
    ).pipe(
      map(() => { return; })
    );
  }

}
