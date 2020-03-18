import { IGame, GameType } from '@perxtech/core';

export const game: IGame[] = [
  {
    id: 1,
    campaignId: 1,
    type: GameType.pinata,
    remainingNumberOfTries: 3,
    config: {
      stillImg: '',
      breakingImg: undefined,
      nbTaps: 3,
      brokenImg: '',
    },
    backgroundImg: undefined,
    texts: {
      title: undefined,
      subTitle: undefined,
      button: undefined,
    },
    results: {
      outcome: undefined,
      noOutcome: undefined
    }
  }
];
