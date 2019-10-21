import * as moment from 'moment';

export class RewardHttpAdapter {
  // tslint:disable
  public static transformToTableData(data: any): ITableData<IRewardEntity> {
    const formatData = data.data.map((item) => {
      const formatItem = RewardHttpAdapter.transformToReward(item);
      formatItem.merchantName = RewardHttpAdapter.includeOrganization(item, data);
      return formatItem;
    });
    return { data: formatData, meta: data.meta}
  }

  public static includeOrganization(currentData: any, response: any) {
    const id = currentData.relationships.organization.data ? currentData.relationships.organization.data.id : null;
    if (id && response.included && response.included.length) {
      for (let i = 0; i <= response.included.length - 1; i++) {
        if (id === response.included[i].id) {
          return  response.included[i].attributes.name;
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
            startTime: moment(voucher_properties.validity.start_date).utc().format('HH:mm'),
            endDate: voucher_properties.validity.end_date,
            endTime: moment(voucher_properties.validity.end_date).utc().format('HH:mm')
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
        organizationId: data.attributes.organization_id
      },
      vouchers
    };
  };

  public static transformFromRewardForm(data: IRewardEntityForm, loyalties?: any): IRewardEntityApi {
    const result = {
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
        organization_id: data.rewardInfo.organizationId,
        display_properties: {
          voucher_properties: {
            ...RewardHttpAdapter.getVoucherProperties(data),
            loyalties: loyalties,
          },
          validity: {
            type: data.vouchers.voucherValidity.type
          }
        }
      }
    };
    RewardHttpAdapter.handlerRewardDate(data, result);

    return result;
  }

  public static getVoucherProperties(data) {
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

  public static handlerRewardDate(data: any, rewardRequestData: any): void {
    switch (data.vouchers.voucherValidity.type) {
      case 'period':
        const period = {
          startDate: data.vouchers.voucherValidity.period.startDate,
          startTime: data.vouchers.voucherValidity.period.startTime,
          endDate: data.vouchers.voucherValidity.period.endDate,
          endTime: data.vouchers.voucherValidity.period.endTime
        };
        RewardHttpAdapter.setRewardSendDate(rewardRequestData, period);
        break;
      case 'issuance_date':
        const issuance = {
          times: data.vouchers.voucherValidity.issuanceDate.times,
          duration: data.vouchers.voucherValidity.issuanceDate.duration
        };
        RewardHttpAdapter.setRewardIssuanceDate(rewardRequestData, issuance);
        break;
    }
  }

  public static setRewardSendDate(rewardRequestData: any, period: any) {
    if (period.startDate) {
      rewardRequestData.attributes.display_properties.voucher_properties.validity.start_date
        = RewardHttpAdapter.setTime(period.startDate, period.startTime);
    }
    if (period.endDate) {
      rewardRequestData.attributes.display_properties.voucher_properties.validity.end_date
        = RewardHttpAdapter.setTime(period.endDate, period.endTime);
    }
  }

  public static setRewardIssuanceDate(rewardRequestData: any, issuance: any) {
    if (issuance.times) {
      rewardRequestData.attributes.display_properties.voucher_properties.validity.times
        = issuance.times;
    }
    if (issuance.duration) {
      rewardRequestData.attributes.display_properties.voucher_properties.validity.duration
        = issuance.duration;
    }
  }

  public static setTime(date: string, time: any): string {
    const [hours, minutes] = time.split(':');
    const resultDate = moment(date).set({hours: hours, minutes: minutes}).toISOString();
    return resultDate;
  }

  public static transformFromRewardSystemForm(data: IRewardEntityForm): IRewardEntityApi {
    const result = {
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
        organization_id: data.rewardInfo.organizationId,
        display_properties: {
          voucher_properties: {
            code_type: data.vouchers.voucherCode.type,
            prefix: data.vouchers.voucherCode.uniqueGeneratedCode.prefix,
            length: data.vouchers.voucherCode.uniqueGeneratedCode.length,
            format_type: data.vouchers.voucherCode.uniqueGeneratedCode.codeFormat,
            validity: {
              type: data.vouchers.voucherValidity.type,
              start_date: data.vouchers.voucherValidity.period.startDate,
              end_date: data.vouchers.voucherValidity.period.endDate,
              times: data.vouchers.voucherValidity.issuanceDate.times,
              duration: data.vouchers.voucherValidity.issuanceDate.duration
            }
          }
        }
      }
    };
    RewardHttpAdapter.handlerRewardDate(data, result);
    return result;
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
