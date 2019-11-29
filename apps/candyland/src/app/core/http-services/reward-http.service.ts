import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from '@cl-core/api-config';
import { IWRewardEntityAttributes, IWTierRewardCostsAttributes } from '@perx/whistler';
// tslint:disable
@Injectable({
  providedIn: 'root'
})
export class RewardHttpService {

  constructor(private http: HttpClient) {
  }

  public getRewards(params: HttpParams): Observable<IJsonApiListPayload<IWRewardEntityAttributes>> {
    return this.http.get<IJsonApiListPayload<IWRewardEntityAttributes>>(ApiConfig.rewardsPath + '/', { params });
  }

  public getReward(id: string, params: HttpParams): Observable<IJsonApiPayload<IWRewardEntityAttributes>> {
    return this.http.get<IJsonApiPayload<IWRewardEntityAttributes>>(ApiConfig.rewardsPath + '/' + id, { params });
  }

  // public getMockRewardDetail(): Observable<any> {
  //   return this.http.get('assets/actives/rewards/reward-detail.json');
  // }

  public getRewardsOptions(): Observable<OptionConfig[]> {
    return this.http.get<OptionConfig[]>('assets/actives/rewards/rewards-options.json');
  }

  // public getSingleReward(id: string): Observable<any> {
  //   return this.http.get('assets/actives/rewards/rewards.json')
  //     .pipe(
  //       map((res: any[]) => {
  //         return res.filter((item) => item.id === id)[0];
  //       })
  //     );
  // }

  public createReward(data: IJsonApiPayload<IWRewardEntityAttributes>): Observable<IJsonApiPayload<IWRewardEntityAttributes>> {
    return this.http.post<IJsonApiPayload<IWRewardEntityAttributes>>(ApiConfig.rewardsPath + '/', data);
  }

  public updateReward(id: string, data: IJsonApiPayload<IWRewardEntityAttributes>): Observable<IJsonApiPayload<IWRewardEntityAttributes>> {
    return this.http.patch<IJsonApiPayload<IWRewardEntityAttributes>>(ApiConfig.rewardsPath + '/' + id, data);
  }

  public getRewardTierList(page: number): Observable<IJsonApiListPayload<Partial<IWTierRewardCostsAttributes>[]>> {
    const params: any = {
      'page[number]': page ? page : 1,
      'page[size]': 20
    };
    return this.http.get<IJsonApiListPayload<Partial<IWTierRewardCostsAttributes>[]>>(ApiConfig.rewardsTierPath, { params: params });
  }

  public getRewardTier(id: string): Observable<any> {
    return this.http.get(ApiConfig.rewardsTierPath + `/${id}`);
  }

  public createRewardTier(data: IJsonApiItem<Partial<IWTierRewardCostsAttributes>>): Observable<IJsonApiItem<Partial<IWTierRewardCostsAttributes>>> {
    return this.http.post<IJsonApiItem<Partial<IWTierRewardCostsAttributes>>>(ApiConfig.rewardsTierPath, {data: data});
  }

  public patchRewardTier(data: any): Observable<IJsonApiItem<Partial<IWTierRewardCostsAttributes>>> {
    return this.http.patch<IJsonApiItem<Partial<IWTierRewardCostsAttributes>>>(`${ApiConfig.rewardsTierPath}/${data.id}` , {data: data});
  }

}
