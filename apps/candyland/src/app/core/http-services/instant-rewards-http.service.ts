import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from '@cl-core/api-config';
import { IWInstantOutcomeEngagementAttributes, IJsonApiItemPayload, IJsonApiPatchItem, IJsonApiPostItem } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class InstantRewardsHttpService {
  constructor(private http: HttpClient) { }

  public createRewardGame(
    data: IJsonApiPostItem<IWInstantOutcomeEngagementAttributes>
  ): Observable<IJsonApiItemPayload<IWInstantOutcomeEngagementAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWInstantOutcomeEngagementAttributes>>(ApiConfig.engagementsPath + '/', data);
  }

  public updateInstantReward(id: string, data: IJsonApiPatchItem<IWInstantOutcomeEngagementAttributes>):
    Observable<IJsonApiItemPayload<IWInstantOutcomeEngagementAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWInstantOutcomeEngagementAttributes>>
      (ApiConfig.engagementsPath + '/instant_reward/' + id, data);
  }

  public getInstantReward(id: string): Observable<IJsonApiItemPayload<IWInstantOutcomeEngagementAttributes>> {
    return this.http.get<IJsonApiItemPayload<IWInstantOutcomeEngagementAttributes>>(ApiConfig.engagementsPath + '/instant_reward/' + id);
  }
}
