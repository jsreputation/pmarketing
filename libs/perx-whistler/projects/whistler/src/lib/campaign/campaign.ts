export interface ICampaignAttributes {
    id?: string;
    name: string;
    created_at?: string;
    updated_at?: string;
    urn?: string;
    status?: string;
    start_date_time: string;
    end_date_time: string;
    pool_id: number;
    goal?: string;
    engagement_type: string;
    engagement_id: string;
    comm_channel: string;
    possible_outcomes?: any;
    comm?: any;
    labels?: string[];
}
