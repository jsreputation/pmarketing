import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, } from 'rxjs';
import { map, tap, } from 'rxjs/operators';

import {
  IJsonApiItem,
  IJsonApiItemPayload,
  IJsonApiListPayload,
  IWCampaignAttributes,
  WCampaignStatus,
  WEngagementType,
} from '@perxtech/whistler';

import {
  CampaignState,
  CampaignType,
  IBDOCampaignEnrolment,
  ICampaign,
  ICampaignCategory,
  ICampaignOutcome,
  ICampaignRule,
  IRawCampaigns,
  IReferral
} from './models/campaign.model';
import { ICampaignFilterOptions, ICampaignService } from './icampaign.service';

import { Config } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class WhistlerCampaignService implements ICampaignService {
  private baseUrl: string;
  private pagesCache: { [p: string]: IJsonApiListPayload<IWCampaignAttributes> } = {};
  constructor(private http: HttpClient, config: Config) {
    this.baseUrl = config.apiHost as string;
  }

  private static WhistlerTypeToType(ty: WEngagementType): CampaignType {
    switch (ty) {
      case WEngagementType.games:
        return CampaignType.game;
      case WEngagementType.instantOutcome:
        return CampaignType.give_reward;
      case WEngagementType.loyalty:
        return CampaignType.stamp;
      case WEngagementType.survey:
      default:
        return CampaignType.survey;
    }
  }

  private static CampaignType2WhistlerCampaignType(ct: CampaignType): string {
    switch (ct) {
      case CampaignType.game:
        return 'Perx::Game::Engagement';
      case CampaignType.give_reward:
        return 'Perx::InstantOutcome::Engagement';
      case CampaignType.stamp:
        return 'Perx::Loyalty::Engagement';
      case CampaignType.survey:
        return 'Perx::Survey::Engagement';
    }
    return '';
  }

  private static WCStatus2CampaignState(status?: WCampaignStatus): CampaignState {
    switch (status) {
      case WCampaignStatus.active:
        return CampaignState.active;
      case undefined:
      case WCampaignStatus.ended:
      default:
        return CampaignState.inactive;
    }
  }

  public static WhistlerCampaignToCampaign(campaign: IJsonApiItem<IWCampaignAttributes>): ICampaign {
    const cAttributes = campaign.attributes;
    return {
      id: Number.parseInt(campaign.id, 10),
      name: cAttributes.name,
      description: null,
      type: WhistlerCampaignService.WhistlerTypeToType(cAttributes.engagement_type),
      state: WhistlerCampaignService.WCStatus2CampaignState(cAttributes.status),
      endsAt: cAttributes.end_date_time ? new Date(cAttributes.end_date_time) : null,
      engagementId: cAttributes.engagement_id,
      rawPayload: cAttributes,
      displayProperties: cAttributes.display_properties,
      customFields: {}
    };
  }

  private static startsAfter(c: IJsonApiItem<IWCampaignAttributes>, ts: number): boolean {
    if (c.attributes.start_date_time === null) {
      return true;
    }
    const start = (new Date(c.attributes.start_date_time)).getTime();
    return start < ts;
  }

  private static expiresBefore(c: IJsonApiItem<IWCampaignAttributes>, ts: number): boolean {
    if (!c.attributes.end_date_time || c.attributes.end_date_time === null) {
      return true;
    }
    const end = (new Date(c.attributes.end_date_time)).getTime();
    return end > ts;
  }

  public getCampaigns(options?: ICampaignFilterOptions): Observable<ICampaign[]> {
    return new Observable(subject => {
      let current: ICampaign[] = [];
      const now: number = (new Date()).getTime();
      const process = (p: number, cs: IJsonApiListPayload<IWCampaignAttributes>) => {
        const campaigns = cs.data
          // filter out by campaign date
          .filter(c => WhistlerCampaignService.startsAfter(c, now) && WhistlerCampaignService.expiresBefore(c, now))
          .map(WhistlerCampaignService.WhistlerCampaignToCampaign);
        current = current.concat(campaigns);
        subject.next(current);
        if (!cs.meta || !cs.meta.page_count || p >= cs.meta.page_count) {
          subject.complete();
        } else {
          this.getPage(p + 1, options).subscribe(res => process(p + 1, res));
        }
      };
      return this.getPage(1, options).subscribe(cs => process(1, cs));
    });
  }

  private getPage(n: number, options?: ICampaignFilterOptions): Observable<IJsonApiListPayload<IWCampaignAttributes>> {
    const params: {} = {
      'page[number]': `${n}`
    };
    if (options !== undefined && options.type !== undefined) {
      params['filter[engagement_type]'] = WhistlerCampaignService.CampaignType2WhistlerCampaignType(options.type);
    }
    const signature = JSON.stringify(params);
    if (this.pagesCache[signature]) {
      return of(this.pagesCache[signature]);
    }
    return this.http.get<IJsonApiListPayload<IWCampaignAttributes>>(`${this.baseUrl}/campaign/entities`, { params })
      .pipe(tap(page => this.pagesCache[signature] = page));
  }

  public getCampaign(id: number): Observable<ICampaign> {
    return this.http.get<IJsonApiItemPayload<IWCampaignAttributes>>(`${this.baseUrl}/campaign/entities/${id}`)
      .pipe(
        map((campaigns: IJsonApiItemPayload<IWCampaignAttributes>) => campaigns.data),
        map((campaign: IJsonApiItem<IWCampaignAttributes>) => WhistlerCampaignService.WhistlerCampaignToCampaign(campaign)),
      );
  }

  public getVoucherLeftCount(id: number): Observable<{ count: number; campaignId: number }> {
    return of({ count: 1333, campaignId: id });
  }

  public applyReferral(referralCode: string): Observable<IReferral> {
    return of({ success: referralCode });
  }

  public clearCampaignCache(): void {
  }

  // @ts-ignore
  public getCampaignOutcomes(id: number): Observable<ICampaignOutcome[]> {
    throw new Error('Method not implemented.');
  }

  // @ts-ignore
  public enrolIntoCampaign(campaignId: number): Observable<boolean> {
    throw new Error('Method not implemented.');
  };
  // @ts-ignore
  public getCampaignsRules(campaignId: number): Observable<ICampaignRule[]> {
    throw new Error('Method not implemented.');
  }
  // @ts-ignore
  public bdoCampaignEnrol(id: number, promoID: string, captchaToken: string): Observable<IBDOCampaignEnrolment> {
    throw new Error('Method not implemented.');
  }
  // @ts-ignore
  public searchCampaigns(text: string, page?: number, pageSize?: number, locale?: string): Observable<ICampaign[]> {
    throw new Error('Method not implemented.');
  }
  // @ts-ignore
  public getCampaignsById(ids: number[], pageSize?: number, locale?: string): Observable<ICampaign[]> {
    throw new Error('Method not implemented.');
  }
  // @ts-ignore
  public getCategories(): Observable<ICampaignCategory[]> {
    throw new Error('Method not implemented.');
  }
  // @ts-ignore
  public getCampaignsWithMeta(options?: ICampaignFilterOptions): Observable<IRawCampaigns> {
    throw new Error('Method not implemented.');
  }
}
