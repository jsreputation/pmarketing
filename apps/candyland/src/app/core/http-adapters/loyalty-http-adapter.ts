import Utils from '@cl-helpers/utils';
import { LoyaltyJoinMethodMap } from '@cl-core/models/loyalty/loyalty-joing-method-map';

export class LoyaltyHttpAdapter {

  public static transformToTableData(data: any): ITableData<any> {
    const formatData = data.data.map((item) => {
      let formLoyalty = LoyaltyHttpAdapter.transformToLoyaltyForm(item);
      formLoyalty = LoyaltyHttpAdapter.setIncludedToLoyaltyForm(data, item, formLoyalty);
      return formLoyalty;
    });
    return {data: formatData, meta: data.meta};
  }

  public static transformFromLoyaltyForm(data: any): any {
    return {
      type: 'programs',
      attributes: {
        name: data.name,
        unit: data.details.pointsName,
        pool_id: data.details.poolId || 1
      }
    };
  }

  public static transformLoyaltyStatus(status: string): any {
    return {
      type: 'programs',
      attributes: {
        status,
      }
    };
  }

  public static transformFromBasicTierForm(data: any, loyaltyId: string): any {
    return {
      type: 'basic_tiers',
      attributes: {
        image_url: data.details.imageUrl,
        earn_ratio_money: data.tiersConversions.globalEarnRule.amount,
        earn_ratio_point: data.tiersConversions.globalEarnRule.points,
        burn_ratio_money: data.tiersConversions.globalBurnRule.amount,
        burn_ratio_point: data.tiersConversions.globalBurnRule.points,
        expiry_period: data.tiersConversions.pointsExpiry.amount,
        expiry_period_type: data.tiersConversions.pointsExpiry.type,
        expiry_period_trigger: data.tiersConversions.pointsExpiry.trigger,
        join_method: LoyaltyHttpAdapter.transformJoinMethodToApi(data.details.joinMethod),
      },
      relationships: {
        program: {
          data: {
            type: 'programs',
            id: loyaltyId
          }
        }
      }
    };
  }

  public static transformFromCustomTierForm(data: any, basicTierId: string): any {
    return {
      type: 'custom_tiers',
      attributes: {
        name: data.name,
        image_url: data.imageUrl,
        bonus_ratio: (data.earnBonus / 100).toFixed(3),
        discount_ratio: (data.burnDiscount / 100).toFixed(3),
        expiry_period: data.pointsExpiry.amount,
        expiry_period_type: data.pointsExpiry.type,
        expiry_period_trigger: data.pointsExpiry.trigger,
        join_method: LoyaltyHttpAdapter.transformJoinMethodToApi(data.joinMethod),
      },
      relationships: {
        basic_tier: {
          data: {
            type: 'basic_tiers',
            id: basicTierId
          }
        }
      }
    };
  }

  public static transformToTableDataCustomTierForm(data: any): ITableData<any> {
    const formatData = data.data.map((item) => LoyaltyHttpAdapter.transformToCustomTierForm(item));
    return {data: formatData, meta: data.meta};
  }

  public static transformToCustomTierForm(data: any): any {
    return {
      id: data.id,
      name: data.attributes.name,
      joinMethod: LoyaltyHttpAdapter.transformJoinMethodFromApi(data.attributes.join_method),
      imageUrl: data.attributes.image_url,
      earnBonus: data.attributes.bonus_ratio * 100,
      burnDiscount: data.attributes.discount_ratio * 100,
      pointsExpiry: {
        amount: data.attributes.expiry_period,
        type: data.attributes.expiry_period_type,
        trigger: data.attributes.expiry_period_trigger,
      }
    };
  }

  public static setIncludedToLoyaltyForm(data: any, item: any, formLoyalty: any): any {
    if (data.included && data.included.length) {
      for (let i = 0; i <= data.included.length - 1; i++) {
        if (item.relationships.basic_tier
          && item.relationships.basic_tier.data
          && item.relationships.basic_tier.data.id === data.included[i].id
          && item.relationships.basic_tier.data.type === data.included[i].type) {
          const detailsAndConversionsFormGroup =
            LoyaltyHttpAdapter.getDetailsAndConversionsFormGroup(data.included[i].attributes, item.attributes);
          formLoyalty = {
            basicTierId: data.included[i].id,
            ...formLoyalty,
            ...detailsAndConversionsFormGroup
          };
        }
        const poolId =
          LoyaltyHttpAdapter.setPoolIdToLoyalty(data.included, item, i);
        formLoyalty = {
          ...formLoyalty,
          details: {
            ...formLoyalty.details,
            poolId
          }
        };
      }
    }
    return formLoyalty;
  }

  private static setPoolIdToLoyalty(included: any, item: any, index: number): any {
    if (item.relationships.pool
      && item.relationships.pool.data
      && item.relationships.pool.data.id
      && item.relationships.pool.data.id === included[index].id
      && item.relationships.pool.data.type === included[index].type) {
      return included[index].id;
    }
  }

  private static transformJoinMethodToApi(joinMethod: any): any {
    const chosenMethods = Utils.filterObj(joinMethod, (item) => !!item);
    const apiJoinMethod = {};
    Object.keys(chosenMethods).forEach(key => apiJoinMethod[LoyaltyJoinMethodMap[key].apiName] = chosenMethods[key]);
    return apiJoinMethod;
  }

  private static transformJoinMethodFromApi(apiJoinMethod: any): any {
    const result = {};
    Object.entries(apiJoinMethod).map(([apiKey, apiValue]) => {
      Object.entries(LoyaltyJoinMethodMap).forEach(([key, value]) => {
        if (apiKey === value.apiName) {
          result[key] = apiValue;
          return;
        }
      });
    });
    return result;
  }

  public static transformToLoyaltyForm(data: any): any {
    return {
      id: data.id,
      customTiersCount: data.attributes.custom_tiers_count,
      name: data.attributes.name,
      status: data.attributes.status,
      pointsName: data.attributes.unit
    };
  }

  public static getDetailsAndConversionsFormGroup(data: any, currentLoyalty: any): any {
    return {
      details: LoyaltyHttpAdapter.formatToDetailFormGroup(data, currentLoyalty),
      tiersConversions: LoyaltyHttpAdapter.transformToTiersConversionsFormGroup(data),
    };
  }

  private static formatToDetailFormGroup(data: any, currentLoyalty: any): any {
    return {
      pointsName: currentLoyalty.unit,
      imageUrl: data.image_url,
      poolId: currentLoyalty.poolId,
      joinMethod: LoyaltyHttpAdapter.transformJoinMethodFromApi(data.join_method)
    };
  }

  private static transformToTiersConversionsFormGroup(data: any): any {
    return {
      globalEarnRule: {
        amount: data.earn_ratio_money,
        points: data.earn_ratio_point
      },
      globalBurnRule: {
        amount: data.burn_ratio_money,
        points: data.burn_ratio_point
      },
      pointsExpiry: {
        amount: data.expiry_period,
        type: data.expiry_period_type,
        trigger: data.expiry_period_trigger
      }
    };
  }
}
