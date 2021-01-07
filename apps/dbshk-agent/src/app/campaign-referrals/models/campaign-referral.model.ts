export interface IInvite {
    campaign_id: number;
    invitee_names: string[];
    id?: number;
    created_at?: Date;
    invitee_name?: string;
    updated_at?: Date;
    user_account_id?: number;
}

export interface IInviteResponse {
    data: IInvite[];
}

export interface IGlobalTopScoreResponse {
    top_score: number;
}
