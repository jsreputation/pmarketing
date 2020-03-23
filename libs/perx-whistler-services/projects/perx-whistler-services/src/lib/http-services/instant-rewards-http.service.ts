import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IWInstantOutcomeEngagementAttributes, IJsonApiItemPayload, IJsonApiPatchItem, IJsonApiPostItem } from '@perxtech/whistler';
import { ApiConfigServices } from '../configs/api-config';

@Injectable()
export class InstantRewardsHttpService {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigServices
  ) { }

  public createRewardGame(
    data: IJsonApiPostItem<IWInstantOutcomeEngagementAttributes>
  ): Observable<IJsonApiItemPayload<IWInstantOutcomeEngagementAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWInstantOutcomeEngagementAttributes>>(`${this.apiConfig.engagementsPath}/`, data);
  }

  public updateInstantReward(id: string, data: IJsonApiPatchItem<IWInstantOutcomeEngagementAttributes>):
  Observable<IJsonApiItemPayload<IWInstantOutcomeEngagementAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWInstantOutcomeEngagementAttributes>>(
      `${this.apiConfig.engagementsPath}/instant_reward/${id}`,
      data
    );
  }

  public getInstantReward(id: string): Observable<IJsonApiItemPayload<IWInstantOutcomeEngagementAttributes>> {
    return this.http.get<IJsonApiItemPayload<IWInstantOutcomeEngagementAttributes>>(
      `${this.apiConfig.engagementsPath}/instant_reward/${id}`
    );
  }
}
