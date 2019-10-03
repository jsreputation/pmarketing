import { Voucher, RedemptionType, VoucherState } from '@perx/core';

export const mockVoucher: Voucher = {
    id: 1,
    rewardId: 1,
    state: VoucherState.issued,
    name: '',
    redemptionType: RedemptionType.qr,
    code: 'yo',
    thumbnailImg: '',
    rewardBanner: '',
    merchantImg: '',
    merchantName: '',
    expiry: null,
    description: [],
    redemptionSuccessTxt: '',
    redemptionSuccessImg: '',
};
