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
                imageUrl: 'string'
            }
        },
        preStampImg: 'assets/stamps/pre_stamp.png',
        postStampImg: 'assets/stamps/post_stamp_redeemed.png',
        rewardPreStamp: 'assets/stamps/pre_reward.png',
        rewardPostStamp: 'assets/stamps/post_reward.png',
        totalSlots: 1,
    },
    collectionStamps: [
        { id: 1, state: PuzzleCollectStampState.redeemed },
        { id: 2, state: PuzzleCollectStampState.redeemed },
        { id: 3, state: PuzzleCollectStampState.redeemed },
        { id: 3, state: PuzzleCollectStampState.issued }
    ]
};
