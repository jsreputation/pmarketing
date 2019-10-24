import { ICampaign, CampaignType, CampaignState } from '@perx/core';

export const campaigns: ICampaign[] = [
  {
    id: 265,
    name: 'HSBC Xmas campaign',
    description: 'Merry Christmas!',
    type: CampaignType.stamp,
    endsAt: new Date('1970-01-01T00:00:00.000Z'),
    state: CampaignState.active
  },
  {
    id: 100,
    name: 'Puzzle Game',
    description: 'jahdjkashdjsahdkajhda',
    type: CampaignType.stamp,
    endsAt: new Date('1970-01-01T00:00:00.000Z'),
    state: CampaignState.active,
  },
];
