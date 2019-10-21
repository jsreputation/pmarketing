import { IStampCard, StampCardState, PuzzleCollectStampState } from '@perx/core';

export const stampCard: IStampCard = {
    id: 1,
    userAccountId: 1,
    state: StampCardState.active,
    campaignId: 1,
    cardNumber: 1,
    campaignConfig: {
        totalSlots: 10,
        rewards: [],
        collectionRewards: [
            { rewardPosition: 0 },
            { rewardPosition: 2 }
        ]
    },
    displayProperties: {
        numberOfCols: 1,
        numberOfRows: 1,
        cardImage: {
            value: {
                imageUrl: 'assets/HSBC_Christmas_Game_BG.jpg'
            }
        },
        preStampImg: 'assets/hsbc-prestamp.png',
        postStampImg: 'assets/hsbc-stamped.png',
        rewardPreStamp: 'assets/pre-reward.png',
        rewardPostStamp: 'assets/post-reward.png',
        totalSlots: 1,
        displayCampaignAs: 'stamp_card'
    },
    collectionStamps: [
        { id: 1, state: PuzzleCollectStampState.redeemed },
        { id: 2, state: PuzzleCollectStampState.redeemed },
        { id: 3, state: PuzzleCollectStampState.issued },
        { id: 4, state: PuzzleCollectStampState.issued }
    ]
};
