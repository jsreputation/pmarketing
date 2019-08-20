import { IReward } from '@perx/core';

export const rewards: IReward[] = [
    {
        id: 1,
        name: 'Get a Free Coke',
        description: 'string',
        subtitle: 'string',
        validFrom: new Date(),
        validTo: new Date(),
        rewardThumbnail: 'https://picsum.photos/300/200?random=1',
        rewardBanner: 'https://picsum.photos/300/200?random=2',
        merchantImg: 'https://picsum.photos/300/200?random=3',
        merchantName: 'Pizza Hut',
        termsAndConditions: 'string',
        howToRedeem: 'string',
        merchantId: 2
    },
    {
        id: 2,
        name: '1 for 1',
        description: 'string',
        subtitle: 'string',
        validFrom: new Date(),
        validTo: new Date(),
        rewardThumbnail: 'https://picsum.photos/300/200?random=4',
        rewardBanner: 'https://picsum.photos/300/200?random=5',
        merchantImg: 'https://picsum.photos/300/200?random=6',
        merchantName: 'Starbucks',
        termsAndConditions: 'string',
        howToRedeem: 'string',
        merchantId: 3
    }
];
