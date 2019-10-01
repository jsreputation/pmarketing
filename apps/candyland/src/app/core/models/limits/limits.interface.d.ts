declare interface ILimit {
  id?: string;
  times?: number;
  duration?: string; 
}

declare interface ILimitApi {
  id?: string;
  type: string;
  attributes: ILimitAPIAttributes;
}

declare interface ILimitAPIAttributes {
  engagement_id: number,
  campaign_entity_id: number,
  max_plays_in_period?: number;
  period_number?: number;
  period_unit?: string;
  max_responses_per_user?: number;
  max_responses_for_campaign?: number;
}

