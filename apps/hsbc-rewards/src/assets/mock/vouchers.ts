import { Voucher, VoucherState, RedemptionType } from '@perx/core';

export const voucher: Voucher[] = [{
    id: 0,
    reward: null,
    state: VoucherState.issued,
    expiry: new Date('09/09/2030'),
}, {
    id: 1,
    reward: null,
    state: VoucherState.expired,
    expiry: new Date('09/09/2030'),
}, {
    id: 1,
    reward: null,
    state: VoucherState.redeemed,
    expiry: new Date('09/09/2030'),
}];
