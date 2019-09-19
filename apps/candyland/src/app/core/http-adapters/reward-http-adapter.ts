export class RewardHttpAdapter {
  // tslint:disable
  public static transformToReward(data: IRewardEntityApi): IRewardEntity {
    return {
      id: data.id,
      image: data.attributes.image_url,
      name: data.attributes.name,
      type: data.type,
      rewardType: data.attributes.reward_type,
      redemptionType: data.attributes.redemption_type,
      current: data.attributes.cost_of_reward,
      total: 100,
      prprobability: null,
      category: data.attributes.category
    };
  }

  public static transformToRewardForm(data: IRewardEntityApi): IRewardEntityForm {
    return {
      name: data.attributes.name,
      id: data.id,
      currency: data.attributes.currency,
      rewardInfo: {
        image: data.attributes.image_url,
        rewardType: data.attributes.reward_type,
        category: data.attributes.category,
        redemptionType: data.attributes.redemption_type,
        cost: data.attributes.cost_of_reward,
        description: data.attributes.description,
        termsAndCondition: data.attributes.terms_conditions,
      },
      voucherInfo: {
        type: data.attributes.display_properties.voucher_properties.code_type,
        code: data.attributes.display_properties.voucher_properties.code,
        prefix: data.attributes.display_properties.voucher_properties.prefix,
        codeFormat: data.attributes.display_properties.voucher_properties.format_type,
        length: data.attributes.display_properties.voucher_properties.length,
      },
      voucherValidity: {
        type: data.attributes.display_properties.voucher_properties.validity.type,
        startDate: data.attributes.display_properties.voucher_properties.validity.start_date,
        endDate: data.attributes.display_properties.voucher_properties.validity.end_date,
      }
    };
  };

  public static transformFromRewardForm(data: IRewardEntityForm): IRewardEntityApi {
    return {
      type: 'entities',
      attributes: {
        name: data.name,
        image_url: 'https://lorempixel.com/300/300',
        reward_type: data.rewardInfo.rewardType,
        category: data.rewardInfo.category,
        redemption_type: data.rewardInfo.redemptionType,
        cost_of_reward: data.rewardInfo.cost,
        description: data.rewardInfo.description,
        terms_conditions: data.rewardInfo.termsAndCondition,
        display_properties: {
          voucher_properties: {
            code_type: data.voucherInfo.type,
            code: data.voucherInfo.code,
            prefix: data.voucherInfo.prefix,
            length: data.voucherInfo.length,
            format_type: data.voucherInfo.codeFormat,
            validity: {
              type: 'period',
              start_date: data.voucherValidity.startDate,
              end_date: data.voucherValidity.endDate
            }
          }
        }
      }
    };
  }

  public static transformFromReward(data: IRewardEntity): IRewardEntityApi {
    return {
      type: 'entities',
      attributes: {
        name: data.name,
        image_url: data.image,
        reward_type: data.rewardType,
        category: data.category,
        redemption_type: data.redemptionType,
        cost_of_reward: data.current,
        display_properties: {
          voucher_properties: {
            code_type: data.voucherInfo.type,
            code: data.voucherInfo.code,
            prefix: data.voucherInfo.prefix,
            length: data.voucherInfo.length,
            format_type: data.voucherInfo.codeFormat,
            validity: {
              type: 'period',
              start_date: data.voucherValidity.startDate,
              end_date: data.voucherValidity.endDate
            }
          }
        }
      }
    };
  }
}
