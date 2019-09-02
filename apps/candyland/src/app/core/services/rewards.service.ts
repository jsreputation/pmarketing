import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RewardHttpService } from '@cl-core/http-services/reward-http.service';
import { ITableService } from '@cl-shared/table/data-source/table-service-interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RewardHttpAdapter } from '@cl-core/http-adapters/reward-http-adapter';
import { EngagementHttpAdapter } from '@cl-core/http-adapters/engagement-http-adapter';

@Injectable({
  providedIn: 'root'
})
export class RewardsService implements ITableService {

  constructor(private rewardHttp: RewardHttpService) {
  }

  public getTableData(params: HttpParams): Observable<ITableData<IReward>> {
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

  public getRewardsOptions(): Observable<OptionConfig[]> {
    return this.rewardHttp.getRewardsOptions();
  }

  public getReward(id: string): Observable<IRewardForm> {
    return this.rewardHttp.getReward(id).pipe(
      map(response => RewardHttpAdapter.transformToRewardForm(response.data))
    );
  }

  public getMocksRewardDetail(): Observable<any> {
    return this.rewardHttp.getMockRewardDetail();
  }

  public createReward(data: IRewardForm): Observable<IResponseApi<IRewardApi>> {
    const sendData = RewardHttpAdapter.transformFromRewardForm(data);
    return this.rewardHttp.createReward({data: sendData});
  }

  public duplicateReward(data: IReward): Observable<IResponseApi<IRewardApi>> {
    const sendData = RewardHttpAdapter.transformFromReward(data);
    return this.rewardHttp.createReward({data: sendData});
  }

  public updateReward(id: string, data: any): Observable<IResponseApi<IRewardApi>> {
    const sendData = RewardHttpAdapter.transformFromRewardForm(data);
    sendData.id = id;
    return this.rewardHttp.updateReward(id, {data: sendData});
  }

  public createRewardGame(data): Observable<any> {
    const sendData = EngagementHttpAdapter.transformReward(data);
    return this.rewardHttp.createRewardGame({data: sendData});
  }
}
