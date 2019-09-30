declare interface IComm {
  message: string;
  schedule?: ISchedule;
}

declare interface ISchedule {
  sendDate: Date;
  sendTime: string;
  enableRecurrence: boolean;
  recurrence?: {
    times: number;
    period: string;
    repeatOn: string[];
  }
}

declare interface ICommApi {
  id: string;
  type: string;
  attributes: {
      name: number;
      description: string;
      content?: any;
      source_id: number;
      status: string;
  };
}
