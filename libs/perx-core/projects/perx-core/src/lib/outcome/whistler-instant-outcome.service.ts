import { InstantOutcomeService } from './instant-outcome.service';
import { IOutcome } from './models/outcome.model';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config/config';
import { IReward } from '../rewards/models/reward.model';
import { IJsonApiItemPayload } from '../jsonapi.payload';

interface AttbsObjEntity {
  urn: string;
  created_at: string;
  updated_at: string;
  name: string;
  status: string;
  goal: null;
  start_date_time: null;
  end_date_time: null;
  comm_channel: null;
  engagement_type: string;
  engagement_id: 1;
  pool_id: null;
}

interface AttbsObjIReward {
  urn: string;
  created_at: string;
  updated_at: string;
  game_type: string;
  title: string;
  description: string;
  image_url: string;
  properties?: {};
  display_properties: IOutcome;
}

@Injectable({
  providedIn: 'root'
})
export class WhistlerInstantOutcomeService implements InstantOutcomeService {
  // private baseUrl: string;

  constructor(private http: HttpClient, private config: Config) {
    // this.baseUrl = `${config.apiHost}/reward/entities/`;
  }

  // usage is to get return from pipe to call other functions
  public getFromCampaign(campaignId: number): Observable<IOutcome> {
    return this.http.get<IJsonApiItemPayload<AttbsObjEntity>>(`${this.config.apiHost}/campaign/entities/${campaignId}`)
      .pipe(
        map(res => res.data.attributes),
        switchMap(correctEntityAttribute => this.http.get<IJsonApiItemPayload<AttbsObjIReward>>(
          `${this.config.apiHost}/instant_outcome/engagements/${correctEntityAttribute.engagement_id}`
        )),
        map((res) => res.data.attributes.display_properties)
      );
  }

  // @ts-ignore
  public claim(campaignId: number): Observable<IReward[]> {
    const mockReward: IReward = {
      id: 1,
      name: 'My new reward',
      description: 'Lorem Ipsum',
      subtitle: 'I am the greatest',
      validFrom: new Date(),
      validTo: new Date(),
      rewardBanner: '',
      merchantImg: '',
      termsAndConditions: '',
      howToRedeem: '',
    };
    return of([mockReward]);
  }
}
