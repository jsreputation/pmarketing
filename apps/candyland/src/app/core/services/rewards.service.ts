import { Injectable } from '@angular/core';
import { RewardHttpService } from '@cl-core/http-services/reward-http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RewardsService {

  constructor(private rewardHttp: RewardHttpService) { }

  public getRewards(): Observable<any> {
    return this.rewardHttp.getRewards();
  }

  public getRewardData(): Observable<{
    background: IGraphic[],
    cardBackground: IGraphic[]
  }> {
    return this.rewardHttp.getRewardData();
  }

  public getReward(): Observable<any> {
    return this.rewardHttp.getReward();
  }

  public getRewardsOptions(): Observable<OptionConfig[]> {
    return this.rewardHttp.getRewardsOptions();
  }

  public getSingleReward(id: number): Observable<any> {
    return this.rewardHttp.getSingleReward(id);
  }

  public createRewardGame(data): any {
    return this.rewardHttp.createRewardGame(data);
  }
}
