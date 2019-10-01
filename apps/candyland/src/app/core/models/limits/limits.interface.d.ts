declare interface ILimit {
  id?: string;
  times?: number;
  duration?: string;
}

declare interface ILimitApi {
  id?: string;
  type: string;
  attributes: IInstantOutcomeLimitAPIAttributes | ISurveyLimitAPIAttributes | IGameLimitAPIAttributes;
}

declare interface IInstantOutcomeLimitAPIAttributes {
  engagement_id: number,
  campaign_entity_id: number,
  max_responses_per_user: number;
  max_responses_for_campaign: number;
}

declare interface ISurveyLimitAPIAttributes {
  engagement_id: number,
  campaign_entity_id: number,
  max_responses_per_user: number;
}

// Now finished in backend
// declare interface ILoyaltyLimitAPIAttributes {
//   engagement_id: number,
//   campaign_entity_id: number,
// }

declare interface IGameLimitAPIAttributes {
  engagement_id: number,
  campaign_entity_id: number,
  max_plays_in_period: number;
  period_number: number;
  period_unit: string;
}
