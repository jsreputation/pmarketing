import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  IWRewardEntityAttributes,
  IWTierRewardCostsAttributes,
  IJsonApiListPayload,
  IJsonApiItemPayload,
  IJsonApiItem,
  IJsonApiPostItem,
  IJsonApiPatchItem,
  IJsonApiPatchData,
  IJsonApiPostData
} from '@perx/whistler';
import { ApiConfigServices } from '../configs/api-config';

@Injectable()
export class RewardHttpService {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigServices
  ) { }

  public getRewards(params: HttpParams): Observable<IJsonApiListPayload<IWRewardEntityAttributes>> {
    return this.http.get<IJsonApiListPayload<IWRewardEntityAttributes>>(`${this.apiConfig.rewardsPath}/`, { params });
  }

  public getReward(id: string, params: HttpParams): Observable<IJsonApiItemPayload<IWRewardEntityAttributes>> {
    return this.http.get<IJsonApiItemPayload<IWRewardEntityAttributes>>(`${this.apiConfig.rewardsPath}/${id}`, { params });
  }

  public createReward(data: IJsonApiPostItem<IWRewardEntityAttributes>): Observable<IJsonApiItemPayload<IWRewardEntityAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWRewardEntityAttributes>>(`${this.apiConfig.rewardsPath}/`, data);
  }

  public updateReward(
    id: string, data: IJsonApiPatchItem<IWRewardEntityAttributes>
  ): Observable<IJsonApiItemPayload<IWRewardEntityAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWRewardEntityAttributes>>(`${this.apiConfig.rewardsPath}/${id}`, data);
  }

  public getRewardTierList(page: number, id: string): Observable<IJsonApiListPayload<IWTierRewardCostsAttributes, void>> {
    const params: any = {
      'page[number]': page ? page : 1,
      'page[size]': 20,
      'filter[entity_id]': id
    };
    return this.http.get<IJsonApiListPayload<IWTierRewardCostsAttributes>>(this.apiConfig.rewardsTierPath, { params });
  }

  public getRewardTier(id: string): Observable<IJsonApiItemPayload<IWTierRewardCostsAttributes>> {
    return this.http.get<IJsonApiItemPayload<any>>(`${this.apiConfig.rewardsTierPath}/${id}`);
  }

  public createRewardTier(data: IJsonApiPostData<IWTierRewardCostsAttributes>): Observable<IJsonApiItem<IWTierRewardCostsAttributes>> {
    return this.http.post<IJsonApiItem<IWTierRewardCostsAttributes>>(this.apiConfig.rewardsTierPath, { data });
  }

  public patchRewardTier(data: IJsonApiPatchData<IWTierRewardCostsAttributes>): Observable<IJsonApiItem<IWTierRewardCostsAttributes>> {
    return this.http.patch<IJsonApiItem<IWTierRewardCostsAttributes>>(`${this.apiConfig.rewardsTierPath}/${data.id}`, { data });
  }

  public deleteRewardTier(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiConfig.rewardsTierPath}/${id}`);
  }
}
