declare interface ILimit {
  max_plays_in_period?: number;
  period_number?: number;
  period_unit?: string;
  max_responses_per_user?: number;
  max_responses_for_campaign?: number;
}

declare interface ILimitApi {
  id?: string;
  type: string;
  attributes: ILimitAPIAttributes;
}

declare interface ILimitAPIAttributes {
  max_plays_in_period?: number;
  period_number?: number;
  period_unit?: string;
  max_responses_per_user?: number;
  max_responses_for_campaign?: number;
}

declare enum LimitsDurationToAPIMapping {
  day = 'days',
  week = 'weeks',
  month = 'months'
}

declare enum LimitsDurationFromAPIMapping {
  days = 'day',
  weeks = 'week',
  months = 'month'
}
