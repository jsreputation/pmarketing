import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RewardService {

  constructor(private http: HttpClient) { }

  public getRewards(): Observable<any> {
    return this.http.get('assets/mocks/rewards/rewards.json');
  }

  public getRewardCardBackground(): Observable<IGraphic> {
    return this.http.get('assets/actives/reward-card-background.json')
      .pipe(
        map(res => (res as IGraphic))
      );
  }

  public getRewardBackground(): Observable<IGraphic> {
    return this.http.get<IGraphic>('assets/actives/reward-background.json');
  }

  public getReward(): Observable<any> {
    return this.http.get('assets/mocks/rewards/reward-detail.json');
  }

  public getRewardsOptions(): Observable<OptionConfig[]> {
    return this.http.get<OptionConfig[]>('assets/mocks/rewards/rewards-options.json');
  }
}
