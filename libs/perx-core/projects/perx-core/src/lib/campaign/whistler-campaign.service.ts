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

  private WhistlerTypeToType(ty: WhistlerCampaignType): CampaignType {
    return WhistlerCampaignType[ty];
  }

  public WhistlerCampaignToCampaign(campaign: IJsonApiItem<IWhistlerCampaignAttributes>): ICampaign {
    const cAttributes = campaign.attributes;
    return {
      id: Number.parseInt(campaign.id, 10),
      name: cAttributes.name,
      description: cAttributes.goal,
      type: this.WhistlerTypeToType(cAttributes.engagement_type),
      state: cAttributes.status,
      endsAt: new Date(cAttributes.end_date_time),
      rawPayload: cAttributes
    };
  }
  public getCampaigns(): Observable<ICampaign[]> {
    return this.http.get<IJsonApiListPayload<IWhistlerCampaignAttributes>>(this.baseUrl + '/campaign/entities')
      .pipe(
        map((campaigns: IJsonApiListPayload<IWhistlerCampaignAttributes>) => campaigns.data),
        map(
          (campaigns: IJsonApiItem<IWhistlerCampaignAttributes>[]) =>
            campaigns.map((campaign: IJsonApiItem<IWhistlerCampaignAttributes>) => this.WhistlerCampaignToCampaign(campaign)))
      );
  }

  // @ts-ignore
  public getCampaign(id: number): Observable<ICampaign> {
    return this.http.get<IJsonApiItemPayload<IWhistlerCampaignAttributes>>(this.baseUrl + '/campaign/entities/' + id)
      .pipe(
        map((campaigns: IJsonApiItemPayload<IWhistlerCampaignAttributes>) => campaigns.data),
        map((campaign: IJsonApiItem<IWhistlerCampaignAttributes>) => this.WhistlerCampaignToCampaign(campaign)),
      );
  }
}
