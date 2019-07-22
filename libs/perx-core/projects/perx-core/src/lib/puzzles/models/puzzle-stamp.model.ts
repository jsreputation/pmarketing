
export enum PUZZLE_COLLECT_STAMP_STATE {
  issued = 'issued',
  redeemed = 'redeemed'
}

export interface PuzzleCollectStamp {
  id: number;
  state: PUZZLE_COLLECT_STAMP_STATE;
}

export interface PuzzleCollectReward {
  rewardPosition: number;
}
