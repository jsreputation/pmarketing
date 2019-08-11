import { IReward } from '@perx/core';

export const MockRewardsMobilePreview: IReward[] = [
    {
        id: 1,
        name: 'Starbucks venti $5',
        subtitle: 'So yummy',
        description: 'One bought, one offered',
        validFrom: null,
        validTo: null,
        rewardThumbnail: 'https://picsum.photos/300/300',
        rewardBanner: 'https://picsum.photos/200/300',
        merchantImg: 'https://picsum.photos/200/300',
        termsAndConditions: '',
        howToRedeem: '',
        rewardPrice: [{
          rewardCurrency: '44',
          rewardAmount: '3'
        }]
    },
    {
        id: 2,
        name: 'Guru naru $5',
        subtitle: 'So yummy',
        description: 'Better than anything',
        validFrom: null,
        validTo: null,
        rewardThumbnail: 'https://picsum.photos/600/300?random=2',
        rewardBanner: 'https://picsum.photos/200/300?random=2',
        merchantImg: 'https://picsum.photos/200/300?random=2',
        termsAndConditions: '',
        howToRedeem: '',
      rewardPrice: [{
        rewardCurrency: '44',
        rewardAmount: '3'
      }]
    },
    {
        id: 3,
        name: 'Coffee bean venti $5',
        subtitle: 'So yummy',
        description: 'One bought, one offered',
        validFrom: null,
        validTo: null,
        rewardThumbnail: 'https://picsum.photos/600/300?random=3',
        rewardBanner: 'https://picsum.photos/200/300?random=3',
        merchantImg: 'https://picsum.photos/200/300?random=3',
        termsAndConditions: '',
        howToRedeem: '',
      rewardPrice: [{
        rewardCurrency: '44',
        rewardAmount: '3'
      }]
    }
];
