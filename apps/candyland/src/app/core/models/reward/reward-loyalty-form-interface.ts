
export interface ILoyaltyFormGroup {
  programId: string;
  // costReward: string;
  tiers: ILoyaltyTiersFormGroup[];
  basicTier: IBasicTier;
}

export interface ILoyaltyTiersFormGroup {
  tierRewardCostsId: string;
  tierId: string;
  name: string;
  tierType: string;
  statusTiers: boolean;
  statusDiscount: boolean;
  tierValue: number;
}

export interface IMapLoyalties {
  [key: string]: IMapLoyalty;
}

export interface IMapLoyalty {
  programId: string;
  tiers: {
    [key: string]: ILoyaltyTiersFormGroup;
  };
}

export interface IBasicTier {
  tierValue: number;
  tierType: string;
  tierId: string;
  entityId: string;
  statusDiscount: boolean;
  tierRewardCostsId: string;
  statusTiers?: boolean;
}
