import { ICampaign, CampaignType, CampaignState } from '@perxtech/core';

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
  }
];