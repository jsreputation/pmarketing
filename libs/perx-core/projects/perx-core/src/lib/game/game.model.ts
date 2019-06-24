export enum GAME_TYPE {
    shakeTheTree,
}

export interface IGame {
    id: number;
    campaignId: number;
    type: GAME_TYPE;
    remainingNumberOfTries: number;
    config: ITree;
    backgroundImg?: string;
}

export function defaultTree(): ITree {
    return {
        nbHangedGift: 6,
        nbGiftsToDrop: 6,
        nbTaps: 5,
        treeImg: '',
        giftImg: ''
    };
}
export interface ITree {
    treeImg: string;
    giftImg: string;
    waitingAccessoryImg?: string;
    celebratingAccessoryImg?: string;
    nbHangedGift: number;
    nbGiftsToDrop: number;
    nbTaps: number;
}
