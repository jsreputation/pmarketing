import { Voucher, VoucherState, RedemptionType } from '@perx/core';

export const voucher: Voucher[] = [{
    id: 0,
    rewardId: 149,
    state: VoucherState.redeemed,
    redemptionType: RedemptionType.txtCode,
    name: 'First Voucher',
    thumbnailImg:  '2198018',
    rewardBanner: '392480',
    expiry: new Date(),
    redemptionSuccessImg: '',
    redemptionSuccessTxt: '2222',
    merchantImg: '',
    merchantName: 'WDasd',
    description: [{
        title: 'name',
        content: 'conetnt',
        tag: ['tag']
    }]
}];
