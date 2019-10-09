import { Voucher, VoucherState } from '@perx/core';

export const mockVoucher: Voucher = {
    id: 1,
    reward: null,
    state: VoucherState.issued,
    code: 'yo',
    expiry: null,
};
