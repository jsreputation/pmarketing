
export enum STAMP_STATE {
  issued = 'issued',
  redeemed = 'redeemed'
}

export interface PuzzleCollectStamp {
  id: number;
  state: STAMP_STATE;
}

export interface PuzzleCollectReward {
  rewardPosition: number;
}
