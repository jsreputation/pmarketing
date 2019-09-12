import { Injectable } from '@angular/core';
import { ICampaignService } from './icampaign.service';
import { Observable } from 'rxjs';
import { ICampaign, CampaignState, CommChannel, CampaignType } from './models/campaign.model';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config/config';
import { map } from 'rxjs/operators';

interface IWhistlerCampaignContent {
  id: string;
  attributes: IWhistlerCampaignAttributes;
}

interface IWhistlerCampaign {
  data: IWhistlerCampaignContent;
}

interface IWhistlerCampaigns {
  data: IWhistlerCampaignContent[];
  meta: {
    record_count: number;
    page_count: number;
  };
}
interface IWhistlerCampaignAttributes {
  name: string;
  goal: string;
  start_date_time: string;
  end_date_time?: string;
  status: CampaignState;
  engagement_id: number;
  engagement_type: CampaignType;
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

  public WhistlerCampaignToCampaign(campaign: IWhistlerCampaignContent): ICampaign {
    const cAttributes = campaign.attributes;
    return {
      id: parseInt(campaign.id, 10),
      name: cAttributes.name,
      description: cAttributes.goal,
      type: cAttributes.engagement_type,
      state: cAttributes.status,
      endsAt: new Date(cAttributes.end_date_time),
      engagementId: cAttributes.engagement_id,
      commChannel: cAttributes.comm_channel
    };
  }
  public getCampaigns(): Observable<ICampaign[]> {
    return this.http.get<IWhistlerCampaigns>(this.baseUrl + '/campaign/entities')
      .pipe(
        map((campaigns: IWhistlerCampaigns) => campaigns.data),
        map(
          (campaigns: IWhistlerCampaignContent[]) =>
            campaigns.map((campaign: IWhistlerCampaignContent) => this.WhistlerCampaignToCampaign(campaign)))
      );
  }

  // @ts-ignore
  public getCampaign(id: number): Observable<ICampaign> {
    return this.http.get<IWhistlerCampaign>(this.baseUrl + '/campaign/entities/' + id)
      .pipe(
        map((campaigns: IWhistlerCampaign) => campaigns.data),
        map((campaign: IWhistlerCampaignContent) => this.WhistlerCampaignToCampaign(campaign)),
      );
  }
}
