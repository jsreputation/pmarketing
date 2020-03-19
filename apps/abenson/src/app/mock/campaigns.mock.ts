import { ICampaign, CampaignType, CampaignState } from '@perxtech/core';

export const campaigns: ICampaign[] = [
  {
    id: 1,
    name: 'Smash that Pinata',
    description: '',
    type: CampaignType.game,
    state: CampaignState.active,
    endsAt: new Date('2017-11-17T03:24:00')
  },
  {
    id: 2,
    name: 'Abenson GAME',
    description: 'Abenson description',
    type: CampaignType.game,
    state: CampaignState.active,
    endsAt: new Date('2017-11-17T03:24:00')
  },
  {
    id: 3,
    name: 'Abenson Stamp',
    description: 'Abenson description',
    type: CampaignType.stamp,
    state: CampaignState.active,
    endsAt: new Date('2017-11-17T03:24:00')
  }
];
