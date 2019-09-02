import { IGame, GameType } from '@perx/core';

export const games: IGame[] = [
    {
        id: 1,
        campaignId: 1,
        type: GameType.shakeTheTree,
        remainingNumberOfTries: 3,
        config: {
            nbHangedGift: 6,
            nbGiftsToDrop: 6,
            nbTaps: 5,
            treeImg: 'https://perx-cdn-staging.s3.amazonaws.com/model_image/source/3/tree-f3de9ec4-d96a-423d-b06e-8743444cd788.png',
            giftImg: 'https://perx-cdn-staging.s3.amazonaws.com/model_image/source/4/gift-b5339f0a-e0e0-488f-8e71-b8f80f87bfd0.png',
            waitingAccessoryImg: 'https://perx-cdn-staging.s3.amazonaws.com/model_image/source/5/person-da378c12-9412-49ee-9ca7-04e1da09f104.png',
            celebratingAccessoryImg: 'https://perx-cdn-staging.s3.amazonaws.com/model_image/source/6/celebrating_person-162630f0-a47b-46a9-b167-00ba1967c0fd.png'
        },
        backgroundImg: '',
        texts: {
            title: 'Tap the Tree!',
            subTitle: 'Tap the tree and win rewards',
            button: '',
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
            stillImg: '',
            brokenImg: '',
            nbTaps: 5
        },
        backgroundImg: '',
        texts: {
            title: '',
            subTitle: '',
            button: '',
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
]