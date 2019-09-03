declare interface IRewardApi {
  id?: string;
  type: string;
  links?: {
    self?: string;
  };
  attributes: {
    urn?: string;
    created_at?: string;
    updated_at?: string;
    name: string;
    image_url?: string;
    reward_type: string;
    category: string;
    redemption_type: string;
    cost_of_reward: number;
    currency?: string;
    description?: string;
    terms_conditions?: string;
  };
}
