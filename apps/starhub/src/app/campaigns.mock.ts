import { ICampaign, CampaignType, CampaignState } from '@perxtech/core';

export const campaigns: ICampaign[] = [
  {
    id: 1,
    name: 'Shake Pinata Test',
    description: null,
    type: CampaignType.game,
    state: CampaignState.active,
    endsAt: null
  }
];
