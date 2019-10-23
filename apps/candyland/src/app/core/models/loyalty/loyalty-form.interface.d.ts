declare interface ILoyaltyForm {
  id?: string;
  name: string;
  createdAt?: string;
  status?: string;
  customTiersCount?: number;
  pointsName?: string;
  basicTierId?: string;
  details?: ILoyaltyDetails;
  tiersConversions?: ILoyaltyTiersConversions;
  customTiers: any;
}

declare interface ILoyaltySchemaInf extends ILoyaltyDetails {
  name: string;
  status: string;
}

declare interface ILoyaltyDetails {
  pointsName: string;
  imageUrl: string;
  joinMethod: IJoinMethod;
  poolId?: string;
}

declare interface IJoinMethod {
  transactionAmount?: boolean;
  signUp?: boolean;
  inviteOnly?: boolean;
  amount?: number;
  pointsThreshold?: boolean;
  points?: number;
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
}

declare interface ICustomTireForm {
  id?: string;
  name: string;
  joinMethod: IJoinMethod;
  imageUrl: string;
  earnBonus: number;
  burnDiscount: number;
  pointsExpiry: IPointsExpiry;
}

declare interface IPointsExpiry {
  amount: number;
  type: string;
  trigger: string;
}
