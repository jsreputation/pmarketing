export interface IComm {
    message?: string;
    schedule?: ISchedule;
    poolId?: string;
    channel?: string;
    eventId?: string;
    templateId?: string;
}

export interface ISchedule {
    sendDate: Date;
    sendTime: string;
    enableRecurrence?: boolean;
    recurrence?: {
        times: number;
        period: string;
        repeatOn: string[];
    };
}
