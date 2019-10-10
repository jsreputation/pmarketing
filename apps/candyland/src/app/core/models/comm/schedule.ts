export interface IComm {
    message?: string;
    schedule?: ISchedule;
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
