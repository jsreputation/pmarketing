declare interface ILoyaltyFormGroup {
  programId: string;
  costReward: string;
  tiers: ILoyaltyTiersFormGroup[];
}

declare interface ILoyaltyTiersFormGroup {
  tierRewardCostsId: string;
  customTierId: string;
  name: string;
  statusTiers: boolean;
  statusDiscount: boolean;
}

declare interface IMapLoyalties {
  [key: string]: IMapLoyalty;
}

declare interface IMapLoyalty {
  programId: string;
  costReward: number;
  tiers: {
    [key: string]: ILoyaltyTiersFormGroup;
  };
}
