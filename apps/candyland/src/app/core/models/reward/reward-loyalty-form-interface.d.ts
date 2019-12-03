
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
  statusTiers: boolean;
  statusDiscount: boolean;
}

declare interface IMapLoyalties {
  [key: string]: IMapLoyalty;
}

declare interface IMapLoyalty {
  programId: string;
  // costReward: number;
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
}
