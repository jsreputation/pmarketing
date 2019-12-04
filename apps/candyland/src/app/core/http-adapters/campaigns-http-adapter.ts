import * as moment from 'moment';
import {
  EngagementTypeAPIMapping,
  EngagementTypeFromAPIMapping
} from '@cl-core/models/engagement/engagement-type.enum';
import {
  IWCampaignAttributes,
  WEngagementType,
  WInformationCollectionSettingType
} from '@perx/whistler';
import { ICampaignTableData, ICampaign } from '@cl-core/models/campaign/campaign.interface';
import { InformationCollectionSettingType } from '@cl-core/models/campaign/campaign.enum';
import { DateTimeParser } from '@cl-helpers/date-time-parser';

export class CampaignsHttpAdapter {

  public static transformCampaignStatus(status: string): IJsonApiItem<Partial<IWCampaignAttributes>> {
    return {
      type: 'entities',
      attributes: {
        status
      }
    };
  }

  public static transformToCampaign(data: IJsonApiItem<IWCampaignAttributes>): ICampaignTableData {
    const eType = data.attributes.engagement_type ?
      CampaignsHttpAdapter.EngagementTypePipeTransform(EngagementTypeFromAPIMapping[data.attributes.engagement_type])
      : '';
    return {
      id: data.id,
      name: data.attributes.name,
      status: data.attributes.status,
      begin: DateTimeParser.stringToDate(data.attributes.start_date_time),
      end: DateTimeParser.stringToDate(data.attributes.end_date_time),
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

  public static transformTableData(data: IJsonApiListPayload<IWCampaignAttributes>): ITableData<ICampaignTableData> {
    return {
      data: data.data.map(item => CampaignsHttpAdapter.transformToCampaign(item)),
      meta: data.meta
    };
  }

  public static transformInformationCollectionType(data: WInformationCollectionSettingType): InformationCollectionSettingType {
    let result: InformationCollectionSettingType;
    switch (data) {
      case WInformationCollectionSettingType.not_required:
        result = InformationCollectionSettingType.notRequired;
        break;
      case WInformationCollectionSettingType.pi_required:
        result = InformationCollectionSettingType.piRequired;
        break;
      case WInformationCollectionSettingType.signup_required:
        result = InformationCollectionSettingType.signupRequired;
        break;
    }
    return result;
  }

  public static transformAPIResponseToCampaign(data: IJsonApiItem<IWCampaignAttributes>): ICampaign {
    const campaignData = data.attributes;
    return {
      id: data.id,
      name: campaignData.name,
      status: campaignData.status,
      engagement_id: `${campaignData.engagement_id}`,
      engagement_type: EngagementTypeFromAPIMapping[campaignData.engagement_type],
      campaignInfo: {
        informationCollectionSetting: CampaignsHttpAdapter.transformInformationCollectionType(
          campaignData.display_properties.informationCollectionSetting),
        goal: campaignData.goal,
        startDate: DateTimeParser.stringToDate(campaignData.start_date_time),
        startTime: DateTimeParser.stringToTime(campaignData.start_date_time, 'LT'),
        endDate: DateTimeParser.stringToDate(campaignData.end_date_time),
        endTime: DateTimeParser.stringToTime(campaignData.end_date_time, 'LT'),
        disabledEndDate: !campaignData.end_date_time,
        labels: campaignData.labels
      },
      template: {},
      rewardsList: [],
      displayProperties: { ...campaignData.display_properties }
    };
  }

  public static transformFromCampaign(data: ICampaign): IJsonApiItem<IWCampaignAttributes> {
    const startTime = data.campaignInfo.startTime ? data.campaignInfo.startTime : moment().format('LT');
    const endTime = data.campaignInfo.endTime ? data.campaignInfo.endTime : moment().format('LT');
    const startDate = data.campaignInfo.startDate ?
      moment(moment(data.campaignInfo.startDate).format('l') + ' ' + startTime).format() : null;
    const endDate = data.campaignInfo.endDate ? moment(moment(data.campaignInfo.endDate).format('l') + ' ' + endTime).format() : null;
    // When user not select weblink, default the information collection setting back to not required. Double confirm with Nocolas
    const informationCollectionSetting = data.channel.type === 'weblink' ?
      data.campaignInfo.informationCollectionSetting : InformationCollectionSettingType.notRequired;
    return {
      type: 'entities',
      attributes: {
        name: data.name,
        engagement_type: EngagementTypeAPIMapping[data.template.attributes_type] as WEngagementType,
        engagement_id: data.template.id,
        status: 'scheduled',
        start_date_time: startDate,
        end_date_time: endDate,
        goal: data.campaignInfo.goal,
        pool_id: data.audience.select ? Number.parseInt(data.audience.select, 10) : null,
        labels: data.campaignInfo.labels || [],
        display_properties: { ...data.displayProperties, informationCollectionSetting }
      }
    };
  }
}
