import { CampaignState, CampaignType, ICampaign } from '@perxtech/core';
import { rewards } from './rewards.mock';

export const campaigns: ICampaign[] = [
  // {
  //     id: 1,
  //     name: 'Smash that Pinata',
  //     description: '',
  //     type: CampaignType.stamp,
  //     state: CampaignState.active,
  //     endsAt: '2017-12-17T03:24:00'
  // },
  // {
  //     id: 2,
  //     name: 'all-it GAME',
  //     description: 'all-it description',
  //     type: CampaignType.game,
  //     state: CampaignState.active,
  //     endsAt: '2017-11-17T03:24:00'
  // },
  {
    id: 3,
    name: 'Prudential Event',
    description: 'all-it description',
    type: CampaignType.survey,
    state: CampaignState.active,
    endsAt: new Date('2017-10-17T03:24:00'),
    thumbnailUrl: 'assets/pinata/opened-img.png'
  },
  {
    id: 1,
    name: 'Prudential Event',
    description: 'all-it description',
    type: CampaignType.survey,
    state: CampaignState.active,
    endsAt: new Date('2017-10-17T03:24:00'),
    thumbnailUrl: 'assets/pinata/opened-img.png'
  },
  {
    id: 4,
    name: 'BC step thru',
    description: 'keep moving forward',
    tnc: 'this are the TnC\'s that you are to abide by',
    type: CampaignType.progress,
    state: CampaignState.active,
    endsAt: new Date('2022-11-17T03:24:00'),
    beginsAt: new Date(),
    rewards: rewards,
    rewardsCount: 3,
    thumbnailUrl: 'https://picsum.photos/300/200?random=1',
    campaignBannerUrl: 'https://picsum.photos/300/200?random=2',
    displayProperties: {
      questDetails: {
        title: 'How far can you go?',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        imageUrl: 'https://picsum.photos/300/200?random=3',
        successImageUrl: 'https://picsum.photos/300/200?random=2'
      }
    },
    enrolled: true
  }
];
