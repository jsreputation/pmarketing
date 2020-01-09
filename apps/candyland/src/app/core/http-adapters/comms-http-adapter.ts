import * as moment from 'moment';
import {
  IWCommTemplateAttributes,
  IWCommEventAttributes,
  IJsonApiItem,
  IJsonApiPostData,
  IWCommMessageAttributes,
  IJsonApiListPayload
} from '@perx/whistler';
import { IComm, ICommMessage } from '@cl-core/models/comm/schedule';
import { ICampaign } from '@cl-core/models/campaign/campaign';

export class CommsHttpAdapter {
  public static transformTemplateAPIResponseToComm(data: IJsonApiItem<IWCommTemplateAttributes>): IComm {
    return {
      templateId: data.id,
      message: data.attributes.content
    };
  }

  public static transformEventAPIResponseToComm(data: IJsonApiItem<IWCommEventAttributes>): IComm {
    return {
      eventId: data.id,
      poolId: data.attributes.target_id && data.attributes.target_id.toString(),
      channel: data.attributes.channel,
      schedule: {
        sendDate: data.attributes.send_at ? new Date(data.attributes.send_at) : null,
        sendTime: data.attributes.send_at ? moment(data.attributes.send_at).format('LT') : null
      }
    };
  }

  public static transformTableData(data: IJsonApiListPayload<IWCommMessageAttributes>): ITableData<ICommMessage> {
    return {
      data: data.data.map(item => CommsHttpAdapter.transformMessageAPIResponse(item)), meta: data.meta
    };
  }

  public static transformMessageAPIResponse(data: IJsonApiItem<IWCommMessageAttributes>): ICommMessage {
    const attr = data.attributes;
    return {
      id: data.id,
      from: attr.from,
      to: attr.to,
      provider_id: attr.provider_id,
      message: attr.body,
      sendDate: attr.created_at ? new Date(attr.created_at) : null,
      owner_id: attr.owner_id,
      owner_type: attr.owner_type,
      channel: attr.channel
    };
  }

  public static transformFromCommsEvents(
    data: ICampaign,
    templateId: string,
    campaignId: string
  ): IJsonApiPostData<IWCommEventAttributes> {

    return {
      type: 'events',
      attributes: {
        send_at: '',
        provider_id: 1,
        owner_id: campaignId && parseInt(campaignId, 10) || null,
        owner_type: 'Perx::Campaign:Entity',
        template_id: templateId && parseInt(templateId, 10) || null,
        channel: 'weblink',
        target_id: data.audience.select && parseInt(data.audience.select, 10) || null,
        target_type: 'Ros::Cognito::Pool'
      }
    };
  }

  public static transformFromCommsTemplates(data: IComm): IJsonApiPostData<IWCommTemplateAttributes> {
    return {
      type: 'templates',
      attributes: {
        content: data.message
      }
    };
  }

  public static transformFromCommsMessage(data: ICommMessage): IJsonApiPostData<IWCommMessageAttributes> {
    return {
      type: 'messages',
      attributes: {
        body: data.message,
        from: data.from,
        to: data.to,
        provider_id: data.provider_id,
        owner_id: data.owner_id,
        owner_type: data.owner_type,
        channel: data.channel
      }
    }
  }
}
