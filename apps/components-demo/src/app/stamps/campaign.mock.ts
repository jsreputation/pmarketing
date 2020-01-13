import { ICampaign, CampaignType, CampaignState } from '@perx/core';

export const campaigns: ICampaign[] = [
  {
    id: 3,
    name: 'Prudential Event',
    description: 'Blackcomb description',
    type: CampaignType.survey,
    state: CampaignState.active,
    endsAt: new Date('2017-10-17T03:24:00'),
    thumbnailUrl: 'assets/pinata/opened-img.png'
  },
  {
    id: 1,
    name: 'Prudential Event',
    description: 'Blackcomb description',
    type: CampaignType.stamp,
    state: CampaignState.active,
    endsAt: new Date('2017-10-17T03:24:00'),
    thumbnailUrl: 'assets/pinata/opened-img.png'
  }
];