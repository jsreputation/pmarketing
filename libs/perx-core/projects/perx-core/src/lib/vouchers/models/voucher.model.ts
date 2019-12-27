import { IReward } from '../../rewards/models/reward.model';
import { RedemptionType } from '../../perx-core.models';

export enum VoucherState {
  issued = 'issued',
  redeemed = 'redeemed',
  expired = 'expired',
  reserved = 'reserved',
  released = 'released',
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
  redemptionType?: RedemptionType | null;
  accessoryImage?: string | null;
}

export interface IGetVoucherParams {
  type: string | null;
  sourceType?: string;
}

export interface IRedeemOptions {
  pin?: string;
}
