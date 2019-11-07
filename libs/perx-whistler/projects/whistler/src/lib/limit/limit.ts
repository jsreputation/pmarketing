export interface IWInstantOutcomeLimitAttributes {
    engagement_id: number;
    campaign_entity_id: number;
    max_responses_per_user: number;
    max_responses_for_campaign: number;
}

export interface IWSurveyLimitAttributes {
    engagement_id: number;
    campaign_entity_id: number;
    max_responses_per_user: number;
}

// Now finished in backend
// export interface IWLoyaltyLimitAttributes {
//   engagement_id: number,
//   campaign_entity_id: number,
// }

export interface IWGameLimitAttributes {
    engagement_id: number;
    campaign_entity_id: number;
    max_plays_in_period: number;
    period_number: number;
    period_unit: string;
}
