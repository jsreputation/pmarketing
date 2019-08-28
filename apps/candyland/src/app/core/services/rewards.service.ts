import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RewardHttpService } from '@cl-core/http-services/reward-http.service';
import { ITableService } from '@cl-shared/table/data-source/table-service-interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RewardHttpAdapter } from '@cl-core/http-adapters/reward-http-adapter';

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
