import { Injectable } from '@angular/core';
import { ICampaignService } from './icampaign.service';
import { Observable } from 'rxjs';
import { ICampaign, CampaignState, CommChannel, CampaignType } from './models/campaign.model';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config/config';
import { map } from 'rxjs/operators';
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
      endsAt: new Date(cAttributes.end_date_time),
      rawPayload: cAttributes
    };
  }

  public getCampaigns(): Observable<ICampaign[]> {
    return new Observable(subject => {
      let current: ICampaign[] = [];
      const process = (p: number, cs: IJsonApiListPayload<IWhistlerCampaignAttributes>) => {
        const newCampaigns = cs.data.map(WhistlerCampaignService.WhistlerCampaignToCampaign);
        current = current.concat(newCampaigns);
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
    return this.http.get<IJsonApiListPayload<IWhistlerCampaignAttributes>>(`${this.baseUrl}/campaign/entities?page[number]=${n}`);
  }

  public getCampaign(id: number): Observable<ICampaign> {
    return this.http.get<IJsonApiItemPayload<IWhistlerCampaignAttributes>>(`${this.baseUrl}/campaign/entities/${id}`)
      .pipe(
        map((campaigns: IJsonApiItemPayload<IWhistlerCampaignAttributes>) => campaigns.data),
        map((campaign: IJsonApiItem<IWhistlerCampaignAttributes>) => WhistlerCampaignService.WhistlerCampaignToCampaign(campaign)),
      );
  }
}
