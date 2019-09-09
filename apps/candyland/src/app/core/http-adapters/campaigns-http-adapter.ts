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
        termsAndCondition: data.attributes.terms_conditions
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
        terms_conditions: data.rewardInfo.termsAndCondition
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
        cost_of_reward: data.current
      }
    };
  }

  private static stringToDate(stringDate: string | null): Date | null {
    return stringDate ? new Date(stringDate) : null;
  }

}
