import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RewardHttpService } from '@cl-core/http-services/reward-http.service';
import { ITableService } from '@cl-shared/table/data-source/table-service-interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RewardHttpAdapter } from '@cl-core/http-adapters/reward-http-adapter';
import { ClHttpParams } from '@cl-helpers/http-params';

@Injectable({
  providedIn: 'root'
})
export class RewardsService implements ITableService {

  constructor(private rewardHttp: RewardHttpService) {
  }

  public getTableData(params: HttpParamsOptions): Observable<ITableData<IRewardEntity>> {
    params.include = 'organization';
    return this.getRewards(params).pipe(
      map(response => RewardHttpAdapter.transformToTableData(response))
    );
  }

  public getRewards(params: HttpParamsOptions): Observable<IRewardEntity[]> {
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.rewardHttp.getRewards(httpParams);
  }

  public getRewardsOptions(): Observable<OptionConfig[]> {
    return this.rewardHttp.getRewardsOptions();
  }

  public getReward(id: string): Observable<IRewardEntity> {
    const params = {include: 'organization'};
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.rewardHttp.getReward(id, httpParams).pipe(
      map(response => {
        const formatData = RewardHttpAdapter.transformToReward(response.data);
        formatData.merchantName = RewardHttpAdapter.includeOrganization(response.data, response);
        return formatData;
      })
    );
  }

  public getRewardToForm(id: string): Observable<IRewardEntityForm> {
    return this.rewardHttp.getReward(id, {} as HttpParams).pipe(
      map(response => RewardHttpAdapter.transformToRewardForm(response.data))
    );
  }

  public createReward(data: IRewardEntityForm): Observable<IResponseApi<IRewardEntityApi>> {
    const sendData: IRewardEntityApi = RewardHttpAdapter.transformFromRewardForm(data);
    return this.rewardHttp.createReward({data: sendData});
  }

  public duplicateReward(data: IRewardEntity): Observable<IResponseApi<IRewardEntityApi>> {
    const sendData: IRewardEntityApi = RewardHttpAdapter.transformFromReward(data);
    return this.rewardHttp.createReward({data: sendData});
  }

  public updateReward(id: string, data: IRewardEntityForm): Observable<IResponseApi<IRewardEntityApi>> {
    const sendData: IRewardEntityApi = RewardHttpAdapter.transformFromRewardForm(data);
    sendData.id = id;
    return this.rewardHttp.updateReward(id, {data: sendData});
  }
}
