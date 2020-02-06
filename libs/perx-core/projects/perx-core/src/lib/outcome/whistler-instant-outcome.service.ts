import { InstantOutcomeService } from './instant-outcome.service';
import { IOutcome } from './models/outcome.model';
import { Observable, combineLatest, throwError, of } from 'rxjs';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config/config';
import {
  IWInstantOutcomeDisplayProperties,
  IWInstantOutcomeTransactionAttributes,
  IWInstantOutcomeTxnReq,
  IWInstantOutcomeEngagementAttributes,
  IWCampaignAttributes,
  IJsonApiItemPayload,
  IJsonApiItem,
  IWCampaignProperties,
  IWCampaignDisplayProperties,
  IJsonApiPostItem,
  WInstantOutcomeStatus,
  IWAssignedAttributes
} from '@perx/whistler';
import { IEngagementTransaction } from '../game/game.model';
import { IVoucher } from '../vouchers/models/voucher.model';
import { IVoucherService } from '../vouchers/ivoucher.service';
import { WhistlerVouchersService } from '../vouchers/whistler-vouchers.service';

@Injectable({
  providedIn: 'root'
})
export class WhistlerInstantOutcomeService implements InstantOutcomeService {
  private baseUrl: string;

  constructor(
    private http: HttpClient,
    private config: Config,
    private voucherService: IVoucherService
  ) {
    this.baseUrl = `${config.apiHost}/instant-outcome/transactions/`;
  }

  private get whistlerVoucherService(): WhistlerVouchersService {
    return this.voucherService as WhistlerVouchersService;
  }
  
  private getEngagementId(
    campaignId: number
  ): Observable<IWCampaignProperties | never> {
    return this.http
      .get<IJsonApiItemPayload<IWCampaignAttributes>>(
        `${this.config.apiHost}/campaign/entities/${campaignId}`
      )
      .pipe(
        switchMap(res =>
          !(res.data && res.data.attributes)
            ? throwError(`Unable to find Response`)
            : of({
              engagementId: res.data.attributes.engagement_id,
              display_properties: res.data.attributes.display_properties || {}
            })
        )
      );
  }

  // usage is to get return from pipe to call other functions
  public getFromCampaign(campaignId: number): Observable<IOutcome> {
    let displayProps: IWCampaignDisplayProperties;
    return this.getEngagementId(campaignId).pipe(
      switchMap((campaign: IWCampaignProperties) => {
        displayProps = campaign.display_properties || {};
        return this.http.get<
          IJsonApiItemPayload<IWInstantOutcomeEngagementAttributes>
        >(
          `${this.config.apiHost}/instant-outcome/engagements/${
            campaign.engagementId
          }?campaign_id=${campaignId}`
        );
      }),
      map(res => res.data.attributes.display_properties),
      map((outcomeData: IWInstantOutcomeDisplayProperties) => ({
        title: outcomeData.title,
        subTitle: outcomeData.sub_title,
        button: outcomeData.button,
        banner: outcomeData.banner,
        backgroundImgUrl: outcomeData.background_img_url,
        cardBackgroundImgUrl: outcomeData.card_background_img_url,
        displayProperties: { ...outcomeData.displayProperties, ...displayProps }
      }))
    );
  }

  public claim(campaignId: number): Observable<IVoucher[]> {
    const buildBody: Observable<IJsonApiPostItem<IWInstantOutcomeTxnReq>> =
    this.getEngagementId(campaignId)
      .pipe(
        map((campaign: IWCampaignProperties ): IJsonApiPostItem<IWInstantOutcomeTxnReq> => ({
          data: {
            type: 'transactions',
            attributes: {
              engagement_id: campaign.engagementId,
              campaign_entity_id: campaignId,
              status: WInstantOutcomeStatus.confirmed
            }
          }
        }))
      );

    return buildBody.pipe(
      switchMap(
        (body: IJsonApiPostItem<IWInstantOutcomeTxnReq>): Observable<IJsonApiItemPayload<IWInstantOutcomeTransactionAttributes>> =>
          this.http.post<IJsonApiItemPayload<IWInstantOutcomeTransactionAttributes>>(
            `${this.baseUrl}`,
            body,
            { headers: { 'Content-Type': 'application/vnd.api+json' } }
          )
      ),
      map((res: IJsonApiItemPayload<IWInstantOutcomeTransactionAttributes>) => res.data),
      map((data: IJsonApiItem<IWInstantOutcomeTransactionAttributes>) => data.attributes.results),
      switchMap(results => results !== undefined ? of(results) : throwError('Empty results object')),
      mergeMap(
        res => (
          combineLatest(...res.attributes.results.map(
            (result: IJsonApiItem<IWAssignedAttributes>) => this.whistlerVoucherService.getFullVoucher(result)
          ))
        )
      )
    );
  }

  public prePlay(campaignId?: number): Observable<IEngagementTransaction> {
    if (!campaignId) {
      return throwError('Missing campaign Id');
    }

    return this.getEngagementId(campaignId).pipe(
      map((campaign: IWCampaignProperties): IJsonApiPostItem<IWInstantOutcomeTxnReq> => ({
        data: {
          type: 'transactions',
          attributes: {
            engagement_id: campaign.engagementId,
            campaign_entity_id: campaignId,
            status: WInstantOutcomeStatus.reserved
          }
        }
      })
      ),
      switchMap((body: IJsonApiPostItem<IWInstantOutcomeTxnReq>) =>
        this.http.post<IJsonApiItemPayload<IWInstantOutcomeTransactionAttributes>>(
          `${this.config.apiHost}/instant-outcome/transactions`,
          body,
          { headers: { 'Content-Type': 'application/vnd.api+json' } }
        )
      ),
      map(res => {
        const rewardIds: number[] = res.data.attributes.results ? res.data.attributes.results.attributes.results.map(
          (outcome: IJsonApiItem<IWAssignedAttributes>) => outcome.attributes.source_id) : [];
        return {
          id: Number.parseInt(res.data.id, 10),
          rewardIds
        };
      })
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
    return this.http
      .patch<IJsonApiItemPayload<IWInstantOutcomeTransactionAttributes>>(
        `${this.config.apiHost}/instant-outcome/transactions/${transactionId}`,
        body,
        { headers: { 'Content-Type': 'application/vnd.api+json' } }
      )
      .pipe(map(() => void 0));
  }
}
