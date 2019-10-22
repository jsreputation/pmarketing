declare interface ILoyaltyForm {
  id?: string;
  customTiersCount?: number;
  name: string;
  status?: string;
  details?: ILoyaltyDetails;
  tiersConversions?: ILoyaltyTiersConversions;
}

declare interface ILoyaltySchemaInf extends ILoyaltyDetails {
  name: string;
  status: string;
}

declare interface ILoyaltyDetails {
  pointsName: string;
  imageUrl: string;
  joinMethod: {
    transactionAmount?: boolean;
    signUp: boolean;
    inviteOnly: boolean;
    amount?: number;
  };
  poolId: string | null;
}

declare interface ILoyaltyTiersConversions {
  globalEarnRule: {
    amount: number;
    points: number;
  };
  globalBurnRule: {
    amount: number;
    points: number;
  };
  pointsExpiry: {
    amount: number;
    type: string;
    trigger: string;
  };
  tiers: ILoyaltyTire[];
}

declare interface ILoyaltyTire {
  name: string;
  joinMethod: {
    pointsThreshold: boolean;
    inviteOnly: boolean;
    points?: number;
  };
  imageUrl: string;
  earnBonus: number;
  burnDiscount: number;
  pointsExpiry: {
    amount: number;
    type: string;
    trigger: string;
  };
}
