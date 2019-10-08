import { IReward } from '../../rewards/models/reward.model';

export enum VoucherState {
  issued = 'issued',
  redeemed = 'redeemed',
  expired = 'expired',
  reserved = 'reserved',
  released = 'released',
}

export enum RedemptionType {
  pin = 'pin',
  txtCode = 'txtCode',
  qr = 'qrcode',
  none = 'none',
  offline = 'offline'
}

export type StatusLabelMapping = {
  [key in VoucherState]: string;
};

interface IVoucherDescription {
  title: string;
  content: string;
  tag: string[];
}

/*
 * Model from Whistler data model
 * https://docs.google.com/document/d/10TNUw5nC5D2MGSRFi_2XshMKIzjdV1OA2L6Da4YGb3E/edit#heading=h.j9hbbl4bn5pj
 */
export interface IVoucher {
  id: number;
  // deprecated
  rewardId: number; // use at \lib\vouchers\vouchers.service.ts
  reward: IReward | null;
  state: VoucherState;
  // deprecated
  name: string;
  code?: string;
  // deprecated
  redemptionType: RedemptionType;
  // deprecated
  thumbnailImg: string;
  // deprecated
  rewardBanner: string;
  // deprecated
  merchantImg: string;
  // deprecated
  merchantName: string;
  // deprecated
  merchantId?: number;
  expiry: Date | null;
  redemptionDate?: Date | null;
  // deprecated
  description: IVoucherDescription[];
  // deprecated
  redemptionSuccessTxt?: string;
  // deprecated
  redemptionSuccessImg?: string;
  // deprecated
  categories?: string[];
}

export interface IGetVoucherParams {
  type: string;
}

export interface IRedeemOptions {
  pin?: string;
}
