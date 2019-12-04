import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RewardHttpService } from '@cl-core/http-services/reward-http.service';
import { ITableService } from '@cl-shared/table/data-source/table-service-interface';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { RewardHttpAdapter } from '@cl-core/http-adapters/reward-http-adapter';
import { ClHttpParams } from '@cl-helpers/http-params';
import { IWRewardEntityAttributes, IWTierRewardCostsAttributes } from '@perx/whistler';
import { IRewardEntity } from '@cl-core/models/reward/reward-entity.interface';
import { IRewardEntityForm } from '@cl-core/models/reward/reward-entity-form.interface';

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

  public getRewards(params: HttpParamsOptions): Observable<IJsonApiListPayload<IWRewardEntityAttributes>> {
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

  public createReward(data: IRewardEntityForm, loyalties?: ILoyaltyFormGroup[]): Observable<IJsonApiPayload<IWRewardEntityAttributes>> {
    const sendData: IJsonApiItem<IWRewardEntityAttributes> = RewardHttpAdapter.transformFromRewardForm(data, loyalties);
    return this.rewardHttp.createReward({data: sendData});
  }

  public duplicateReward(data: IRewardEntity): Observable<IJsonApiPayload<IWRewardEntityAttributes>> {
    const sendData: IJsonApiItem<IWRewardEntityAttributes> = RewardHttpAdapter.transformFromReward(data);
    return this.rewardHttp.createReward({data: sendData});
  }

  public updateReward(id: string, data: IRewardEntityForm, loyalties?: ILoyaltyFormGroup[]):
    Observable<IJsonApiPayload<IWRewardEntityAttributes>> {
    const sendData: IJsonApiItem<IWRewardEntityAttributes> = RewardHttpAdapter.transformFromRewardForm(data, loyalties);
    sendData.id = id;
    return this.rewardHttp.updateReward(id, {data: sendData});
  }

  public getRewardTierList(): Observable<ITierRewardCost[]> {
    const tempData: Partial<IWTierRewardCostsAttributes>[] = [];
    return this.rewardHttp.getRewardTierList(1)
      .pipe(switchMap((data: IJsonApiListPayload<Partial<IWTierRewardCostsAttributes>[]>) => {
        if (data.meta.page_count <= 1) {
          return of([data]);
        }
        const listQuery: Observable<IJsonApiListPayload<Partial<IWTierRewardCostsAttributes>[]>>[] = [];
        tempData.push(...data.data as any);

        for (let index = 2; index <= data.meta.page_count; index++) {
          listQuery.push(this.getRewardTierPage(index));
        }

        return forkJoin(listQuery);

      }))
      .pipe(map((data: any[]) => {
        const result = [];
        data.forEach((list: any) => {
          const test = this.prepareTransformationLoyaltyCost(list.data);
          result.push(...test);
        });

        if (tempData) {
          result.push(...this.prepareTransformationLoyaltyCost(tempData));
        }

        return result;
      }));
  }

  public getRewardTier(id: string): Observable<any> {
    return this.rewardHttp.getRewardTier(id);
  }

  public createRewardTier(tier: ILoyaltyTiersFormGroup | IBasicTier, id: string)
    : Observable<IJsonApiItem<Partial<IWTierRewardCostsAttributes>>> {
    const loyaltyCostValue = RewardHttpAdapter.transformFromLoyaltyForm(tier, id);

    return this.rewardHttp.createRewardTier(loyaltyCostValue);
  }

  public patchRewardTier(tier: ILoyaltyTiersFormGroup , id: string)
    : Observable<IJsonApiItem<Partial<IWTierRewardCostsAttributes>>> {
    const loyaltyCostValue = RewardHttpAdapter.transformFromLoyaltyForm(tier, id);

    return this.rewardHttp.patchRewardTier(loyaltyCostValue);
  }

  public deleteRewardTier(tier: ILoyaltyTiersFormGroup | IBasicTier): Observable<any> {
    const loyaltyCostValue = RewardHttpAdapter.transformFromLoyaltyForm(tier, '0');
    return this.rewardHttp.deleteRewardTier(loyaltyCostValue);
  }

  private getRewardTierPage(page: number): Observable<IJsonApiListPayload<Partial<IWTierRewardCostsAttributes>[]>> {
    return this.rewardHttp.getRewardTierList(page);
  }

  private prepareTransformationLoyaltyCost(data: any[]): any {
    return data.map((item) => RewardHttpAdapter.transformToLoyaltyCost(item));
  }

}
