import { Voucher, VoucherState, RedemptionType } from '@perx/core';

export const mock: Voucher[] = [
    {
        id: 123,
        rewardId: 42,
        state: VoucherState.issued,
        name: 'Starbucks grande',
        redemptionType: RedemptionType.pin,
        thumbnailImg: 'https://picsum.photos/200/300?random=1',
        rewardBanner: 'https://picsum.photos/200/300?random=2',
        merchantImg: 'https://picsum.photos/200/300?random=3',
        merchantName: 'Starbucks',
        expiry: new Date(),
        description: [{
            title: '',
            content: '',
            tag: []
        }],
        redemptionSuccessImg: 'https://picsum.photos/200/300?random=4',
        redemptionSuccessTxt: ''
    },
    {
        id: 124,
        rewardId: 42,
        state: VoucherState.issued,
        name: 'Starbucks',
        redemptionType: RedemptionType.pin,
        thumbnailImg: 'https://picsum.photos/200/300?random=5',
        rewardBanner: 'https://picsum.photos/200/300?random=6',
        merchantImg: 'https://picsum.photos/200/300?random=7',
        merchantName: 'Starbucks',
        expiry: new Date(),
        description: [{
            title: '',
            content: '',
            tag: []
        }],
        redemptionSuccessImg: 'https://picsum.photos/200/300?random=8',
        redemptionSuccessTxt: ''
    },
    {
        id: 125,
        rewardId: 42,
        state: VoucherState.issued,
        name: 'Starbucks',
        redemptionType: RedemptionType.pin,
        thumbnailImg: 'https://picsum.photos/200/300?random=9',
        rewardBanner: 'https://picsum.photos/200/300?random=10',
        merchantImg: 'https://picsum.photos/200/300?random=11',
        merchantName: 'Starbucks',
        expiry: new Date(),
        description: [{
            title: '',
            content: '',
            tag: []
        }],
        redemptionSuccessImg: 'https://picsum.photos/200/300?random=12',
        redemptionSuccessTxt: ''
    },
];
