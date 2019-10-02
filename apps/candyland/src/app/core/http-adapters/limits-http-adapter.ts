import { EngagementTypeFromAPIMapping } from '@cl-core/models/engagement/engagement-type.enum';
import { ILimit, IInstantOutcomeLimitAttributes, ISurveyLimitAttributes, IGameLimitAttributes } from '@perx/whistler';
import { IJsonApiItem, IJsonApiPostData } from '@cl-core/http-services/jsonapi.payload';
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
  public static transformAPIResponseToLimit(
    data: IJsonApiItem<IInstantOutcomeLimitAttributes | ISurveyLimitAttributes | IGameLimitAttributes>,
    type: string): ILimit {
    let dataAtt;
    switch (type) {
      case 'game':
        dataAtt = data.attributes as IGameLimitAttributes;
        return {
          id: data.id,
          times: dataAtt.max_plays_in_period,
          duration: LimitsDurationFromAPIMapping[dataAtt.period_unit]
        };
      case 'survey':
      case 'instant_reward':
      case 'stamps':
        dataAtt = data.attributes as ISurveyLimitAttributes | IInstantOutcomeLimitAttributes;
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
  ): IJsonApiPostData<IInstantOutcomeLimitAttributes | ISurveyLimitAttributes | IGameLimitAttributes> {
    switch (type) {
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
