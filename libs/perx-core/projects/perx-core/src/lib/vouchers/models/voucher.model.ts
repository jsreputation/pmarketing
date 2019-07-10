/*
 * Model from Master
 * TODO: remove after checking
 */
// export interface IVoucher {
//   id: number;
//   rewardId: number;
//   state: string;
//   name: string;
//   code: string;
//   description: string;
//   thumbnailUrl: string;
//   bannerUrl: string;
//   expiresAt: Date | null;
//   redeemedOn: Date;
//   merchantName: string;
//   merchantLogoUrl: string;
//   termsAndConditions: string;
//   howToRedeem: string | null;
// }

enum VOUCHER_STATE {
  issued = 'issued',
  redeemed = 'redeemed',
  expired = 'expired'
}

enum REDEMPTION_TYPE {
  pin = 'pin',
  txtCode = 'txtCode',
  none = 'none'
}

interface IVoucherDescription {
  title: string;
  content: string;
  tag: string[]
}

/*
 * Model from Whistler data model
 * https://docs.google.com/document/d/10TNUw5nC5D2MGSRFi_2XshMKIzjdV1OA2L6Da4YGb3E/edit#heading=h.j9hbbl4bn5pj
 */
export interface IVoucher {
  id: number;
  rewardId: number; // use at \lib\vouchers\vouchers.service.ts
  state: VOUCHER_STATE;
  name: string;
  code?: string;
  redemptionType: REDEMPTION_TYPE;
  thumbnailImg: string;
  rewardBanner: string;
  merchantImg: string;
  merchantName: string;
  expiry: Date;
  redemptionDate?: Date;
  description: IVoucherDescription;
  redemptionSuccessTxt: string;
  redemptionSuccessImg: string;
}
