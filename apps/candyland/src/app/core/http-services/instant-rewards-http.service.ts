import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from '@cl-core/api-config';

@Injectable({
  providedIn: 'root'
})
export class InstantRewardsHttpService {

  constructor(private http: HttpClient) {
  }

  public getRewardData(): Observable<IRewardDefaultValue> {
    return this.http.get<IRewardDefaultValue>('assets/actives/reward/reward-data.json');
  }

  public createRewardGame(data: any): Observable<IResponseApi<IEngagementApi>> {
    return this.http.post<IResponseApi<IEngagementApi>>(ApiConfig.engagementsPath + '/', data);
  }

  public updateInstantReward(id: string, data: IResponseApi<any>): Observable<IResponseApi<IEngagementApi>> {
    return this.http.patch<IResponseApi<any>>(ApiConfig.engagementsPath + '/instant_reward/' + id, data);
  }

  public getInstantReward(id: string): Observable<IResponseApi<IEngagementApi>> {
    return this.http.get<IResponseApi<IEngagementApi>>(ApiConfig.engagementsPath + '/instant_reward/' + id);
  }
}
