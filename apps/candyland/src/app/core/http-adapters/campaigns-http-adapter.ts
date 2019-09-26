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
    const campaignData = data.attributes;
    console.log(data);
    return {
      id: data.id,
      engagement_id: campaignData.engagement_id,
      engagement_type: campaignData.engagement_type,
      campaignInfo: {
        goal: campaignData.goal,
        startDate: new Date(campaignData.start_date_time),
        startTime: `${(new Date(campaignData.start_date_time)).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`,
        endDate: new Date(campaignData.end_date_time),
        endTime: `${(new Date(campaignData.end_date_time)).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`,
        disabledEndDate: !campaignData.end_date_time,
        labels: campaignData.labels
      },
      channel: {
        type: campaignData.comm_channel,
        message: null,
        schedule: {
          sendDate: null,
          sendTime: null,
          enableRecurrence: false,
          recurrence: { times: null, period: null, repeatOn: [] }
        }
      },
      audience: { type: 'none', file: null },
      template: {},
      rewardsList: campaignData.possible_outcomes,
    };
  }

  public static transformFromCampaign(data: any): any {
    return {
      type: "entities",
      attributes: {
        name: data.name,
        engagement_type: data.template.attributes_type,
        engagement_id: data.template.id,
        comm_channel: data.channel.type,
        // status: "draft",
        start_date_time: data.campaignInfo.startDate + data.campaignInfo.startTime,
        end_date_time: data.campaignInfo.endDate + data.campaignInfo.endTime,
        goal: data.campaignInfo.goal,
        pool_id: data.audience.select
        // possible_outcomes: "",
        // comm: "description",
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
