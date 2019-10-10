import { Voucher, VoucherState } from '@perx/core';

export const vouchers: Voucher[] = [
  {
    id: 1,
    reward: null,
    state: VoucherState.issued,
    code: 'XXXX - XXXX - XXXX - XXXX',
    expiry: new Date(),
  },
  {
    id: 2,
    reward: null,
    state: VoucherState.issued,
    expiry: null,
  },
  {
    id: 3,
    reward: null,
    state: VoucherState.issued,
    code: 'XXXX - XXXX - XXXX - XXXX',
    expiry: new Date(),
  },
  {
    id: 4,
    reward: null,
    state: VoucherState.issued,
    expiry: null,
  },
  {
    id: 5,
    reward: null,
    state: VoucherState.expired,
    expiry: null,
  },
  {
    id: 6,
    reward: null,
    state: VoucherState.redeemed,
    expiry: null,
  }
];
