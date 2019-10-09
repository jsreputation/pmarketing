import { Voucher, VoucherState } from '@perx/core';

export const vouchers: Voucher[] = [
  {
    id: 1,
    reward: null,
    state: VoucherState.issued,
    code: 'GFY2019',
    expiry: new Date('2019-09-05T03:24:00'),
  },
  {
    id: 1,
    reward: null,
    state: VoucherState.issued,
    expiry: null,
  },
  {
    id: 1,
    reward: null,
    state: VoucherState.issued,
    code: 'GFY2019',
    expiry: new Date('2019-09-10T03:24:00'),
  },
  {
    id: 1,
    reward: null,
    state: VoucherState.issued,
    expiry: new Date(),
  },
  {
    id: 1,
    reward: null,
    state: VoucherState.expired,
    expiry: null,
  },
  {
    id: 1,
    reward: null,
    state: VoucherState.redeemed,
    expiry: null,
  }
];
