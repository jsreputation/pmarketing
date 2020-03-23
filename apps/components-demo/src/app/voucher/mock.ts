import { Voucher, VoucherState, RedemptionType } from '@perxtech/core';

export const mock: Voucher[] = [
  {
    id: 123,
    reward: {
      id: 123,
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
    },
    state: VoucherState.issued,
    redemptionType: RedemptionType.none,
    expiry: new Date(),
  },
  {
    id: 124,
    reward: {
      id: 124,
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
    },
    state: VoucherState.issued,
    redemptionType: RedemptionType.none,
    expiry: new Date(),
  },
  {
    id: 125,
    reward: {
      id: 125,
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
    },
    state: VoucherState.issued,
    redemptionType: RedemptionType.none,
    expiry: new Date(),
  },
];
