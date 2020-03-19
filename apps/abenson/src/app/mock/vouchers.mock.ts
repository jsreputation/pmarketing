import {
  Voucher,
  VoucherState,
  RedemptionType,
} from '@perxtech/core';

// @ts-ignore
export const vouchers: Voucher[] = Array.from({ length: 6 }, (voucher, id) => ({
  id,
  reward: {
    id,
    name: '',
    description: '',
    subtitle: '',
    validFrom: new Date(),
    validTo: new Date(),
    sellingFrom: new Date(),
    rewardThumbnail: '',
    rewardBanner: '',
    merchantImg: '',
    rewardPrice: [],
    merchantId: 1,
    merchantName: '',
    merchantWebsite: '',
    termsAndConditions: '',
    howToRedeem: '',
    categoryTags: [],
    inventory: undefined,
  },
  redemptionType: RedemptionType.none,
  state: VoucherState.redeemed,
  code: '',
  expiry: new Date(),
}));
