export enum GameType {
    unknown = -1,
    shakeTheTree,
    pinata
}

export interface IGameOutcome {
    title: string;
    subTitle: string;
    image?: string;
    button: string;
}
export interface IGame {
    id: number;
    campaignId: number;
    type: GameType;
    remainingNumberOfTries: number;
    config: ITree | IPinata;
    backgroundImg?: string;
    texts: {
        title?: string;
        subTitle?: string;
        button?: string;
    };
    results: {
        outcome?: IGameOutcome;
        noOutcome?: IGameOutcome;
    };
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
