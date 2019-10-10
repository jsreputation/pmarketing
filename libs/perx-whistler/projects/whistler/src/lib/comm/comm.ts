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
    pool_id: string;
    target_type?: string;
    target_id?: number;
    name?: string;
}
