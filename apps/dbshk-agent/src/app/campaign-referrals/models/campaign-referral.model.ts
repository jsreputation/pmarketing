export interface IInvite {
    campaign_id: number;
    invitee_names: string[];
}

export interface IInviteResponse {
    data: [{
        id: number;
        campaign_id: number;
        created_at: Date;
        invitee_name: string;
        updated_at: Date;
        user_account_id: number;
    }];
}
