export interface IWTierRewardCost {
  type: string;
  id?: string;
  attributes: {
    apply_tier_discount: boolean;
    tier_value: number;
    custom_tier_id: string;
    entity_id: string;
  };
}
