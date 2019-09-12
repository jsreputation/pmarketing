import { Injectable } from '@angular/core';
import { ICampaignService } from './icampaign.service';
import { Observable } from 'rxjs';
import { ICampaign, CampaignState, CommChannel, CampaignType } from './models/campaign.model';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config/config';
import { map, tap } from 'rxjs/operators';

interface IWhistlerCampaign {
  id: string;
  attributes: IWhistlerCampaignAttributes;
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
    return {
      id: parseInt(campaign.id, 10),
      name: campaign.attributes.name,
      description: campaign.attributes.goal,
      type: campaign.attributes.engagement_type,
      state: campaign.attributes.status,
      endsAt: new Date(campaign.attributes.end_date_time),
      engagementId: campaign.attributes.engagement_id,
      commChannel: campaign.attributes.comm_channel
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
