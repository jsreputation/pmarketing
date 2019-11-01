export interface ICommTemplateAttributes {
    name?: number;
    description?: string;
    content: any;
    status?: string;
}

export interface ICommEventAttributes {
    send_at: string;
    provider_id?: number;
    owner_id?: number;
    owner_type?: string;
    template_id?: number;
    channel: string;
    target_id?: number;
    target_type?: string;
    name?: string;
}
