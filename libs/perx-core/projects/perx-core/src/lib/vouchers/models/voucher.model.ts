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

/*
 * Model from Whistler data model
 * https://docs.google.com/document/d/10TNUw5nC5D2MGSRFi_2XshMKIzjdV1OA2L6Da4YGb3E/edit#heading=h.j9hbbl4bn5pj
 */
export interface IVoucher {
  id: number;
  reward: IReward | null;
  state: VoucherState;
  code?: string;
  expiry: Date | null;
  redemptionDate?: Date | null;
}

export interface IGetVoucherParams {
  type: string;
  sourceType?: string;
}

export interface IRedeemOptions {
  pin?: string;
}
