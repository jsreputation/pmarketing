import {
  IStampCard,
  StampCardState,
  StampState,
  IStamp,
} from '@perx/core';
export const stamp: IStamp = {
  id: 28375,
  stampCardId: 28375,
  userAccountId: 59431,
  state: StampState.redeemed,
  campaignId: 100,
  vouchers: [],
  createdAt: '',
  updatedAt: '',
};
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
  results: {},
  displayProperties: {
    numberOfCols: 1,
    numberOfRows: 1,
    cardImage: {
      value: {
        imageUrl: 'assets/stamps/pre_reward.png'
      }
    },
    preStampImg: 'assets/stamps/pre_stamp.png',
    postStampImg: 'assets/stamps/post_stamp_redeemed.png',
    rewardPreStamp: 'assets/stamps/pre_reward.png',
    rewardPostStamp: 'assets/stamps/post_reward.png',
    totalSlots: 1,
    displayCampaignAs: 'puzzle',
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
    },
    stamp
  ]
};
