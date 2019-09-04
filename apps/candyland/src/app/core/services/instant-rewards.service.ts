import { Injectable } from '@angular/core';
import { InstantRewardsHttpService } from '@cl-core/http-services/instant-rewards-http.service';
import { Observable } from 'rxjs';
import { EngagementHttpAdapter } from '@cl-core/http-adapters/engagement-http-adapter';

@Injectable({
  providedIn: 'root'
})
export class InstantRewardsService {

  constructor(private instantRewardsHttpService: InstantRewardsHttpService) {
  }

  public getRewardData(): Observable<{
    background: IGraphic[],
    cardBackground: IGraphic[]
  }> {
    return this.instantRewardsHttpService.getRewardData();
  }

  public createRewardGame(data): Observable<any> {
    const sendData = EngagementHttpAdapter.transformInstantReward(data);
    return this.instantRewardsHttpService.createRewardGame({data: sendData});
  }
}
