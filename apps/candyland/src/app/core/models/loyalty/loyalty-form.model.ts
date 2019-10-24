import {IJoinMethod} from '@perx/core';

export interface ILoyaltyForm {
  id?: string;
  name: string;
  createdAt?: string;
  status?: string;
  customTiersCount?: number;
  pointsName?: string;
  basicTierId?: string;
  details?: ILoyaltyDetails;
  tiersConversions?: ILoyaltyTiersConversions;
  customTiers?: any;
}

export interface ILoyaltyDetails {
  pointsName: string;
  imageUrl: string;
  joinMethod: IJoinMethod;
  poolId?: string;
}

export interface ILoyaltyTiersConversions {
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

export interface ICustomTireForm {
  id?: string;
  name: string;
  joinMethod: IJoinMethod;
  imageUrl: string;
  earnBonus: number;
  burnDiscount: number;
  pointsExpiry: IPointsExpiry;
}

export interface IPointsExpiry {
  amount: number;
  type: string;
  trigger: string;
}
