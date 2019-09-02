import { IGame, GameType } from '@perx/core';

export const game: IGame = {
  id: 1,
  campaignId: 1,
  type: GameType.pinata,
  remainingNumberOfTries: 3,
  config: {
    stillImg: null,
    breakingImg: null,
    brokenImg: null,
    nbTaps: 3,
  },
  backgroundImg: null,
  texts: {
    title: null,
    subTitle: null,
    button: null,
  },
  results: {
    outcome: null,
    noOutcome: null
  }
};
