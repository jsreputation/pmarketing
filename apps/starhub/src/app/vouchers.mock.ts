import { Voucher, VoucherState, RedemptionType } from '@perx/core';

export const vouchers: Voucher[] = [
  {
    id: 1,
    rewardId: 1,
    state: VoucherState.issued,
    name: '10% OFF Total Bill',
    redemptionType: RedemptionType.txtCode,
    code: 'GFY2019',
    thumbnailImg: 'https://picsum.photos/50/50?random=1',
    rewardBanner: 'https://picsum.photos/400/200?random=20',
    merchantImg: 'https://picsum.photos/100/100?random=21',
    merchantName: 'Starbucks',
    expiry: new Date(),
    merchantId: 2,
    description: [
      {
        title: 'How to use',
        // tslint:disable-next-line: max-line-length
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        tag: ['how_to_use']
      }
    ],
    redemptionSuccessTxt: '',
    redemptionSuccessImg: '',
  },
  {
    id: 1,
    rewardId: 1,
    state: VoucherState.issued,
    name: 'Free Frapuccino',
    redemptionType: RedemptionType.pin,
    thumbnailImg: 'https://picsum.photos/50/50?random=2',
    rewardBanner: '',
    merchantImg: '',
    merchantName: '',
    expiry: null,
    description: [],
    redemptionSuccessTxt: '',
    redemptionSuccessImg: '',
  },
  {
    id: 1,
    rewardId: 1,
    state: VoucherState.expired,
    name: '10% OFF Total Bill',
    redemptionType: RedemptionType.qr,
    thumbnailImg: 'https://picsum.photos/50/50?random=3',
    rewardBanner: '',
    merchantImg: '',
    merchantName: '',
    expiry: null,
    description: [],
    redemptionSuccessTxt: '',
    redemptionSuccessImg: '',
  },
  {
    id: 1,
    rewardId: 1,
    state: VoucherState.redeemed,
    name: 'Free Frapuccino',
    redemptionType: RedemptionType.qr,
    thumbnailImg: 'https://picsum.photos/50/50?random=4',
    rewardBanner: '',
    merchantImg: '',
    merchantName: 'Starbucks',
    expiry: null,
    description: [],
    redemptionSuccessTxt: '',
    redemptionSuccessImg: '',
  }
];
