
declare interface ILoyaltyFormGroup {
  programId: string;
  // costReward: string;
  tiers: ILoyaltyTiersFormGroup[];
  basicTier: IBasicTier;
}

declare interface ILoyaltyTiersFormGroup {
  tierRewardCostsId: string;
  tierId: string;
  name: string;
  tierType: string;
  statusTiers: boolean;
  statusDiscount: boolean;
  tierValue: number;
}

declare interface IMapLoyalties {
  [key: string]: IMapLoyalty;
}

declare interface IMapLoyalty {
  programId: string;
  tiers: {
    [key: string]: ILoyaltyTiersFormGroup;
  };
}

declare interface IBasicTier {
  tierValue: number;
  tierType: string;
  tierId: string;
  entityId: string;
  statusDiscount: boolean;
  tierRewardCostsId: string;
}
