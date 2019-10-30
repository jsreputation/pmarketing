import { Injectable } from '@angular/core';
import { ICampaignService } from './icampaign.service';
import { Observable, of } from 'rxjs';
import { ICampaign, CampaignState, CommChannel, CampaignType } from './models/campaign.model';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config/config';
import { map, tap } from 'rxjs/operators';
import { IJsonApiListPayload, IJsonApiItem, IJsonApiItemPayload } from '../jsonapi.payload';

enum WhistlerCampaignType {
  survey = 'survey',
  loyalty = 'stamp',
  instant_outcome = 'give_reward',
  game = 'game'
}

interface IWhistlerCampaignAttributes {
  name: string;
  goal: string;
  start_date_time: string;
  end_date_time?: string;
  status: CampaignState;
  engagement_id: number;
  engagement_type: WhistlerCampaignType;
  comm_channel: CommChannel;
}

@Injectable({
  providedIn: 'root'
})
export class WhistlerCampaignService implements ICampaignService {
  private baseUrl: string;
  private pagesCache: { [p: number]: IJsonApiListPayload<IWhistlerCampaignAttributes> } = {};
  constructor(private http: HttpClient, config: Config) {
    this.baseUrl = config.apiHost as string;
  }

  private static WhistlerTypeToType(ty: WhistlerCampaignType): CampaignType {
    return WhistlerCampaignType[ty];
  }

  public static WhistlerCampaignToCampaign(campaign: IJsonApiItem<IWhistlerCampaignAttributes>): ICampaign {
    const cAttributes = campaign.attributes;
    return {
      id: Number.parseInt(campaign.id, 10),
      name: cAttributes.name,
      description: cAttributes.goal,
      type: WhistlerCampaignService.WhistlerTypeToType(cAttributes.engagement_type),
      state: cAttributes.status,
      endsAt: new Date(cAttributes.end_date_time) || null,
      engagementId: cAttributes.engagement_id,
      rawPayload: cAttributes
    };
  }

  private static startsAfter(c: IJsonApiItem<IWhistlerCampaignAttributes>, ts: number): boolean {
    if (c.attributes.start_date_time === null) {
      return true;
    }
    const start = (new Date(c.attributes.start_date_time)).getTime();
    return start < ts;
  }

  private static expiresBefore(c: IJsonApiItem<IWhistlerCampaignAttributes>, ts: number): boolean {
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
      const process = (p: number, cs: IJsonApiListPayload<IWhistlerCampaignAttributes>) => {
        const campaigns = cs.data
          // filter out by campaign date
          .filter(c => WhistlerCampaignService.startsAfter(c, now) && WhistlerCampaignService.expiresBefore(c, now))
          .map(WhistlerCampaignService.WhistlerCampaignToCampaign);
        current = current.concat(campaigns);
        subject.next(current);
        if (p >= cs.meta.page_count) {
          subject.complete();
        } else {
          this.getPage(p + 1)
            .subscribe(res => process(p + 1, res));
        }
      };
      this.getPage(1)
        .subscribe(cs => process(1, cs));
    });
  }

  private getPage(n: number): Observable<IJsonApiListPayload<IWhistlerCampaignAttributes>> {
    if (this.pagesCache[n]) {
      return of(this.pagesCache[n]);
    }
    return this.http.get<IJsonApiListPayload<IWhistlerCampaignAttributes>>(`${this.baseUrl}/campaign/entities?page[number]=${n}`)
      .pipe(tap(page => this.pagesCache[n] = page));
  }

  public getCampaign(id: number): Observable<ICampaign> {
    return this.http.get<IJsonApiItemPayload<IWhistlerCampaignAttributes>>(`${this.baseUrl}/campaign/entities/${id}`)
      .pipe(
        map((campaigns: IJsonApiItemPayload<IWhistlerCampaignAttributes>) => campaigns.data),
        map((campaign: IJsonApiItem<IWhistlerCampaignAttributes>) => WhistlerCampaignService.WhistlerCampaignToCampaign(campaign)),
      );
  }
}
