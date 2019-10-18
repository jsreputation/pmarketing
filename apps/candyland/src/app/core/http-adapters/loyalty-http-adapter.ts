import Utils from '@cl-helpers/utils';
import { LoyaltyJoinMethodType } from '@cl-core/models/loyalty/loyalty-joing-method-type.enum';

export class LoyaltyHttpAdapter {

  // TODO: need add poolId to form
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

  public static transformFromLoyaltyBasicTierForm(data: any, loyaltyId: string): any {
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

  public static transformFromLoyaltyCustomTierForm(data: any, loyaltyBasicTierId: string): any {
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
            id: loyaltyBasicTierId
          }
        }
      }
    };
  }

  public static transformToTableDataCustomTierForm(data: any): ITableData<any> {
    const formatData = data.data.map((item) => LoyaltyHttpAdapter.transformToLoyaltyCustomTierForm(item));
    return { data: formatData, meta: data.meta};
  }

  public static transformToLoyaltyCustomTierForm(data: any): any {
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

  private static setIncludedToLoyaltyForm(data: any, item: any, formLoyalty: any): any {
    console.log(data, item);
    if (data.included && data.included.length) {
      for (let i = 0; i <= data.included.length - 1; i++) {
        if (item.relationships.basic_tier
          && item.relationships.basic_tier.data
          && item.relationships.basic_tier.data.id === data.included[i].id) {
          const detailsAndConversionsFormGroup =
            LoyaltyHttpAdapter.getDetailsAndConversionsFormGroup(data.included[i].attributes, item.attributes);
          formLoyalty = {
            ...formLoyalty,
            ...detailsAndConversionsFormGroup
          };
          break;
        }
      }
    }
    return formLoyalty;
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
    Object.keys(chosenMethods).forEach(key => apiJoinMethod[LoyaltyJoinMethodType[key]] = chosenMethods[key]);
    return apiJoinMethod;
  }

  private static transformJoinMethodFromApi(apiJoinMethod: any): any {
    const joinMethod = {};
    Object.keys(apiJoinMethod).forEach(key => joinMethod[LoyaltyJoinMethodType[LoyaltyJoinMethodType[key]]] = apiJoinMethod[key]);
    return joinMethod;
  }

  private static transformToLoyaltyForm(data: any): any {
    return {
      id: data.id,
      customTiersCount: data.attributes.custom_tiers_count,
      name: data.attributes.name,
      status: data.attributes.status,
      pointsName: data.attributes.unit
    };
  }

  private static getDetailsAndConversionsFormGroup(data: any, currentLoyalty: any): any {
    return {
      details: LoyaltyHttpAdapter.formatToDetailFormGroup(data, currentLoyalty),
      tiersConversions: LoyaltyHttpAdapter.transformToTiersConversionsFormGroup(data),
    };
  }

  private static formatToDetailFormGroup(data: any, currentLoyalty: any): any {
    // console.log({
    //   pointsName: currentLoyalty.unit,
    //   imageUrl: data.image_url,
    //   poolId: currentLoyalty.poolId,
    //   joinMethod: LoyaltyHttpAdapter.transformJoinMethodFromApi(data.join_method)
    // });
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
        amount: data.expiry_period_type ,
        type: data.expiry_period ,
        trigger: data.expiry_period_trigger
      }
    };
  }
}
