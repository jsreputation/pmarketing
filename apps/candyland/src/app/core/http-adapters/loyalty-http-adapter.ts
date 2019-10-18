import Utils from '@cl-helpers/utils';
import { ParseIncluded } from '@cl-helpers/parse-included';

export class LoyaltyHttpAdapter {

  // TODO: need add point name and poolId to form
  public static transformToTableData(data: any): ITableData<any> {
    const formatData = data.data.map((item) => {
      console.log(item);

      const formLoyalty = LoyaltyHttpAdapter.transformToLoyaltyForm(item);
      // formLoyalty['details'] = LoyaltyHttpAdapter.getLoyaltyPointsName(item);

      console.log('formLoyalty', formLoyalty);
      return formLoyalty;
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
      // return {...item};
    });
    return {data: formatData, meta: data.meta};
  }

  public static transformFromLoyaltyForm(data: any): any {
    return {
      type: 'programs',
      attributes: {
        name: data.name,
        unit: data.details.pointsName,
        pool_id: data.details.poolId
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
        join_method: LoyaltyHttpAdapter.getJoinMethod(data.details.joinMethod),
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
        join_method: LoyaltyHttpAdapter.getJoinMethod(data.joinMethod),
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

  public static transformToLoyaltyCustomTierForm(data: any, loyaltyId: string): any {
    return {
      type: 'custom_tiers',
      attributes: {
        name: data.name,
        image_url: data.details.image,
        bonus_ratio: 50,
        discount_ratio: 20,
        expiry_period_type: data.tiersConversions.pointsExpiry.amount,
        expiry_period: data.tiersConversions.pointsExpiry.type,
        expiry_period_trigger: data.tiersConversions.pointsExpiry.trigger,
        join_method: LoyaltyHttpAdapter.getJoinMethod(data.joinMethod),
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

  public static addIncludedToLoyaltyForm(source: any, target: any, type: string, fieldName: string | null = null, adapterFunction?: (data: any) => any): any {
    const adapter = (item: any): any => {
      console.log('adapter', item);
      return item;
    };

    const adapter2 = LoyaltyHttpAdapter.getDetailsAndCanversionsFormGroup;

    ParseIncluded.setInclude(source, target, type, fieldName, adapter);
  }

  private static getJoinMethod(data: any): any {
    const formatData = {
      invite_only: data.inviteOnly,
      sign_up: data.signUp,
      amount: data.amount,
      transaction_amount: data.transactionAmount,
      points_threshold: data.pointsThreshold,
      points: data.points
    };
    return Utils.filterObj(formatData, (item) => !!item);
  }

  private static transformToLoyaltyForm(data: any): any {
    return {
      id: data.id,
      name: data.attributes.name,
      status: data.attributes.status,
      pointsName: data.attributes.unit
    };
  }

  private static getLoyaltyPointsName(data: any): any {
    return {
      pointsName: data.attributes.unit
    };
  }

  private static transformBasicTier(data: any): any {
    // {'urn':'urn:perx:loyalty::222222222:basic_tier/10',
    //   'created_at':'2019-10-17T08:58:24.377Z','updated_at':'2019-10-17T08:58:24.377Z',
    //   'image_url':'https:som_image.com.url',
    //   'earn_ratio_money':100,
    //   'earn_ratio_point':2,
    //   'burn_ratio_money':1,
    //   'burn_ratio_point':50,
    //   'expiry_period_type':'month',
    //   'expiry_period':3,
    //   'expiry_period_trigger':'inactivity',
    //   'join_method':
    //   {
    //     'invite_only':true
    //   }
    // }
    return {
      imageUrl: data.attributes.image_url,
      joinMethod: {
        inviteOnly: data.attributes.invite_only,
        sign_up: data.signUp,
        amount: data.amount,
        transaction_amount: data.transactionAmount,
        points_threshold: data.pointsThreshold,
        // points:
      }
    };
  }

  private static getDetailsAndCanversionsFormGroup(data: any): any {
    return {
      details: LoyaltyHttpAdapter.formatToDetailFormGroup(data),
      tiersConversions: LoyaltyHttpAdapter.transformToTiersConversionsFormGroup(data),
    };
  }

  private static formatToDetailFormGroup(data: any): any {
    return {
      imageUrl: data.attributes.image_url,
      poolId: data.attributes,
      joinMethod: ''
    };
  }

  private static transformToTiersConversionsFormGroup(data: any): any {
    return {
      globalEarnRule: {
        amount: data.attributes.earn_ratio_money,
        points: data.attributes.earn_ratio_point
      },
      globalBurnRule: {
        amount: data.attributes.burn_ratio_money,
        points: data.attributes.burn_ratio_point
      },
      pointsExpiry: {
        amount: data.attributes.expiry_period_type ,
        type: data.attributes.expiry_period ,
        trigger: data.attributes.expiry_period_trigger
      }
    };
  }
}
