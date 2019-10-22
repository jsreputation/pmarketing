declare interface ILoyaltyFormGroup {
  programId: string;
  costReward: number;
  tiers: ILoyaltyTiersFormGroup[];
}

declare interface ILoyaltyTiersFormGroup {
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
