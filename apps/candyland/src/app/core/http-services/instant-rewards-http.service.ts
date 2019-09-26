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

  public getRewardData(): Observable<{
    background: IGraphic[],
    cardBackground: IGraphic[]
  }> {
    return this.http.get<{
      background: IGraphic[],
      cardBackground: IGraphic[]
    }>('assets/actives/reward/reward-data.json');
  }

  public createRewardGame(data: any): Observable<any> {
    return this.http.post(ApiConfig.engagementsPath + '/', data);
  }

  public updateInstantReward(id: string, data: IResponseApi<any>): Observable<IResponseApi<any>> {
    return this.http.patch<IResponseApi<any>>(ApiConfig.engagementsPath + '/instant_reward/' + id, data);
  }

  public getInstantReward(id: string): Observable<any> {
    return this.http.get(ApiConfig.engagementsPath + '/instant_reward/' + id);
  }
}
