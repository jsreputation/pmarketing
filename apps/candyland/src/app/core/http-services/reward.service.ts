import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RewardService {

  constructor(private http: HttpClient) { }

  public getRewards(): any {
    return this.http.get('assets/actives/rewards/rewards.json');
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

  public getReward(): Observable<any> {
    return this.http.get('assets/actives/rewards/reward-detail.json');
  }

  public getRewardsOptions(): Observable<OptionConfig[]> {
    return this.http.get<OptionConfig[]>('assets/actives/rewards/rewards-options.json');
  }
}
