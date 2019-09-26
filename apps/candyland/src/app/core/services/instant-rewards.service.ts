import { Injectable } from '@angular/core';
import { InstantRewardsHttpService } from '@cl-core/http-services/instant-rewards-http.service';
import { Observable } from 'rxjs';
import { EngagementHttpAdapter } from '@cl-core/http-adapters/engagement-http-adapter';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InstantRewardsService {

  constructor(private instantRewardsHttpService: InstantRewardsHttpService) {
  }

  public getInstantRewardData(): Observable<{
    background: IGraphic[],
    cardBackground: IGraphic[]
  }> {
    return this.instantRewardsHttpService.getRewardData();
  }

  public getInstantReward(id: string): Observable<any> {
    return this.instantRewardsHttpService.getInstantReward(id).pipe(
      map(response => EngagementHttpAdapter.transformRewardForm(response.data))
    );
  }

  public createRewardGame(data: IInstantRewardForm): Observable<any> {
    const sendData = EngagementHttpAdapter.transformInstantReward(data);
    return this.instantRewardsHttpService.createRewardGame({data: sendData});
  }

  public updateInstantReward(id: string, data: any): Observable<IResponseApi<any>> {
    const sendData = EngagementHttpAdapter.transformInstantReward(data);
    sendData.id = id;
    return this.instantRewardsHttpService.updateInstantReward(id, {data: sendData});
  }
}
