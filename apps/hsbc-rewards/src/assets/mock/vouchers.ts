import { Voucher, VoucherState, RedemptionType } from '@perx/core';

export const voucher: Voucher[] = [{
    id: 0,
    rewardId: 149,
    state: VoucherState.issued,
    redemptionType: RedemptionType.txtCode,
    name: 'First Voucher',
    thumbnailImg: 'https://picsum.photos/200/300?random=2',
    rewardBanner: 'https://picsum.photos/500/300?random=2',
    expiry: new Date('09/09/2030'),
    redemptionSuccessImg: '',
    redemptionSuccessTxt: '2222',
    merchantImg: '',
    merchantName: 'WDasd',
    description: [{
        title: 'name',
        content: 'conetnt',
        tag: ['tag']
    }]
}, {
    id: 1,
    rewardId: 149,
    state: VoucherState.expired,
    redemptionType: RedemptionType.txtCode,
    name: 'First Voucher',
    thumbnailImg: 'https://picsum.photos/200/300?random=3',
    rewardBanner: '392480',
    expiry: new Date('09/09/2030'),
    redemptionSuccessImg: '',
    redemptionSuccessTxt: '2222',
    merchantImg: '',
    merchantName: 'WDasd',
    description: [{
        title: 'name',
        content: 'conetnt',
        tag: ['tag']
    }]
}, {
    id: 1,
    rewardId: 149,
    state: VoucherState.redeemed,
    redemptionType: RedemptionType.txtCode,
    name: 'First Voucher',
    thumbnailImg: 'https://picsum.photos/200/300?random=4',
    rewardBanner: '392480',
    expiry: new Date('09/09/2030'),
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
