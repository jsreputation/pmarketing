import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RewardService {

  constructor(private http: HttpClient) { }

  public getRewards(): Observable<any> {
    return this.http.get('assets/mocks/rewards/rewards.json');
  }

  public getRewardData() {
    return this.http.get<{
      background: IGraphic[],
      cardBackground: IGraphic[]
    }>('assets/actives/reward/reward-data.json');
  }

  public getReward(): Observable<any> {
    return this.http.get('assets/mocks/rewards/reward-detail.json');
  }

  public getRewardsOptions(): Observable<OptionConfig[]> {
    return this.http.get<OptionConfig[]>('assets/mocks/rewards/rewards-options.json');
  }
}
