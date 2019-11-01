import * as moment from 'moment';
import { ICommTemplateAttributes, ICommEventAttributes } from '@perx/whistler';
import { IComm } from '@cl-core/models/comm/schedule';
import { ICampaign } from '@cl-core/models/campaign/campaign.interface';

export class CommsHttpAdapter {
  public static transformTemplateAPIResponseToComm(data: IJsonApiItem<ICommTemplateAttributes>): IComm {
    return {
      templateId: data.id,
      message: data.attributes.content
    };
  }

  public static transformEventAPIResponseToComm(data: IJsonApiItem<ICommEventAttributes>): IComm {
    return {
      eventId: data.id,
      poolId: data.attributes.target_id && data.attributes.target_id.toString(),
      channel: data.attributes.channel,
      schedule: {
        sendDate: new Date(data.attributes.send_at),
        sendTime: moment(data.attributes.send_at).format('LT')
      }
    };
  }

  public static transformFromCommsEvents(data: ICampaign, templateId: string, campaignId: string): IJsonApiItem<ICommEventAttributes> {
    const sendTime = data.channel.schedule && data.channel.schedule.sendTime ? data.channel.schedule.sendTime : moment().format('LT');
    const sendAt = data.channel.schedule ?
      moment(moment(data.channel.schedule.sendDate).format('l') + ' ' + sendTime).format() :
      '';

    return {
      type: 'events',
      attributes: {
        send_at: sendAt,
        provider_id: 1,
        owner_id: campaignId && parseInt(campaignId, 10) || null,
        owner_type: 'Perx::Campaign:Entity',
        template_id: templateId && parseInt(templateId, 10) || null,
        channel: data.channel.type,
        target_id: data.audience.select && parseInt(data.audience.select, 10) || null,
        target_type: 'Ros::Cognito::Pool'
      }
    };
  }

  public static transformFromCommsTemplates(data: IComm): IJsonApiItem<ICommTemplateAttributes> {
    return {
      type: 'templates',
      attributes: {
        content: data.message
      }
    };
  }
}
