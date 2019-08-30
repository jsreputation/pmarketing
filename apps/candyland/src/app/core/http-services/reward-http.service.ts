import {Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiConfig } from '@cl-core/api-config';

@Injectable({
  providedIn: 'root'
})
export class RewardHttpService {

  constructor(private http: HttpClient) { }

  public getRewards(params: HttpParams): Observable<any> {
    // return this.http.get('assets/actives/rewards/rewards.json');
    return this.http.get(ApiConfig.rewardsPath, {params});
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

  public getReward(id: number): Observable<any> {
    // return this.http.get('assets/actives/rewards/reward-detail.json');
    return this.http.get(ApiConfig.rewardsPath + id);
  }

  public getRewardsOptions(): Observable<OptionConfig[]> {
    return this.http.get<OptionConfig[]>('assets/actives/rewards/rewards-options.json');
  }

  public getSingleReward(id: number): Observable<any> {
    return this.http.get('assets/actives/rewards/rewards.json')
      .pipe(
        map((res: any[]) => {
          return res.filter((item) => item.id === id)[0];
        })
      );
  }

  public createRewardGame(data: any): Observable<any> {
    return this.http.post(ApiConfig.createGamePath, data);
  }

  public createReward(data: any): Observable<any> {
    console.log('createReward', data);
    return this.http.post(ApiConfig.rewardsPath, data);
  }

  public updateReward(id: number, data: any): Observable<any> {
    return this.http.patch(ApiConfig.rewardsPath + id, data);
  }
}
