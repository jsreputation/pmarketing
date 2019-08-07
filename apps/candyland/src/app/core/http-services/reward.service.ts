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

  public getRewardCardBackground(): Observable<IGraphic> {
    return this.http.get<IGraphic>('assets/actives/rewards/reward-card-background.json');
  }

  public getRewardBackground(): Observable<IGraphic> {
    return this.http.get<IGraphic>('assets/actives/rewards/reward-background.json');
  }

  public getReward(): Observable<any> {
    return this.http.get('assets/actives/rewards/reward-detail.json');
  }

  public getRewardsOptions(): Observable<OptionConfig[]> {
    return this.http.get<OptionConfig[]>('assets/actives/rewards/rewards-options.json');
  }
}
