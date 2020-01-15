import {
  IStamp,
  StampState,
} from '@perx/core';

// @ts-ignore
export const stamps: IStamp[] = Array.from({length: 5}, (stamp, id) => ({
  id,
  userAccountId: id,
  stampCardId: id,
  state: StampState.issued,
  createdAt: '',
  updatedAt: '',
  campaignId: id,
  vouchers: [],
}));
