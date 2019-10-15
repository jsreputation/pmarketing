declare interface ILoyaltyForm {
  name: string;
  status?: string;
  stepDetails?: ILoyaltyDetails;
  tiersConversions?: ILoyaltyTiersConversions;
}

declare interface ILoyaltySchemaInf extends ILoyaltyDetails {
  name: string;
  status: string;
}

declare interface ILoyaltyDetails {
  pointsName: string;
  mainImage: string;
  joiningMethod: {
    transactionAmount?: boolean;
    signUp: boolean;
    byInvite: boolean;
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
  qualification: {
    pointsThreshold: boolean;
    inviteOnly: boolean;
    points?: number;
  };
  imageUrl: string;
  earnBonus: number;
  burnRule: number;
  pointsExpiry: {
    amount: number;
    type: string;
    trigger: string;
  };
}
