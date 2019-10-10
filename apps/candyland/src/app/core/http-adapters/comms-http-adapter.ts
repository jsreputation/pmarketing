import * as moment from 'moment';
import { ICommTemplateAttributes, IComm, ICommEventAttributes } from '@perx/whistler';

export class CommsHttpAdapter {
  public static transformTemplateAPIResponseToComm(data: IJsonApiItem<ICommTemplateAttributes>): IComm {
    return {
      message: data.attributes.content
    };
  }

  public static transformEventAPIResponseToComm(data: IJsonApiItem<ICommEventAttributes>): IComm {
    return {
      pool_id: data.attributes.pool_id,
      channel: data.attributes.channel,
      schedule: {
        sendDate: new Date(data.attributes.send_at),
        sendTime: moment(data.attributes.send_at).format('LT')
      }
    };
  }

}
