import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiConfig } from '@cl-core/api-config';

@Injectable({
  providedIn: 'root'
})
export class RewardHttpService {

  constructor(private http: HttpClient) {
  }

  public getRewards(params: HttpParams): Observable<any> {
    return this.http.get(ApiConfig.rewardsPath, {params});
  }

  public getReward(id: string): Observable<IResponseApi<IRewardApi>> {
    return this.http.get<IResponseApi<IRewardApi>>(ApiConfig.rewardsPath + id);
  }

  public getMockRewardDetail(): Observable<any> {
    return this.http.get('assets/actives/rewards/reward-detail.json');
  }

  public getRewardsOptions(): Observable<OptionConfig[]> {
    return this.http.get<OptionConfig[]>('assets/actives/rewards/rewards-options.json');
  }

  public getSingleReward(id: string): Observable<any> {
    return this.http.get('assets/actives/rewards/rewards.json')
      .pipe(
        map((res: any[]) => {
          return res.filter((item) => item.id === id)[0];
        })
      );
  }

  public createReward(data: IResponseApi<IRewardApi> ): Observable<IResponseApi<IRewardApi>> {
    return this.http.post<IResponseApi<IRewardApi>>(ApiConfig.rewardsPath,  data);
  }

  public updateReward(id: string, data: IResponseApi<IRewardApi>): Observable<IResponseApi<IRewardApi>> {
    return this.http.patch<IResponseApi<IRewardApi>>(ApiConfig.rewardsPath + id, data);
  }
}
