import * as moment from 'moment';

export class RewardHttpAdapter {

  public static transformToTableData(data: any): ITableData<IRewardEntity> {
    const formatData = data.data.map((item) => {
      const formatItem = RewardHttpAdapter.transformToReward(item);
      formatItem.merchantName = RewardHttpAdapter.includeOrganization(item, data);
      return formatItem;
    });
    return {data: formatData, meta: data.meta};
  }

  public static includeOrganization(currentData: any, response: any): string {
    const id = currentData.relationships.organization.data ? currentData.relationships.organization.data.id : null;
    if (id && response.included && response.included.length) {
      for (let i = 0; i <= response.included.length - 1; i++) {
        if (id === response.included[i].id) {
          return response.included[i].attributes.name;
        }
      }
    }
  }

  public static transformToReward(data: IRewardEntityApi): IRewardEntity {
    return {
      id: data.id,
      image: data.attributes.image_url,
      name: data.attributes.name,
      type: data.type,
      rewardType: data.attributes.reward_type,
      redemptionType: data.attributes.redemption_type,
      merchantId: data.attributes.organization_id || null,
      current: data.attributes.cost_of_reward,
      total: 100,
      probability: null,
      category: data.attributes.category
    };
  }

  public static transformToRewardForm(data: IRewardEntityApi): IRewardEntityForm {
    let vouchers;
    if (data.attributes.display_properties.voucher_properties) {
      const voucher_properties = data.attributes.display_properties.voucher_properties;
      vouchers = {
        voucherCode: {
          type: voucher_properties.code_type,
          singleCode: {
            code: voucher_properties.code
          },
          uniqueGeneratedCode: {
            prefix: voucher_properties.prefix,
            codeFormat: voucher_properties.format_type,
            length: voucher_properties.length
          }
        },
        voucherValidity: {
          type: voucher_properties.validity.type,
          period: {
            startDate: voucher_properties.validity.start_date,
            startTime: moment(voucher_properties.validity.start_date).format('HH:mm'),
            endDate: voucher_properties.validity.end_date,
            endTime: moment(voucher_properties.validity.end_date).format('HH:mm')
          },
          issuanceDate: {
            times: voucher_properties.validity.times,
            duration: voucher_properties.validity.duration
          }
        }
      };
    } else {
      vouchers = {
        voucherValidity: {
          duration: 'day',
          times: 30,
          type: 'issuance_date'
        }
      };
    }
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
        merchantId: data.attributes.organization_id
      },
      vouchers,
      displayProperties: data.attributes.display_properties
    };
  }

  public static transformFromRewardForm(data: IRewardEntityForm): IRewardEntityApi {
    return {
      type: 'entities',
      attributes: {
        name: data.name,
        image_url: data.rewardInfo.image,
        reward_type: data.rewardInfo.rewardType,
        category: data.rewardInfo.category,
        redemption_type: data.rewardInfo.redemptionType,
        cost_of_reward: data.rewardInfo.cost,
        description: data.rewardInfo.description,
        terms_conditions: data.rewardInfo.termsAndCondition,
        organization_id: data.rewardInfo.merchantId,
        display_properties: {
          ...(data.displayProperties || {}),
          voucher_properties: {
            ...RewardHttpAdapter.getVoucherProperties(data),
            validity: {
              ...RewardHttpAdapter.getRewardValidity(data)
            }
          }
        }
      }
    };
  }

  public static getVoucherProperties(data: IRewardEntityForm): { [key: string]: any } {
    if (data.vouchers.voucherCode.type === 'single_code' || data.rewardInfo.redemptionType === 'Merchant PIN') {
      return {
        code_type: data.vouchers.voucherCode.type,
        code: data.vouchers.voucherCode.singleCode.code
      };
    }
    if (data.vouchers.voucherCode.type === 'system_generated') {
      return {
        code_type: data.vouchers.voucherCode.type,
        prefix: data.vouchers.voucherCode.uniqueGeneratedCode.prefix,
        length: data.vouchers.voucherCode.uniqueGeneratedCode.length,
        format_type: data.vouchers.voucherCode.uniqueGeneratedCode.codeFormat
      };
    }
    return {code_type: data.vouchers.voucherCode.type};
  }

  public static getRewardValidity(data: any): { [key: string]: any } {
    switch (data.vouchers.voucherValidity.type) {
      case 'period':
        return {
          type: data.vouchers.voucherValidity.type,
          ...RewardHttpAdapter.getRewardDate(data.vouchers.voucherValidity.period)
        };
      case 'issuance_date':
        return {
          type: data.vouchers.voucherValidity.type,
          times: data.vouchers.voucherValidity.issuanceDate.times,
          duration: data.vouchers.voucherValidity.issuanceDate.duration
        };
    }
  }

  public static getRewardDate(period: any): { [key: string]: any } {
    const res = {
      start_date: RewardHttpAdapter.setTime(period.startDate, period.startTime)
    };
    if (!period.disabledEndDate) {
      res['end_date'] = RewardHttpAdapter.setTime(period.endDate, period.endTime);
    }
    return res;
  }

  public static setTime(date: string, time: any): any {
    const [hours, minutes] = time.split(':');
    return moment(date).set({hours, minutes}).utc().toDate();
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
              type: data.voucherValidity.type,
              start_date: data.voucherValidity.startDate,
              end_date: data.voucherValidity.endDate,
              times: data.voucherValidity.times,
              duration: data.voucherValidity.duration
            }
          }
        }
      }
    };
  }
}
