import { Injectable } from '@angular/core';
import { ICampaignService } from './icampaign.service';
import { Observable, of } from 'rxjs';
import { ICampaign, CampaignType, CampaignState } from './models/campaign.model';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config/config';
import { map, tap } from 'rxjs/operators';

import {
  IWCampaignAttributes,
  IWJsonApiListPayload,
  IWJsonApiItem,
  IWJsonApiItemPayload,
  WEngagementType,
} from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class WhistlerCampaignService implements ICampaignService {
  private baseUrl: string;
  private pagesCache: { [p: number]: IWJsonApiListPayload<IWCampaignAttributes> } = {};
  constructor(private http: HttpClient, config: Config) {
    this.baseUrl = config.apiHost as string;
  }

  private static WhistlerTypeToType(ty: string): CampaignType {
    return WEngagementType[ty];
  }

  public static WhistlerCampaignToCampaign(campaign: IWJsonApiItem<IWCampaignAttributes>): ICampaign {
    const cAttributes = campaign.attributes;
    return {
      id: Number.parseInt(campaign.id, 10),
      name: cAttributes.name,
      description: cAttributes.goal,
      type: WhistlerCampaignService.WhistlerTypeToType(cAttributes.engagement_type),
      state: cAttributes.status as CampaignState,
      endsAt: cAttributes.end_date_time ? new Date(cAttributes.end_date_time) : null,
      engagementId: cAttributes.engagement_id,
      rawPayload: cAttributes,
      displayProperties: cAttributes.display_properties,
    };
  }

  private static startsAfter(c: IWJsonApiItem<IWCampaignAttributes>, ts: number): boolean {
    if (c.attributes.start_date_time === null) {
      return true;
    }
    const start = (new Date(c.attributes.start_date_time)).getTime();
    return start < ts;
  }

  private static expiresBefore(c: IWJsonApiItem<IWCampaignAttributes>, ts: number): boolean {
    if (!c.attributes.end_date_time || c.attributes.end_date_time === null) {
      return true;
    }
    const end = (new Date(c.attributes.end_date_time)).getTime();
    return end > ts;
  }

  public getCampaigns(): Observable<ICampaign[]> {
    return new Observable(subject => {
      let current: ICampaign[] = [];
      const now: number = (new Date()).getTime();
      const process = (p: number, cs: IWJsonApiListPayload<IWCampaignAttributes>) => {
        const campaigns = cs.data
          // filter out by campaign date
          .filter(c => WhistlerCampaignService.startsAfter(c, now) && WhistlerCampaignService.expiresBefore(c, now))
          .map(WhistlerCampaignService.WhistlerCampaignToCampaign);
        current = current.concat(campaigns);
        subject.next(current);
        if (p >= cs.meta.page_count) {
          subject.complete();
        } else {
          this.getPage(p + 1).subscribe(res => process(p + 1, res));
        }
      };
      this.getPage(1).subscribe(cs => process(1, cs));
    });
  }

  private getPage(n: number): Observable<IWJsonApiListPayload<IWCampaignAttributes>> {
    if (this.pagesCache[n]) {
      return of(this.pagesCache[n]);
    }
    return this.http.get<IWJsonApiListPayload<IWCampaignAttributes>>(`${this.baseUrl}/campaign/entities?page[number]=${n}`)
      .pipe(tap(page => this.pagesCache[n] = page));
  }

  public getCampaign(id: number): Observable<ICampaign> {
    return this.http.get<IWJsonApiItemPayload<IWCampaignAttributes>>(`${this.baseUrl}/campaign/entities/${id}`)
      .pipe(
        map((campaigns: IWJsonApiItemPayload<IWCampaignAttributes>) => campaigns.data),
        map((campaign: IWJsonApiItem<IWCampaignAttributes>) => WhistlerCampaignService.WhistlerCampaignToCampaign(campaign)),
      );
  }
}
