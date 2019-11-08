import { Injectable } from '@angular/core';
import { InstantRewardsHttpService } from '@cl-core/http-services/instant-rewards-http.service';
import { Observable } from 'rxjs';
import { EngagementHttpAdapter } from '@cl-core/http-adapters/engagement-http-adapter';
import { map } from 'rxjs/operators';
import { IWInstantOutcomeEngagementAttributes } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class InstantRewardsService {

  constructor(private instantRewardsHttpService: InstantRewardsHttpService) {
  }

  public getInstantRewardData(): Observable<IRewardDefaultValue> {
    return this.instantRewardsHttpService.getRewardData();
  }

  public getInstantReward(id: string): Observable<IRewardForm> {
    return this.instantRewardsHttpService.getInstantReward(id).pipe(
      map(response => EngagementHttpAdapter.transformRewardForm(response.data))
    );
  }

  public createRewardGame(data: IRewardForm): Observable<IJsonApiPayload<IWInstantOutcomeEngagementAttributes>> {
    const sendData = EngagementHttpAdapter.transformFromInstantRewardForm(data);
    return this.instantRewardsHttpService.createRewardGame({data: sendData});
  }

  public updateInstantReward(id: string, data: IRewardForm): Observable<IJsonApiPayload<IWInstantOutcomeEngagementAttributes>> {
    const sendData = EngagementHttpAdapter.transformFromInstantRewardForm(data);
    sendData.id = id;
    return this.instantRewardsHttpService.updateInstantReward(id, {data: sendData});
  }
}
