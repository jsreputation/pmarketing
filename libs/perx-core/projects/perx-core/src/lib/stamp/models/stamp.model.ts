export interface IReward {
  id: number;
  campaignId: number;
  modularizableType: string;
  modularizableId: number;
  createdAt: string;
  updatedAt: string;
  // ordering: any|null;
  refereeRequiredForReward: number;
  totalRewardLimit: number;
  totalUserLimit: number;
  awardToTeferral: boolean;
  awardToReferee: boolean;
  totalReferreeLimit: number;
  stampNumber: number;
  // totalReferreeReward_limit: any|null;
  // hidden: any|null;
}

export enum STAMP_STATE {
  redeemed = 'redeemed',
  issued = 'issued',
}

export enum STAMP_CARD_STATE {
  active = 'active',
  inactive = 'inactive'
}

export interface IStamp {
  id: number;
  userAccountId: number;
  stampCardId: number;
  state: STAMP_STATE;
  createdAt: string;
  updatedAt: string;
  campaignId: number;
  vouchers?: IVoucher[];
}

export interface IStampCard {
  id: number;
  userAccountId: number;
  state: STAMP_CARD_STATE;
  campaignId: number;
  cardNumber: number;
  campaignConfig: {
    totalSlots: number;
    rewards: IReward[];
  };
  displayProperties: {
    numberOfCols: number;
    numberOfRows: number;
    cardImage: {
      value: {
        imageUrl: string;
      }
    };
    totalSlots: number;
  };
  stamps?: IStamp[];
}

// TODO: Should move this to voucher
export interface IVoucher {
  id: string;
  name: string;
}
