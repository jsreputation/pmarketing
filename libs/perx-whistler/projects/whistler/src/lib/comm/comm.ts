export interface IComm {
    message?: string;
    schedule?: ISchedule;
}

interface ISchedule {
    sendDate: Date;
    sendTime: string;
    enableRecurrence?: boolean;
    recurrence?: {
        times: number;
        period: string;
        repeatOn: string[];
    };
}

export interface ICommTemplateAttributes {
    name?: number;
    description?: string;
    content: any;
    campaign_entity_id?: number;
    status?: string;
}

export interface ICommEventAttributes {
    send_at: string;
    provider_id?: number;
    campaign_entity_id?: number;
    template_id?: number;
    channel: string;
    target_type?: string;
    target_id?: number;
    name?: string;
}
