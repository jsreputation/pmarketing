import { IGame, GameType } from '@perxtech/core';

export const games: IGame[] = [
  {
    id: 1,
    campaignId: 2,
    type: GameType.shakeTheTree,
    remainingNumberOfTries: 3,
    config: {
      nbHangedGift: 6,
      nbGiftsToDrop: 6,
      nbTaps: 5,
      treeImg: 'https://cdn.perxtech.io/model_image/source/3/tree-f3de9ec4-d96a-423d-b06e-8743444cd788.png',
      giftImg: 'https://cdn.perxtech.io/model_image/source/4/gift-b5339f0a-e0e0-488f-8e71-b8f80f87bfd0.png',
      waitingAccessoryImg: 'https://cdn.perxtech.io/model_image/source/5/person-da378c12-9412-49ee-9ca7-04e1da09f104.png',
      celebratingAccessoryImg: 'https://cdn.perxtech.io/model_image/source/6/celebrating_person-162630f0-a47b-46a9-b167-00ba1967c0fd.png'
    },
    backgroundImg: '',
    texts: {
      title: 'Tap the Tree!',
      subTitle: 'Tap the tree and win rewards',
      button: 'Play',
    },
    results: {
      outcome: {
        title: '',
        subTitle: '',
        image: '',
        button: '',
      },
      noOutcome: {
        title: '',
        subTitle: '',
        image: '',
        button: '',
      }
    }
  },
  {
    id: 3,
    campaignId: 2,
    type: GameType.shakeTheTree,
    remainingNumberOfTries: 3,
    config: {
      nbHangedGift: 6,
      nbGiftsToDrop: 6,
      nbTaps: 5,
      treeImg: 'https://cdn.perxtech.io/model_image/source/3/tree-f3de9ec4-d96a-423d-b06e-8743444cd788.png',
      giftImg: 'https://cdn.perxtech.io/model_image/source/4/gift-b5339f0a-e0e0-488f-8e71-b8f80f87bfd0.png',
      waitingAccessoryImg: 'https://cdn.perxtech.io/model_image/source/5/person-da378c12-9412-49ee-9ca7-04e1da09f104.png',
      celebratingAccessoryImg: 'https://cdn.perxtech.io/model_image/source/6/celebrating_person-162630f0-a47b-46a9-b167-00ba1967c0fd.png'
    },
    backgroundImg: '',
    texts: {
      title: 'Tap the Tree! For Campaign 2',
      subTitle: 'Tap the tree and win rewards',
      button: 'Play',
    },
    results: {
      outcome: {
        title: '',
        subTitle: '',
        image: '',
        button: '',
      },
      noOutcome: {
        title: '',
        subTitle: '',
        image: '',
        button: '',
      }
    }
  },
  {
    id: 2,
    campaignId: 1,
    type: GameType.pinata,
    remainingNumberOfTries: 3,
    config: {
      stillImg: 'assets/pinata/still-img.png',
      brokenImg: 'assets/pinata/opened-img.png',
      nbTaps: 5
    },
    backgroundImg: '',
    texts: {
      title: 'Hit the Pinata!',
      subTitle: 'Hit the Pinata and win rewards',
      button: 'Play',
    },
    results: {
      outcome: {
        title: '',
        subTitle: '',
        image: '',
        button: '',
      },
      noOutcome: {
        title: '',
        subTitle: '',
        image: '',
        button: '',
      }
    }
  },
  {
    id: 2,
    campaignId: 2,
    type: GameType.pinata,
    remainingNumberOfTries: 3,
    config: {
      stillImg: 'assets/pinata/still-img.png',
      brokenImg: 'assets/pinata/opened-img.png',
      nbTaps: 5
    },
    backgroundImg: '',
    texts: {
      title: 'Hit the Pinata! For campaign 2',
      subTitle: 'Hit the Pinata and win rewards',
      button: 'Play',
    },
    results: {
      outcome: {
        title: '',
        subTitle: '',
        image: '',
        button: '',
      },
      noOutcome: {
        title: '',
        subTitle: '',
        image: '',
        button: '',
      }
    }
  }
];
