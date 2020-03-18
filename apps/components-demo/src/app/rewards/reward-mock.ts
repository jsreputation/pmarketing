import { IReward, ICategoryTags } from '@perxtech/core';

const travelCategory: ICategoryTags[] = [{
  id: 36,
  title: 'Travel',
  parent: null
}];

const shoppingCategory: ICategoryTags[] = [{
  id: 35,
  title: 'Shopping',
  parent: null
}];

const lifestyleCategory: ICategoryTags[] = [{
  id: 34,
  title: 'Lifestyle',
  parent: null
}];

export const mock: IReward[] = [
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
      id: 23,
      currencyCode: '44',
      price: 3
    }],
    categoryTags: lifestyleCategory,
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
      id: 23,
      currencyCode: '44',
      price: 3
    }],
    categoryTags: travelCategory,
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
      id: 23,
      currencyCode: '44',
      price: 3
    }],
    categoryTags: shoppingCategory,
  },
  {
    id: 4,
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
      id: 23,
      currencyCode: '44',
      price: 3
    }],
  }
];
