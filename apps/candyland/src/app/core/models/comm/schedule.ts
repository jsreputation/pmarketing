export interface IComm {
    message?: string;
    schedule?: ISchedule;
    pool_id?: string;
    channel?: string;
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
