import { ICatalog } from '@perx/core';

export const catalogs: ICatalog[] = [
  {
    id: 0,
    name: 'Ramadan Exclusive',
    description: 'Here are deals for ramadan',
    catalogThumbnail: 'https://picsum.photos/50/50?random=1',
    catalogBanner: 'https://picsum.photos/300/200?random=3',
    rewardCount: 5,
    rewards: [
      {
        id: 1,
        name: 'Get a Free Coke',
        // tslint:disable-next-line:max-line-length
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        subtitle: 'string',
        validFrom: new Date(),
        validTo: new Date(),
        rewardThumbnail: 'https://picsum.photos/300/200?random=1',
        rewardBanner: 'https://picsum.photos/300/200?random=2',
        merchantImg: 'https://picsum.photos/300/200?random=3',
        merchantName: 'Pizza Hut',
        // tslint:disable-next-line:max-line-length
        termsAndConditions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        // tslint:disable-next-line:max-line-length
        howToRedeem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        merchantId: 2
    }
    ]
  },
  {
    id: 1,
    name: 'Christmas Specials',
    description: 'Santa-claus latest and greatest',
    catalogThumbnail: 'https://picsum.photos/50/50?random=2',
    catalogBanner: 'https://picsum.photos/300/200?random=1',
    rewardCount: 25,
    rewards: [
      {
        id: 2,
        name: '1 for 1',
        // tslint:disable-next-line:max-line-length
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        subtitle: 'string',
        validFrom: new Date(),
        validTo: new Date(),
        rewardThumbnail: 'https://picsum.photos/300/200?random=4',
        rewardBanner: 'https://picsum.photos/300/200?random=5',
        merchantImg: 'https://picsum.photos/300/200?random=6',
        merchantName: 'Starbucks',
        // tslint:disable-next-line:max-line-length
        termsAndConditions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        // tslint:disable-next-line:max-line-length
        howToRedeem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        merchantId: 3
    }
    ]
  },
];
