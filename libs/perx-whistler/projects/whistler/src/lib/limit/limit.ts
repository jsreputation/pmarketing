export interface ILimit {
    id?: string;
    times: number;
    duration?: string;
}

export interface IInstantOutcomeLimitAttributes {
    engagement_id: number;
    campaign_entity_id: number;
    max_responses_per_user: number;
    max_responses_for_campaign: number;
}

export interface ISurveyLimitAttributes {
    engagement_id: number;
    campaign_entity_id: number;
    max_responses_per_user: number;
}

// Now finished in backend
// export interface ILoyaltyLimitAttributes {
//   engagement_id: number,
//   campaign_entity_id: number,
// }

export interface IGameLimitAttributes {
    engagement_id: number;
    campaign_entity_id: number;
    max_plays_in_period: number;
    period_number: number;
    period_unit: string;
}
