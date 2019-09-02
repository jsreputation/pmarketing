import { ICampaign, CampaignType, CampaignState } from '@perx/core';

export const campaigns: ICampaign[] = [
    {
        id: 1,
        name: 'Blackcomb GAME',
        description: 'Blackcomb description',
        type: CampaignType.game,
        state: CampaignState.active
    },
    {
        id: 2,
        name: 'Blackcomb GAME',
        description: 'Blackcomb description',
        type: CampaignType.game,
        state: CampaignState.active
    },
    {
        id: 3,
        name: 'Blackcomb Stamp',
        description: 'Blackcomb description',
        type: CampaignType.stamp,
        state: CampaignState.active
    }
]