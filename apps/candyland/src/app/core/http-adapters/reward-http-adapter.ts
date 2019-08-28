export class RewardHttpAdapter {
  // tslint:disable
  public static transformToReward(data: any): Reward {
    return {
      id: +data.id,
      image: data.attributes.image_url,
      name: data.attributes.name,
      type: data.type,
      rewardType: data.attributes.reward_type,
      current: data.attributes.cost_of_reward,
      total: 100,
      prprobability: null,
      category: data.attributes.category
    };
  }
}
