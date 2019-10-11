import * as moment from 'moment';
import {
  EngagementTypeAPIMapping,
  EngagementTypeFromAPIMapping,
  EngagementType
} from '@cl-core/models/engagement/engagement-type.enum';
import { ICampaignAttributes, IOutcomeAttributes } from '@perx/whistler';
import { ICampaignTableData, ICampaign } from '@cl-core/models/campaign/campaign.interface';

export class CampaignsHttpAdapter {
  public static transformToCampaign(data: any): ICampaignTableData {
    const eType = data.attributes.engagement_type ?
      CampaignsHttpAdapter.EngagementTypePipeTransform(EngagementTypeFromAPIMapping[data.attributes.engagement_type])
      : '';
    return {
      id: data.id,
      name: data.attributes.name,
      status: data.attributes.status,
      begin: CampaignsHttpAdapter.stringToDate(data.attributes.start_date_time),
      end: CampaignsHttpAdapter.stringToDate(data.attributes.end_date_time),
      audience: data.attributes.pool_id,
      goal: data.attributes.goal,
      engagementType: eType
    };
  }

  public static EngagementTypePipeTransform(value: string): string {
    return value.split('_')
      .map(w => `${w.substring(0, 1).toLocaleUpperCase()}${w.substring(1).toLocaleLowerCase()}`)
      .join(' ');
  }

  public static transformTableData(data: any): ITableData<ICampaignTableData> {
    return {
      data: data.data.map(item => CampaignsHttpAdapter.transformToCampaign(item)),
      meta: data.meta
    };
  }

  public static transformAPIResponseToCampaign(data: IJsonApiItem<ICampaignAttributes>): ICampaign {
    const campaignData = data.attributes;
    return {
      id: data.id,
      name: campaignData.name,
      engagement_id: campaignData.engagement_id,
      engagement_type: EngagementTypeFromAPIMapping[campaignData.engagement_type],
      campaignInfo: {
        goal: campaignData.goal,
        startDate: campaignData.start_date_time ? new Date(campaignData.start_date_time) : null,
        startTime: campaignData.start_date_time ? moment(campaignData.start_date_time).format('LT') : '',
        endDate: campaignData.end_date_time ? new Date(campaignData.end_date_time) : null,
        endTime: campaignData.end_date_time ? moment(campaignData.end_date_time).format('LT') : '',
        disabledEndDate: !campaignData.end_date_time,
        labels: campaignData.labels
      },
      template: {},
      rewardsList: []
    };
  }

  public static transformPossibleOutcomesFromCampaign(data: any[], slotNumber?: number): IOutcomeAttributes[] {
    return data.map(
      reward => {
        let rewardData;
        if (reward.value && reward.value.id) {
          rewardData = {
            id: reward.value.outcomeId,
            result_id: reward.value.id,
            result_type: 'reward',
            probability: reward.probability / 100 || null
          };
        } else {
          rewardData = {
            id: reward.value.outcomeId,
            no_outcome: true,
            probability: reward.probability / 100 || null
          };
        }

        if (slotNumber) {
          rewardData.loot_box_id = slotNumber;
        }
        return rewardData;
      }
    );
  }

  public static transformFromCampaign(data: ICampaign): IJsonApiItem<ICampaignAttributes> {
    const possibleOutcomes = data.template.attributes_type === EngagementType.stamp ?
      data.rewardsListCollection.map(
        rewardsData =>
          CampaignsHttpAdapter.transformPossibleOutcomesFromCampaign(rewardsData.rewardsOptions.rewards, rewardsData.stampSlotNumber)
      ).flat(1) :
      CampaignsHttpAdapter.transformPossibleOutcomesFromCampaign(data.rewardsOptions.rewards);

    const comm = data.channel.type === 'sms' ? {
      template: {
        content: data.channel.message
      },
      event: {
        id: data.channel.templateId,
        pool_id: data.audience.select,
        provider_id: 1,
        send_at: data.channel.schedule ?
          moment(moment(data.channel.schedule.sendDate).format('l') + ' ' + data.channel.schedule.sendTime).format() :
          '',
        channel: data.channel.type
      }
    } : {
        event: {
          id: data.channel.eventId,
          channel: data.channel.type
        }
      };

    return {
      type: 'entities',
      attributes: {
        name: data.name,
        engagement_type: EngagementTypeAPIMapping[data.template.attributes_type],
        engagement_id: data.template.id,
        status: 'scheduled',
        start_date_time: moment(moment(data.campaignInfo.startDate).format('l') + ' ' + data.campaignInfo.startTime).format(),
        end_date_time: moment(moment(data.campaignInfo.endDate).format('l') + ' ' + data.campaignInfo.endTime).format(),
        goal: data.campaignInfo.goal,
        labels: data.campaignInfo.labels || [],
        possible_outcomes: possibleOutcomes,
        comm
      }
    };
  }

  private static stringToDate(stringDate: string | null): Date | null {
    return stringDate ? new Date(stringDate) : null;
  }

}
