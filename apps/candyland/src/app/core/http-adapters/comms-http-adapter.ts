import * as moment from 'moment';

export class CommsHttpAdapter {
  public static transformTemplateAPIResponseToComm(data: ICommTemplateApi): IComm {
    return {
      message: data.attributes.content
    };
  }

  public static transformEventAPIResponseToComm(data: ICommEventApi): IComm {
    return {
      schedule: {
        sendDate: new Date(data.attributes.send_at),
        sendTime: moment(data.attributes.send_at).format('LT')
      }
    };
  }

}
