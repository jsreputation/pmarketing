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
      poolId: data.attributes.target_id.toString(),
      channel: data.attributes.channel,
      schedule: {
        sendDate: new Date(data.attributes.send_at),
        sendTime: moment(data.attributes.send_at).format('LT')
      }
    };
  }

  public static transformFromCommsEvents(data: ICampaign, templateId: string): IJsonApiItem<ICommEventAttributes> {
    const sendTime = data.channel.schedule && data.channel.schedule.sendTime ? data.channel.schedule.sendTime : moment().format('LT');
    const sendAt = data.channel.schedule ?
      moment(moment(data.channel.schedule.sendDate).format('l') + ' ' + sendTime).format() :
      '';
    return {
      type: 'events',
      attributes: {
        send_at: sendAt,
        provider_id: parseInt(data.audience.select, 10),
        campaign_entity_id: parseInt(data.id, 10),
        template_id: parseInt(templateId, 10),
        channel: data.channel.type
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
