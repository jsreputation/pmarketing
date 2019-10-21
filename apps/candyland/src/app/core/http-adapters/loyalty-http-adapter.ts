import Utils from '@cl-helpers/utils';
import { LoyaltyJoinMethodMap } from '@cl-core/models/loyalty/loyalty-joing-method-map';

export class LoyaltyHttpAdapter {
  public static transformToTableData(data: any): ITableData<any> {
    const formatData = data.data.map((item) => {
      // const user = SettingsHttpAdapter.transformToIAMUser(item);
      // const user = {};
      // if (data.included && data.included.length) {
      //   for (let i = 0; i <= data.included.length - 1; i++) {
      //     if (user.relationships_groups_id === data.included[i].id) {
      //       user.role = data.included[i].attributes.name;
      //       break;
      //     }
      //   }
      // }
      return {...item};
    });
    return {data: formatData, meta: data.meta};
  }

  public static transformFromLoyaltyForm(data: any): any {
    return {
      type: 'programs',
      attributes: {
        name: data.name,
        unit: data.details.pointsName,
        pool_id: data.details.poolId,
        // display_properties: {
        //   tiers_count: data.tiersCount
        // }
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
        image_url: data.imageUrl || 'assets/images/icons/engagement.svg',
        bonus_ratio: data.earnBonus,
        discount_ratio: data.burnDiscount,
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
      earnBonus: data.attributes.bonus_ratio,
      burnDiscount: data.attributes.discount_ratio,
      pointsExpiry: {
        amount: data.attributes.expiry_period,
        type: data.attributes.expiry_period_type,
        trigger: data.attributes.expiry_period_trigger,
      }
    };
  }

  private static transformJoinMethodToApi(joinMethod: any): any {
    // const formatData = {
    //   invite_only: data.inviteOnly,
    //   sign_up: data.signUp,
    //   amount: data.amount,
    //   transaction_amount: data.transactionAmount,
    //   points_threshold: data.pointsThreshold,
    //   points: data.points
    // };
    // return Utils.filterObj(formatData, (item) => !!item);
    const chosenMethods = Utils.filterObj(joinMethod, (item) => !!item);
    const apiJoinMethod = {};
    // Object.keys(chosenMethods).forEach(key => apiJoinMethod[LoyaltyJoinMethodType[key]] = chosenMethods[key]);
    Object.keys(chosenMethods).forEach(key => apiJoinMethod[LoyaltyJoinMethodMap[key].apiName] = chosenMethods[key]);
    return apiJoinMethod;
  }

  private static transformJoinMethodFromApi(apiJoinMethod: any): any {
    return Object.entries(apiJoinMethod).map(([apiKey, apiValue]) => {
      const result = {};
      Object.entries(LoyaltyJoinMethodMap).forEach(([key, value]) => {
        if (apiKey === value.apiName) {
          result[key] = apiValue;
          return;
        }
      });
      return result;
    });
  }
}
