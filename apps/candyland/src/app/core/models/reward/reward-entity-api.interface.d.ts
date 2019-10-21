declare interface IRewardEntityApi {
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
    display_properties: {
      voucher_properties?: {
        code_type: string,
        code?: string,
        prefix?: string;
        length?: number;
        format_type?: string;
        validity: {
          type: string;
          start_date?: string;
          end_date?: string;
          times?: string;
          duration?: string;
        }
      },
      loyalties: any;
    }
    organization_id?: string;
  };
}
