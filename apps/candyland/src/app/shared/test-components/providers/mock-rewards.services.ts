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
import { ITableData } from '@cl-core/models/data-list.interface';
import { OptionConfig } from '@perx/candyshop';
import { ITierRewardCost } from '@cl-core/models/reward/tier-reward-cost-intrface';
import { RewardsService } from '@cl-core-services';

export class MockRewardsServices implements Partial<RewardsService> {
  public getTableData(): Observable<ITableData<IRewardEntity>> {
    return of({
      data: [],
      meta: {
      }
    });
  }

  public getRewards(): Observable<IJsonApiListPayload<IWRewardEntityAttributes>> {
    return of({
      data: []
    });
  }

  public getreward(): Observable<OptionConfig[]> {
    return of(
      [{
        title: 'REWARD_TYPE_OPTIONS.FREE',
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
      }
    });
  }

  public createReward(): Observable<IJsonApiItemPayload<IWRewardEntityAttributes>> {
    return of(null);
  }

  public duplicateReward(): Observable<IJsonApiItemPayload<IWRewardEntityAttributes>> {
    return of(null);
  }
  public updateReward():
  Observable<IJsonApiItemPayload<IWRewardEntityAttributes>> {
    return of(null);
  }

  public getRewardTierList(): Observable<ITierRewardCost[]> {
    return of(null);
  }

  public getRewardTier(): Observable<any> {
    return of(null);
  }

  public createRewardTier(): Observable<IJsonApiItem<IWTierRewardCostsAttributes>> {
    return of(null);
  }

  public patchRewardTier(): Observable<IJsonApiItem<IWTierRewardCostsAttributes>> {
    return of(null);
  }

  public deleteRewardTier(): Observable<any> {
    return of(null);
  }
}
