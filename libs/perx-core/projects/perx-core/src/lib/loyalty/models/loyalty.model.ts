export interface ILoyalty {
  id: number;
  name: string;
  description: string;
  beginDate: string;
  endDate?: string;
  membershipTierName: string;
  membershipIdentifier: string;
  pointsBalance: number;
  currencyBalance: number;
  currency: string;
}

export interface IPointHistory {
  id: number;
  name?: string;
  points: number;
  pointsBalance: number;
  currencyBalance: number;
  earnedDate: string;
  properties: {};
}
