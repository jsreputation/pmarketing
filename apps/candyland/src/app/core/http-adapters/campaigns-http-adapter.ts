import * as moment from 'moment';
import { EngagementTypeAPIMapping } from '@cl-core/models/engagement/engagement-type.enum';

// enum LimitsDurationToAPIMapping {
//   day = 'days',
//   week = 'weeks',
//   month = 'months'
// }

// enum LimitsDurationFromAPIMapping {
//   days = 'day',
//   weeks = 'week',
//   months = 'month'
// }
export class CampaignsHttpAdapter {
  // tslint:disable
  public static transformToCampaign(data: any): ICampaign {
    return {
      id: data.id,
      name: data.attributes.name,
      status: data.attributes.status,
      begin: CampaignsHttpAdapter.stringToDate(data.attributes.start_date_time),
      end: CampaignsHttpAdapter.stringToDate(data.attributes.end_date_time),
      audience: data.attributes.pool_id,
      goal: data.attributes.goal,
      engagementType: data.attributes.engagement_type
    };
  }

  public static transformTableData(data: any): ITableData<ICampaign> {
    return {
      data: data.data.map(item => CampaignsHttpAdapter.transformToCampaign(item)),
      meta: data.meta
    }
  }

  public static transformAPIResponseToCampaign(data: any): any {
    console.log(data);
    const campaignData = data.data.attributes;
    const campaignOutcomes = data.includes && data.includes.possible_outcomes || [];
    // const campaignLimits = data.includes && data.includes.limits;
    return {
      id: data.data.id,
      name: campaignData.name,
      engagement_id: campaignData.engagement_id,
      engagement_type: campaignData.engagement_type,
      campaignInfo: {
        goal: campaignData.goal,
        startDate: campaignData.start_date_time ? new Date(campaignData.start_date_time) : new Date(),
        startTime: campaignData.start_date_time ? moment(campaignData.start_date_time).format('LT') : '',
        endDate: campaignData.end_date_time ? new Date(campaignData.end_date_time) : new Date(),
        endTime: campaignData.end_date_time ? moment(campaignData.end_date_time).format('LT') : '',
        disabledEndDate: !campaignData.end_date_time,
        // labels: campaignData.labels
      },
      // TODO, Andrew, need API support for channel data
      channel: {
        type: campaignData.comm_channel,
        // type: campaignData.comm.event.channel,
        // message: campaignData.comm.template.content,
        // schedule: {
        //   sendDate: new Date(campaignData.comm.event.send_at),
        //   sendTime: moment(campaignData.comm.event.send_at).format('LT'),
        //   enableRecurrence: false,
        //   recurrence: { times: null, period: null, repeatOn: [] }
        // }
      },
      audience: { type: 'select', select: (campaignData.pool_id).toString(), file: null },
      template: {},
      rewardsList: campaignOutcomes,
      // limits: {
      //   time: campaignLimits && campaignLimits.max_play_in_period,
      //   duration: campaignLimits && LimitsDurationFromAPIMapping[campaignLimits.period_unit]
      // }
    };
  }

  public static transformFromCampaign(data: any): any {
    console.log(data);
    const possible_outcomes = data.rewardsOptions.rewards.map(
      reward => ({ result_id: reward.value ? reward.value.id : '', result_type: 'reward', probability: reward.probability / 100 })
    ).filter(outcomes => outcomes.result_id);

    return {
      type: "entities",
      attributes: {
        name: data.name,
        engagement_type: EngagementTypeAPIMapping[data.template.attributes_type],
        engagement_id: data.template.id,
        comm_channel: data.channel.type,
        status: "scheduled",
        start_date_time: moment(moment(data.campaignInfo.startDate).format('l') + ' ' + data.campaignInfo.startTime).format(),
        end_date_time:  moment(moment(data.campaignInfo.endDate).format('l') + ' ' + data.campaignInfo.endTime).format(),
        goal: data.campaignInfo.goal,
        pool_id: data.audience.select,
        // labels: data.campaignInfo.label,
        possible_outcomes,
        // limits: {
        //   max_play_in_period: data.limits.time,
        //   period_unit: LimitsDurationToAPIMapping[data.limits.duration],
        //   period_number: 1
        // },
        comm: {
          template: {
            content: data.channel.message
          },
          event: {
            send_at: data.channel.schedule ? moment(moment(data.channel.schedule.sendDate).format('l') + ' ' + data.channel.schedule.sendTime).format() : '',
            channel: data.channel.type
          }
        }
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
            code_type: data.vouchers.voucherCode.type,
            code: data.vouchers.voucherCode.singleCode.code,
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
          },
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
              type: data.voucherValidity.type,
              start_date: data.voucherValidity.startDate,
              end_date: data.voucherValidity.endDate
            }
          }
        }
      }
    };
  }

  private static stringToDate(stringDate: string | null): Date | null {
    return stringDate ? new Date(stringDate) : null;
  }

}
