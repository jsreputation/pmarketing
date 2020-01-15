export interface IAudiencesLoyaltyCard {
  id?: string;
  userId: number;
  balance: number,
  loyalty: IAudiencesLoyalty;
  tier?: IAudiencesTier;
}

export interface IAudiencesLoyalty {
  id: string;
  name: string;
  tiers?: IAudiencesTier[];
}

export interface IAudiencesTier {
  id: string | number;
  type: string;
  name: string;
  imageUrl?: string;
}
