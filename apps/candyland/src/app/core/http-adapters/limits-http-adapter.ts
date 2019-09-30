import { EngagementTypeFromAPIMapping } from '@cl-core/models/engagement/engagement-type.enum';

export class LimitsHttpAdapter {
  public static transformAPIResponseToLimit(data: ILimitApi): ILimit {
    return {
      id: data.id,
      ...data.attributes,
      period_unit: LimitsDurationFromAPIMapping[data.attributes.period_unit]
    };
  }

  public static transformFromLimits(data: { times?: number, duration: string }, type: string): ILimitApi {
    const engagementType = EngagementTypeFromAPIMapping[type];

    switch (engagementType) {
      case 'game':
        return {
          type,
          attributes: {
            max_plays_in_period: data.times,
            period_unit: LimitsDurationToAPIMapping[data.duration],
            period_number: 1
          }
        };
      case 'survey':
      case 'instant_reward':
        return {
          type,
          attributes: {
            max_responses_per_user: data.times
          }
        };
      case 'stamps':
        return {
          type,
          attributes: {
            max_responses_per_user: data.times
          }
        };
    }
  }
}
