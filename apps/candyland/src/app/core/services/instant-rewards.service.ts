import { Injectable } from '@angular/core';
import { InstantRewardsHttpService } from '@perx/whistler-services';
import { Observable } from 'rxjs';
import { EngagementHttpAdapter } from '@cl-core/http-adapters/engagement-http-adapter';
import { map } from 'rxjs/operators';
import { IWInstantOutcomeEngagementAttributes, IJsonApiItemPayload } from '@perx/whistler';
import { HttpClient } from '@angular/common/http';
import { IRewardDefaultValue } from '@cl-core/models/games/reward/reward-default-value.interface';
import { IRewardForm } from '@cl-core/models/games/reward/reward-form-interface';

@Injectable({
  providedIn: 'root'
})
export class InstantRewardsService {
  constructor(private instantRewardsHttpService: InstantRewardsHttpService, private http: HttpClient) { }

  public getInstantRewardData(): Observable<IRewardDefaultValue> {
    return this.http.get<IRewardDefaultValue>('assets/actives/reward/reward-data.json');
  }

  public getInstantReward(id: string): Observable<IRewardForm> {
    return this.instantRewardsHttpService.getInstantReward(id).pipe(
      map(response => EngagementHttpAdapter.transformRewardForm(response.data))
    );
  }

  public createRewardGame(data: IRewardForm): Observable<IJsonApiItemPayload<IWInstantOutcomeEngagementAttributes>> {
    const sendData = EngagementHttpAdapter.transformFromInstantRewardForm(data);
    return this.instantRewardsHttpService.createRewardGame({ data: sendData });
  }

  public updateInstantReward(id: string, data: IRewardForm): Observable<IJsonApiItemPayload<IWInstantOutcomeEngagementAttributes>> {
    const sendData = { ...EngagementHttpAdapter.transformFromInstantRewardForm(data), id };
    return this.instantRewardsHttpService.updateInstantReward(id, { data: sendData });
  }
}
