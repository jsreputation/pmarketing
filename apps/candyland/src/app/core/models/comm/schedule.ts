import { WMessageChannel } from '@perx/whistler/dist/whistler/lib/comm/comm';

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

export interface ICommMessage {
    id?: string;
    from: string;
    to: string;
    provider_id: number;
    message: string;
    sendDate: Date;
    sender?: string;
    channel: WMessageChannel;
}
