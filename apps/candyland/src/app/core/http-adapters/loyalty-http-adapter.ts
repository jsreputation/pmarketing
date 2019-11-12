import Utils from '@cl-helpers/utils';
import { LoyaltyJoinMethodMap } from '@cl-core/models/loyalty/loyalty-joing-method-map';
import {
  ICustomTireForm,
  ILoyaltyDetails,
  ILoyaltyForm,
  ILoyaltyTiersConversions
} from '@cl-core/models/loyalty/loyalty-form.model';
import { IWBasicTierAttributes, IWCustomTierAttributes , IWJoinMethod, IWLoyaltyAttributes } from '@perx/whistler';

export class LoyaltyHttpAdapter {

  public static transformToLoyalties(data: any): { data: ILoyaltyForm[] } {
    const formatData = data.data.map((item) => {
      let formLoyalty = LoyaltyHttpAdapter.transformToLoyaltyForm(item);
      formLoyalty = LoyaltyHttpAdapter.setIncludedToLoyaltyForm(data, item, formLoyalty);
      return formLoyalty;
    });
    return {data: formatData};
  }

  public static transformToTableData(data: any): ITableData<ILoyaltyForm> {
    const formatData = data.data.map((item) => {
      let formLoyalty = LoyaltyHttpAdapter.transformToLoyaltyForm(item);
      formLoyalty = LoyaltyHttpAdapter.setIncludedToLoyaltyForm(data, item, formLoyalty);
      return formLoyalty;
    });
    return {data: formatData, meta: data.meta};
  }

  public static transformFromLoyaltyForm(data: ILoyaltyForm): IJsonApiItem<IWLoyaltyAttributes> {
    return {
      type: 'programs',
      attributes: {
        name: data.name,
        unit: data.details.pointsName,
        pool_id: data.details.poolId
      }
    };
  }

  public static transformLoyaltyStatus(status: string): IJsonApiItem<Partial<IWLoyaltyAttributes>> {
    return {
      type: 'programs',
      attributes: {
        status
      }
    };
  }

  public static transformFromBasicTierForm(data: ILoyaltyForm, loyaltyId: string): IJsonApiItem<IWBasicTierAttributes> {
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
        join_method: LoyaltyHttpAdapter.transformJoinMethodToApi(data.details.joinMethod)
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

  public static transformFromCustomTierForm(data: ICustomTireForm, basicTierId: string): IJsonApiItem<IWCustomTierAttributes > {
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
        join_method: LoyaltyHttpAdapter.transformJoinMethodToApi(data.joinMethod)
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

  public static transformToTableDataCustomTierForm(data: IJsonApiListPayload<IWCustomTierAttributes >): ITableData<ICustomTireForm> {
    const formatData = data.data.map((item) => LoyaltyHttpAdapter.transformToCustomTierForm(item));
    return {data: formatData, meta: data.meta};
  }

  public static transformToCustomTierForm(data: IJsonApiItem<IWCustomTierAttributes >): ICustomTireForm {
    return {
      id: data.id,
      name: data.attributes.name,
      joinMethod: LoyaltyHttpAdapter.transformJoinMethodFromApi(data.attributes.join_method),
      imageUrl: data.attributes.image_url,
      earnBonus: +data.attributes.bonus_ratio * 100,
      burnDiscount: +data.attributes.discount_ratio * 100,
      pointsExpiry: {
        amount: data.attributes.expiry_period,
        type: data.attributes.expiry_period_type,
        trigger: data.attributes.expiry_period_trigger
      }
    };
  }

  public static setIncludedToLoyaltyForm(
    data: IJsonApiPayload<IWLoyaltyAttributes>,
    item: IJsonApiItem<IWLoyaltyAttributes>,
    formLoyalty: ILoyaltyForm
  ): ILoyaltyForm {
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
        const poolId = LoyaltyHttpAdapter.setPoolIdToLoyalty(data.included, item, i);
        formLoyalty = {
          ...formLoyalty,
          details: {
            ...formLoyalty.details,
            poolId
          }
        };
        formLoyalty = LoyaltyHttpAdapter.updateCustomTears(data, item, i, formLoyalty);
      }
    }
    return formLoyalty;
  }

  public static updateCustomTears(data: any, item: any, index: number, formLoyalty: any): any {
    const customTiers = LoyaltyHttpAdapter.setCustomTiers(data.included, item, index);
    if (customTiers) {
      let tiers = [];
      if (formLoyalty.customTiers && formLoyalty.customTiers.length) {
        tiers = [...formLoyalty.customTiers];
      }
      formLoyalty = {
        ...formLoyalty,
        customTiers: [...customTiers, ...tiers]
      };
    }
    return formLoyalty;
  }

  public static setPoolIdToLoyalty(
    included: IJsonApiItem<{ id: string, type: string }>,
    item: IJsonApiItem<IWLoyaltyAttributes>, index: number
  ): string {
    if (item.relationships.pool
      && item.relationships.pool.data
      && item.relationships.pool.data.id
      && item.relationships.pool.data.id === included[index].id
      && item.relationships.pool.data.type === included[index].type) {
      return included[index].id;
    }
  }

  public static setCustomTiers(included: any, item: any, index: number): any {
    if (item.relationships.custom_tiers
      && item.relationships.custom_tiers.data
      && item.relationships.custom_tiers.data.length > 0
    ) {
      const result = [];
      item.relationships.custom_tiers.data.map((customTier) => {
        if (customTier.id === included[index].id && customTier.type === included[index].type) {
          result.push(LoyaltyHttpAdapter.transformToCustomTierForm(included[index]));
        }
      });
      return result;
    }
  }

  private static transformJoinMethodToApi(joinMethod: IWJoinMethod): any {
    const chosenMethods = Utils.filterObj(joinMethod, (item) => !!item);
    const apiJoinMethod = {};
    Object.keys(chosenMethods).forEach(key => apiJoinMethod[LoyaltyJoinMethodMap[key].apiName] = chosenMethods[key]);
    return apiJoinMethod;
  }

  private static transformJoinMethodFromApi(apiJoinMethod: any): IWJoinMethod {
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

  public static transformToLoyaltyForm(data: IJsonApiItem<IWLoyaltyAttributes>): ILoyaltyForm {
    return {
      id: data.id,
      customTiersCount: data.attributes.custom_tiers_count,
      name: data.attributes.name,
      status: data.attributes.status,
      pointsName: data.attributes.unit,
      createdAt: data.attributes.created_at || null
    };
  }

  public static getDetailsAndConversionsFormGroup(data: IWBasicTierAttributes, currentLoyalty: IWLoyaltyAttributes): Partial<ILoyaltyForm> {
    return {
      details: LoyaltyHttpAdapter.formatToDetailFormGroup(data, currentLoyalty),
      tiersConversions: LoyaltyHttpAdapter.transformToTiersConversionsFormGroup(data)
    };
  }

  private static formatToDetailFormGroup(data: IWBasicTierAttributes, currentLoyalty: IWLoyaltyAttributes): ILoyaltyDetails {
    return {
      pointsName: currentLoyalty.unit,
      imageUrl: data.image_url,
      poolId: currentLoyalty.pool_id,
      joinMethod: LoyaltyHttpAdapter.transformJoinMethodFromApi(data.join_method)
    };
  }

  private static transformToTiersConversionsFormGroup(data: IWBasicTierAttributes): ILoyaltyTiersConversions {
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
