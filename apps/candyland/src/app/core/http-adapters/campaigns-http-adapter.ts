import { IAudienceFilter } from './../models/campaign/campaign';
import * as moment from 'moment';
import {
  EngagementTypeAPIMapping, EngagementTypeFromAPIMapping
} from '@cl-core/models/engagement/engagement-type.enum';
import {
  IWCampaignAttributes, WEngagementType,
  IWAudiences,
  WInformationCollectionSettingType,
  IJsonApiItem,
  IJsonApiListPayload,
  IJsonApiPatchData,
  IJsonApiPostData,
} from '@perx/whistler';
import { ICampaignTableData, ICampaign } from '@cl-core/models/campaign/campaign';
import { DateTimeParser } from '@cl-helpers/date-time-parser';
import { WCampaignStatus, IWAudienceFilter } from '@perx/whistler';
import { CampaignStatus, InformationCollectionSettingType } from '@cl-core/models/campaign/campaign.enum';

export class CampaignsHttpAdapter {
  private static WStat2Stat: { [k in WCampaignStatus]: CampaignStatus } = {
    scheduled: CampaignStatus.scheduled,
    paused: CampaignStatus.paused,
    active: CampaignStatus.active,
    ended: CampaignStatus.ended,
    draft: CampaignStatus.draft
  };
  private static Stat2WStat: { [k in CampaignStatus]: WCampaignStatus } = {
    scheduled: WCampaignStatus.scheduled,
    paused: WCampaignStatus.paused,
    active: WCampaignStatus.active,
    ended: WCampaignStatus.ended,
    draft: WCampaignStatus.draft
  };

  public static transformCampaignStatus(status: CampaignStatus, id: string): IJsonApiPatchData<IWCampaignAttributes> {
    return {
      id,
      type: 'entities',
      attributes: {
        status: CampaignsHttpAdapter.Stat2WStat[status]
      }
    };
  }

  public static transformAudienceFilter(audienceFilter: IAudienceFilter): IWAudienceFilter {
    return {
      gender: audienceFilter.genderEnabled ? audienceFilter.gender || null : null,
      ages: audienceFilter.agesEnabled ? [...audienceFilter.ages] || null : null,
    };
  }

  public static transformAudienceFilterFromAPI(audienceFilter: IWAudienceFilter): IAudienceFilter {
    return {
      agesEnabled: !!(audienceFilter.ages && audienceFilter.ages.length > 0),
      genderEnabled: !!audienceFilter.gender,
      gender: audienceFilter.gender || null,
      ages: audienceFilter.ages ? [...audienceFilter.ages] : [],
    };
  }

  public static transformToCampaign(
    data: IJsonApiItem<IWCampaignAttributes>,
    includedPools?: IJsonApiItem<IWAudiences>[]
  ): ICampaignTableData {
    const audienceCheck: IJsonApiItem<IWAudiences> | undefined = includedPools ? includedPools
      .find(pool => +pool.id === (data.attributes.pool_id || Number.MAX_SAFE_INTEGER)) : undefined;
    const audience: string = audienceCheck ? audienceCheck.attributes.name : '-';
    const eType: string = data.attributes.engagement_type
      ? CampaignsHttpAdapter.EngagementTypePipeTransform(EngagementTypeFromAPIMapping[data.attributes.engagement_type]) : '';
    return {
      id: data.id, name: data.attributes.name, status: CampaignsHttpAdapter.WStat2Stat[data.attributes.status],
      begin: DateTimeParser.stringToDate(data.attributes.start_date_time),
      end: DateTimeParser.stringToDate(data.attributes.end_date_time),
      audience,
      goal: data.attributes.goal, engagementType: eType
    };
  }

  public static EngagementTypePipeTransform(value: string): string {
    return value.split('_')
      .map(w => `${w.substring(0, 1).toLocaleUpperCase()}${w.substring(1).toLocaleLowerCase()}`)
      .join(' ');
  }

  public static transformTableData(data: IJsonApiListPayload<IWCampaignAttributes>): ITableData<ICampaignTableData> {
    return {
      data: data.data.map(item => CampaignsHttpAdapter.transformToCampaign(item, data.included)), meta: data.meta
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
      audience: {
        select: '' + data.attributes.pool_id,
        filters: CampaignsHttpAdapter.transformAudienceFilterFromAPI(data.attributes.audience_segment || {})
      },
      id: data.id,
      name: campaignData.name,
      status: CampaignsHttpAdapter.WStat2Stat[campaignData.status],
      engagement_id: `${campaignData.engagement_id}`,
      engagement_type: EngagementTypeFromAPIMapping[campaignData.engagement_type], campaignInfo: {
        goal: campaignData.goal,
        startDate: DateTimeParser.stringToDate(campaignData.start_date_time),
        startTime: DateTimeParser.stringToTime(campaignData.start_date_time, 'LT'),
        endDate: DateTimeParser.stringToDate(campaignData.end_date_time),
        endTime: DateTimeParser.stringToTime(campaignData.end_date_time, 'LT'),
        disabledEndDate: !campaignData.end_date_time, labels: campaignData.labels
      },
      template: {},
      outcomes: [],
      notification: {
        webNotification: {
          webLink: campaignData.display_properties.weblink ? true : false,
          webLinkOptions: CampaignsHttpAdapter.transformInformationCollectionType(
            campaignData.display_properties.informationCollectionSetting
          )
        },
        sms: false
      },
      displayProperties: { ...campaignData.display_properties }
    };
  }

  public static transformFromCampaign(data: ICampaign): IJsonApiPostData<IWCampaignAttributes> {
    const startTime = data.campaignInfo.startTime ? data.campaignInfo.startTime : moment().format('LT');
    const endTime = data.campaignInfo.endTime ? data.campaignInfo.endTime : moment().format('LT');
    const startDate = data.campaignInfo.startDate
      ? moment(moment(data.campaignInfo.startDate).format('l') + ' ' + startTime).format()
      : null;
    const endDate = data.campaignInfo.endDate ? moment(moment(data.campaignInfo.endDate).format('l') + ' ' + endTime).format() : null;
    // When user not select weblink, default the information collection setting back to not required. Double confirm with Nocolas
    const informationCollectionSetting = data.notification.webNotification.webLink
      ? data.notification.webNotification.webLinkOptions
      : InformationCollectionSettingType.notRequired;
    const weblink = data.notification.webNotification.webLink ? true : false;
    return {
      type: 'entities',
      attributes: {
        name: data.name,
        engagement_type: EngagementTypeAPIMapping[data.template.attributes_type] as WEngagementType,
        engagement_id: data.template.id,
        status: WCampaignStatus.scheduled,
        start_date_time: startDate,
        end_date_time: endDate,
        goal: data.campaignInfo.goal,
        pool_id: data.audience.select ? Number.parseInt(data.audience.select, 10) : null,
        labels: data.campaignInfo.labels || [],
        audience_segment: data.audience.select ? CampaignsHttpAdapter.transformAudienceFilter(data.audience.filters) : {},
        display_properties: { ...data.displayProperties, informationCollectionSetting, weblink }
      }
    };
  }
}
