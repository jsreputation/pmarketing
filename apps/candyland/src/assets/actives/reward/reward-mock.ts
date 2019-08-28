import { IReward } from '@perx/core';

export const MockRewardsMobilePreview: IReward[] = [
    {
        id: 1,
        name: 'Reward Name',
        subtitle: 'So yummy',
        description: 'Merchant Name',
        validFrom: null,
        validTo: null,
        rewardThumbnail: 'https://picsum.photos/300/300',
        rewardBanner: 'https://picsum.photos/200/300',
        merchantImg: 'https://picsum.photos/200/300',
        termsAndConditions: '',
        howToRedeem: '',
        rewardPrice: [{
          id: 23,
          currencyCode: '44',
          price: 3
        }]
    },
    {
        id: 2,
        name: 'Reward Name',
        subtitle: 'So yummy',
        description: 'Merchant Name',
        validFrom: null,
        validTo: null,
        rewardThumbnail: 'https://picsum.photos/600/300?random=2',
        rewardBanner: 'https://picsum.photos/200/300?random=2',
        merchantImg: 'https://picsum.photos/200/300?random=2',
        termsAndConditions: '',
        howToRedeem: '',
      rewardPrice: [{
        id: 23,
        currencyCode: '44',
        price: 3
      }]
    },
    {
        id: 3,
        name: 'Reward Name',
        subtitle: 'So yummy',
        description: 'Merchant Name',
        validFrom: null,
        validTo: null,
        rewardThumbnail: 'https://picsum.photos/600/300?random=3',
        rewardBanner: 'https://picsum.photos/200/300?random=3',
        merchantImg: 'https://picsum.photos/200/300?random=3',
        termsAndConditions: '',
        howToRedeem: '',
      rewardPrice: [{
        id: 23,
        currencyCode: '44',
        price: 3
      }]
    }
];
