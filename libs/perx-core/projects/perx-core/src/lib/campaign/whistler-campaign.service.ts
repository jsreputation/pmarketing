import { Injectable } from '@angular/core';
import { ICampaignService } from './icampaign.service';
import { Observable } from 'rxjs';
import { ICampaign, CampaignState, CommChannel, CampaignType } from './models/campaign.model';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config/config';
import { map, tap } from 'rxjs/operators';

interface IWhistlerCampaignContent {
  id: string;
  attributes: IWhistlerCampaignAttributes;
}

interface IWhistlerCampaign {
  data: IWhistlerCampaignContent;
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

  public WhistlerCampaignToCampaign(campaign: IWhistlerCampaign): ICampaign {
    const cAttributes = campaign.data.attributes;
    return {
      id: parseInt(campaign.data.id, 10),
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
    throw new Error('Method not implemented.');
  }

  // @ts-ignore
  public getCampaign(id: number): Observable<ICampaign> {
    console.log('getCampaign');
    return this.http.get<IWhistlerCampaign>(this.baseUrl + '/campaign/entities/' + id)
      .pipe(
        tap(stuff => console.log(stuff)),
        map((res: IWhistlerCampaign) => this.WhistlerCampaignToCampaign(res)),
        tap(stuff => console.log(stuff)),
      );
  }
}
