export enum GAME_TYPE {
    unknown = -1,
    shakeTheTree,
    pinata
}

export interface IGame {
    id: number;
    campaignId: number;
    type: GAME_TYPE;
    remainingNumberOfTries: number;
    config: ITree|IPinata;
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

export function defaultPinata(): IPinata {
    return {
        stillImg: '',
        brokenImg: '',
        nbTaps: 5
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

export interface IPinata {
    stillImg: string;
    breakingImg?: string;
    brokenImg: string;
    nbTaps: number;
}
