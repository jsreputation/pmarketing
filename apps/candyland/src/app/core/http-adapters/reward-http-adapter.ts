export class RewardHttpAdapter {
  // tslint:disable
  public static transformToReward(data: IRewardApi): IReward {
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

  public static transformToRewardForm(data: IRewardApi): IRewardForm {
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

  public static transformFromRewardForm(data: IRewardForm): IRewardApi {
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

  public static transformFromReward(data: IReward): IRewardApi {
    return {
        type: 'entities',
        attributes: {
          name: data.name,
          image_url: data.image,
          reward_type: data.rewardType,
          category: data.category,
          redemption_type: data.redemptionType,
          cost_of_reward: data.current,
        }
    };
  }
}
