export interface IAudiencesLoyaltyOption {
  id: string;
  name: string;
  tiers: IAudiencesTierOption[];
}

export interface IAudiencesTierOption {
  id: string;
  type: string;
  name: string;
}
