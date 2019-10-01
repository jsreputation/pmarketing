import { EngagementTypeFromAPIMapping } from '@cl-core/models/engagement/engagement-type.enum';
enum LimitsDurationToAPIMapping {
  day = 'days',
  week = 'weeks',
  month = 'months'
}

enum LimitsDurationFromAPIMapping {
  days = 'day',
  weeks = 'week',
  months = 'month'
}
export class LimitsHttpAdapter {
  public static transformAPIResponseToLimit(data: ILimitApi): ILimit {
    return {
      id: data.id,
      ...data.attributes,
      period_unit: LimitsDurationFromAPIMapping[data.attributes.period_unit]
    };
  }

  public static transformFromLimits(
    data: { times?: number, duration: string },
    type: string,
    campaignId: number,
    engagementId: number
  ): ILimitApi {
    const engagementType = EngagementTypeFromAPIMapping[type];
    switch (engagementType) {
      case 'game':
        return {
          type: 'limits',
          attributes: {
            engagement_id: engagementId,
            campaign_entity_id: campaignId,
            max_plays_in_period: data.times,
            period_unit: LimitsDurationToAPIMapping[data.duration],
            period_number: 1
          }
        };
      case 'survey':
      case 'instant_reward':
        return {
          type: 'limits',
          attributes: {
            engagement_id: engagementId,
            campaign_entity_id: campaignId,
            max_responses_per_user: data.times
          }
        };
      case 'stamps':
        return {
          type: 'limits',
          attributes: {
            engagement_id: engagementId,
            campaign_entity_id: campaignId,
            max_responses_per_user: data.times
          }
        };
    }
  }
}
