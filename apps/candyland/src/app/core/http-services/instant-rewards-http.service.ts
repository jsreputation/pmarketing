import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from '@cl-core/api-config';
import { IWInstantOutcomeEngagementAttributes } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class InstantRewardsHttpService {

  constructor(private http: HttpClient) {
  }

  public getRewardData(): Observable<IRewardDefaultValue> {
    return this.http.get<IRewardDefaultValue>('assets/actives/reward/reward-data.json');
  }

  public createRewardGame(data: any): Observable<IJsonApiPayload<IWInstantOutcomeEngagementAttributes>> {
    return this.http.post<IJsonApiPayload<IWInstantOutcomeEngagementAttributes>>(ApiConfig.engagementsPath + '/', data);
  }

  public updateInstantReward(id: string, data: IJsonApiPayload<IWInstantOutcomeEngagementAttributes>):
    Observable<IJsonApiPayload<IWInstantOutcomeEngagementAttributes>> {
    return this.http.patch<IJsonApiPayload<IWInstantOutcomeEngagementAttributes>>
    (ApiConfig.engagementsPath + '/instant_reward/' + id, data);
  }

  public getInstantReward(id: string): Observable<IJsonApiPayload<IWInstantOutcomeEngagementAttributes>> {
    return this.http.get<IJsonApiPayload<IWInstantOutcomeEngagementAttributes>>(ApiConfig.engagementsPath + '/instant_reward/' + id);
  }
}
