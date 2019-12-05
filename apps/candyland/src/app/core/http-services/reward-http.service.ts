import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from '@cl-core/api-config';
import { IWRewardEntityAttributes } from '@perx/whistler';

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

  public getreward(): Observable<OptionConfig[]> {
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
}
