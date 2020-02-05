import { Observable, of } from 'rxjs';
import { IRewardEntity } from '@cl-core/models/reward/reward-entity.interface';
import {
  IJsonApiItem,
  IJsonApiItemPayload,
  IJsonApiListPayload,
  IWRewardEntityAttributes, IWTierRewardCostsAttributes,
  WRedemptionType
} from '@perx/whistler';
import { IRewardEntityForm } from '@cl-core/models/reward/reward-entity-form.interface';
export class MockRewardsServices {
  public getTableData(params: HttpParamsOptions): Observable<ITableData<IRewardEntity>> {
    // tslint:disable
    const data: any = params;
    console.log('data', data);
    return of({
      data: [],
      meta: {

      }
    });
  }

  public getRewards(params: HttpParamsOptions): Observable<IJsonApiListPayload<IWRewardEntityAttributes>> {
    // tslint:disable-next-line
    const data: any = params;
    console.log('data', data);
    return of({
      data: []
    });
  }

  public getreward(): Observable<OptionConfig[]> {
    return of(
      [{ title: 'REWARD_TYPE_OPTIONS.FREE',
        value: 'Free'
      }]
    );
  }

  public getReward(id: string): Observable<IRewardEntity> {
    return of({
      id,
      image: 'string;',
      name: 'string;',
      type: 'string;',
      rewardType: 'string;',
      current: 1,
      total: 2,
      category: 'string;',
      tags: []
    });
  }

  public getRewardToForm(id: string): Observable<IRewardEntityForm> {
    return of({
      id,
      name: 'string',
      rewardInfo: {
        image: 'string',
        rewardType: 'string',
        category: 'string',
        redemptionType: WRedemptionType.barCode,
        cost: 3,
        description: 'string',
        termsAndCondition: 'string',
        merchantId: '2'
      }});
  }

  public createReward(data: IRewardEntityForm, loyalties?: ILoyaltyFormGroup[]): Observable<IJsonApiItemPayload<IWRewardEntityAttributes>> {
    console.log('data', data, loyalties);
    return of(null);
  }

  public duplicateReward(data: IRewardEntity): Observable<IJsonApiItemPayload<IWRewardEntityAttributes>> {
    console.log('data', data);
    return of(null);
  }
  public updateReward(id: string, data: IRewardEntityForm, loyalties?: ILoyaltyFormGroup[]):
  Observable<IJsonApiItemPayload<IWRewardEntityAttributes>> {
    console.log('data', data, id, loyalties);
    return of(null);
  }

  public getRewardTierList(id: string): Observable<ITierRewardCost[]> {
    console.log('data', id);
    return of(null);
  }

  public getRewardTier(id: string): Observable<any> {
    console.log('data', id);
    return of(null);
  }

  public createRewardTier(tier: ILoyaltyTiersFormGroup | IBasicTier, id: string): Observable<IJsonApiItem<IWTierRewardCostsAttributes>> {
    console.log('data', tier, id);
    return of(null);
  }

  public patchRewardTier(tier: ILoyaltyTiersFormGroup, id: string): Observable<IJsonApiItem<IWTierRewardCostsAttributes>> {
    console.log('data', tier, id);
    return of(null);
  }

  public deleteRewardTier(tier: ILoyaltyTiersFormGroup | IBasicTier): Observable<any> {
    console.log('data', tier);
    return of(null);
  }
}
