export enum VoucherState {
  issued = 'issued',
  redeemed = 'redeemed',
  expired = 'expired'
}

export enum RedemptionType {
  pin = 'pin',
  txtCode = 'txtCode',
  qr = 'qrcode',
  none = 'none',
  offline = 'offline'
}

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
  rewardId: number; // use at \lib\vouchers\vouchers.service.ts
  state: VoucherState;
  name: string;
  code?: string;
  redemptionType: RedemptionType;
  thumbnailImg: string;
  rewardBanner: string;
  merchantImg: string;
  merchantName: string;
  merchantId?: number;
  expiry: Date | null;
  redemptionDate?: Date | null;
  description: IVoucherDescription[];
  redemptionSuccessTxt: string;
  redemptionSuccessImg: string;
}
