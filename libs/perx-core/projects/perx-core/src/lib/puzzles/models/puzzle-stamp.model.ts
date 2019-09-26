export enum PuzzleCollectStampState {
  issued = 'issued',
  redeemed = 'redeemed'
}

export interface PuzzleCollectStamp {
  id: number;
  state: PuzzleCollectStampState;
}

export interface PuzzleCollectReward {
  rewardPosition: number;
}
