import { IStampCard, StampCardState, StampState } from '@perx/core';

export const stampCard: IStampCard[] = [
  {
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
          imageUrl: ''
        }
      },
      backgroundImg: {
        value: {
          imageUrl: 'assets/xmas_bg.jpg'
        }
      },
      preStampImg: 'assets/hsbc-prestamp.png',
      postStampImg: 'assets/hsbc-stamped.png',
      rewardPreStamp: 'assets/pre-reward.png',
      rewardPostStamp: 'assets/post-reward.png',
      totalSlots: 10,
      displayCampaignAs: 'stamp_card',
      rewardPositions: [5]
    },
    stamps: [
      {
        id: 28369,
        stampCardId: 282369,
        userAccountId: 59431,
        state: StampState.issued,
        campaignId: 100,
        vouchers: [],
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 28370,
        stampCardId: 28370,
        userAccountId: 59431,
        state: StampState.issued,
        campaignId: 100,
        vouchers: [],
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 28372,
        stampCardId: 28372,
        userAccountId: 59431,
        state: StampState.issued,
        campaignId: 100,
        vouchers: [],
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 28373,
        stampCardId: 28373,
        userAccountId: 59431,
        state: StampState.issued,
        campaignId: 100,
        vouchers: [],
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 28374,
        stampCardId: 28374,
        userAccountId: 59431,
        state: StampState.issued,
        campaignId: 100,
        vouchers: [],
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 28375,
        stampCardId: 28375,
        userAccountId: 59431,
        state: StampState.issued,
        campaignId: 100,
        vouchers: [],
        createdAt: '',
        updatedAt: '',
      }
    ]
  }
];
