export interface ILoyalty {
    name: string;
    unit: string;
    status: string;
    custom_tiers_count: number;
}

export interface ILoyaltyCard {
    balance: number;
    user_id: number;
}
