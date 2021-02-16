import { Voucher, VoucherState, RedemptionType } from '@perxtech/core';

export const mockVoucher: Voucher = {
  id: 1,
  reward: {
    id: 1,
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
    inventory: null,
    loyalty: []
  },
  state: VoucherState.issued,
  redemptionType: RedemptionType.none,
  code: 'yo',
  expiry: null,
};
