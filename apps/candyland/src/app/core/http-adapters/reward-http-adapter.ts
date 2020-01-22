import { IWRewardEntityAttributes, IWTierRewardCostsAttributes, IJsonApiItem, IJsonApiPostData, IJsonApiListPayload } from '@perx/whistler';
import { DateTimeParser } from '@cl-helpers/date-time-parser';
import {
  IRewardEntityForm,
  IRewardEntityValidityPeriodForm,
  IRewardVoucherForm
} from '@cl-core/models/reward/reward-entity-form.interface';
import { IRewardEntity } from '@cl-core/models/reward/reward-entity.interface';
import { oc } from 'ts-optchain';
import { VouchersHttpAdapter } from './vouchers-http-adapter';

export class RewardHttpAdapter {
  public static transformToTableData(data: IJsonApiListPayload<IWRewardEntityAttributes>): ITableData<IRewardEntity> {
    const formatData = data.data.map((item) => {
      const formatItem = RewardHttpAdapter.transformToReward(item);
      formatItem.merchantName = RewardHttpAdapter.includeOrganization(item, data);
      return formatItem;
    });
    return { data: formatData, meta: data.meta };
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

  public static transformToReward(data: IJsonApiItem<IWRewardEntityAttributes>): IRewardEntity {
    const stats = VouchersHttpAdapter.transformToVoucherStatsObj(data.attributes.stats);
    const total = Object.values(stats).reduce((acc, curr) => acc + curr, 0);
    return {
      id: data.id,
      image: data.attributes.image_url,
      name: data.attributes.name,
      type: data.type,
      rewardType: data.attributes.reward_type,
      redemptionType: data.attributes.redemption_type,
      merchantId: data.attributes.organization_id || null,
      current: stats.available,
      total,
      category: data.attributes.category,
      tags: data.attributes.tags || []
    };
  }

  public static transformToRewardForm(data: IJsonApiItem<IWRewardEntityAttributes>): IRewardEntityForm {
    let vouchers: IRewardVoucherForm;
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
            startTime: DateTimeParser.getTime(voucher_properties.validity.start_date, 'HH:mm'),
            endDate: voucher_properties.validity.end_date,
            endTime: DateTimeParser.getTime(voucher_properties.validity.end_date, 'HH:mm'),
            disabledEndDate: oc(voucher_properties).validity.disabled_end_date(false)
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
          issuanceDate: {
            duration: 'day',
            times: '30',
          },
          type: 'issuance_date'
        }
      };
    }
    return {
      name: data.attributes.name,
      id: data.id,
      rewardInfo: {
        image: data.attributes.image_url,
        rewardType: data.attributes.reward_type,
        category: data.attributes.category,
        redemptionType: data.attributes.redemption_type,
        cost: data.attributes.cost_of_reward,
        description: data.attributes.description,
        termsAndCondition: data.attributes.terms_conditions,
        tags: data.attributes.tags,
        merchantId: data.attributes.organization_id,
        currency: data.attributes.display_properties.currency,
      },
      vouchers,
      displayProperties: data.attributes.display_properties,
      loyalties: data.attributes.display_properties.loyalties
    };
  }

  public static transformFromRewardForm(data: IRewardEntityForm, loyalties?: any): IJsonApiPostData<IWRewardEntityAttributes> {
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
        tags: data.rewardInfo.tags || [],
        organization_id: data.rewardInfo.merchantId,
        display_properties: {
          ...(data.displayProperties || {}),
          currency: data.rewardInfo.currency,
          voucher_properties: {
            ...RewardHttpAdapter.getVoucherProperties(data),
            validity: {
              ...RewardHttpAdapter.getRewardValidity(data)
            }
          },
          loyalties,
        }
      }
    };
  }

  public static getVoucherProperties(data: IRewardEntityForm): { [key: string]: any } {
    if (data.vouchers.voucherCode.type === 'single_code'
      || data.rewardInfo.redemptionType === 'Merchant PIN') {
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
    return { code_type: data.vouchers.voucherCode.type };
  }

  public static getRewardValidity(data: IRewardEntityForm): { [key: string]: any } {
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

  public static getRewardDate(period: IRewardEntityValidityPeriodForm): { [key: string]: any } {
    const res: { [key: string]: any } = {
      start_date: DateTimeParser.setTime(period.startDate, period.startTime)
    };
    if (!period.disabledEndDate) {
      res.end_date = DateTimeParser.setTime(period.endDate, period.endTime);
    }
    res.disabled_end_date = period.disabledEndDate;
    return res;
  }

  public static transformFromReward(data: IRewardEntity): IJsonApiPostData<IWRewardEntityAttributes> {
    return {
      type: 'entities',
      attributes: {
        name: data.name,
        image_url: data.image,
        reward_type: data.rewardType,
        category: data.category,
        redemption_type: data.redemptionType,
        cost_of_reward: data.current,
        tags: data.tags,
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
          },
          loyalties: null,
        }
      }
    };
  }

  public static transformFromLoyaltyForm(
    tier: ILoyaltyTiersFormGroup | IBasicTier,
    rewardId: string
  ): IJsonApiPostData<IWTierRewardCostsAttributes> {
    return {
      type: 'tier_reward_costs',
      attributes: {
        apply_tier_discount: tier.statusDiscount ? tier.statusDiscount : false,
        tier_value: tier.tierValue ? '' + tier.tierValue : '0',
        tier_id: +tier.tierId,
        entity_id: +rewardId,
        tier_type: tier.tierType
      }
    };
  }

  public static transformToLoyaltyCost(data: IJsonApiItem<Partial<IWTierRewardCostsAttributes>>): ITierRewardCost {
    return {
      tierRewardCostsId: +data.id,
      statusDiscount: data.attributes.apply_tier_discount,
      tierId: '' + data.attributes.tier_id,
      rewardId: data.attributes.entity_id,
      tierValue: Number.parseInt(data.attributes.tier_value, 10),
      tierType: data.attributes.tier_type
    };
  }
}
