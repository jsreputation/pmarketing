import * as moment from 'moment';
import { ICommTemplateAttributes, ICommEventAttributes } from '@perx/whistler';
import { IComm } from '@cl-core/models/comm/schedule';

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

}
