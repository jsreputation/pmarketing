export interface IWLoyalty {
    name: string;
    unit: string;
    status: string;
    custom_tiers_count: number;
}

export interface IWLoyaltyCard {
    balance: number;
    user_id: number;
}
