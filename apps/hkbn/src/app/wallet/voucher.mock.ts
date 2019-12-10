import { Voucher, VoucherState } from '@perx/core';

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
      },
    state: VoucherState.issued,
    code: 'yo',
    expiry: null,
};
