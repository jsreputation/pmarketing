export interface ICampaignAttributes {
    id?: string;
    name: string;
    created_at?: string;
    updated_at?: string;
    urn?: string;
    status?: string;
    start_date_time: string;
    end_date_time: string;
    goal?: string;
    engagement_type: string;
    engagement_id: number;
    possible_outcomes?: any;
    comm?: any;
    labels?: string[];
    display_properties?: {
      noRewardsPopUp?: {
        headLine?: string,
        subHeadLine?: string,
        imageUrl?: string
      }
    };
}
