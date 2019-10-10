import { Voucher, VoucherState } from '@perx/core';

export const mock: Voucher[] = [
    {
        id: 123,
        reward: null,
        state: VoucherState.issued,
        expiry: new Date(),
    },
    {
        id: 124,
        reward: null,
        state: VoucherState.issued,
        expiry: new Date(),
    },
    {
        id: 125,
        reward: null,
        state: VoucherState.issued,
        expiry: new Date(),
    },
];
