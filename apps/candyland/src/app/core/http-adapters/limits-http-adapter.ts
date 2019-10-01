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
  public static transformAPIResponseToLimit(data: ILimitApi, type: string): ILimit {
    const engagementType = EngagementTypeFromAPIMapping[type];
    let dataAtt;
    switch (engagementType) {
      case 'game':
        dataAtt = data.attributes as IGameLimitAPIAttributes;
        return {
          id: data.id,
          times: dataAtt.max_plays_in_period,
          duration: LimitsDurationFromAPIMapping[dataAtt.period_unit]
        };
      case 'survey':
      case 'instant_reward':
      case 'stamps':
        dataAtt = data.attributes as ISurveyLimitAPIAttributes | IInstantOutcomeLimitAPIAttributes;
        return {
          id: data.id,
          times: dataAtt.max_responses_per_user
        };
    }
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
