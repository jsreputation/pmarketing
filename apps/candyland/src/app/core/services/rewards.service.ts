import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RewardHttpService } from '@cl-core/http-services/reward-http.service';
import { ITableService } from '@cl-shared/table/data-source/table-service-interface';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { RewardHttpAdapter } from '@cl-core/http-adapters/reward-http-adapter';
import { EngagementHttpAdapter } from '@cl-core/http-adapters/engagement-http-adapter';

@Injectable({
  providedIn: 'root'
})
export class RewardsService implements ITableService {

  constructor(private rewardHttp: RewardHttpService) {
  }

  public getTableData(params: HttpParams): Observable<ITableData<Reward>> {
    return this.getRewards(params).pipe(
      map(response => ({
          data: response.data.map(item => RewardHttpAdapter.transformToReward(item)),
          meta: response.meta
        })
      )
    );
  }

  public getRewards(params: HttpParams): Observable<any> {
    return this.rewardHttp.getRewards(params);
  }

  public getRewardData(): Observable<{
    background: IGraphic[],
    cardBackground: IGraphic[]
  }> {
    return this.rewardHttp.getRewardData();
  }

  // public getReward(): Observable<any> {
  //   return this.rewardHttp.getReward();
  // }

  public getRewardsOptions(): Observable<OptionConfig[]> {
    return this.rewardHttp.getRewardsOptions();
  }

  public getReward(id: number): Observable<any> {
    return this.rewardHttp.getReward(id).pipe(
      tap(response => console.log('response', response)),
      map( response => RewardHttpAdapter.transformToRewardForm(response.data))
    );
  }

  public createReward(data): Observable<any> {
    const sendData = RewardHttpAdapter.transformFromRewardForm(data);
    return this.rewardHttp.createReward(sendData);
  }

  public duplicateReward(data): Observable<any> {
    const sendData = RewardHttpAdapter.transformFromReward(data);
    console.log('duplicateReward', data, sendData);
    return this.rewardHttp.createReward(sendData);
  }

  public updateReward(id: number, data: any): Observable<any>  {
    const sendData = RewardHttpAdapter.transformFromRewardForm(data);
    sendData.data.id = id;
    return this.rewardHttp.updateReward(id, sendData);
  }

  public createRewardGame(data): Observable<any> {
    const sendData = EngagementHttpAdapter.transformReward(data);
    return this.rewardHttp.createRewardGame(sendData);
  }
}
