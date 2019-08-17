import { Injectable, HttpService } from '@nestjs/common';
import { IEngagement, } from '../engagement.model';
import { IEngagementService } from '../iengagement.service';
import { EngagementService } from '../engagement.service';

const enum GameType {
    spin = 'spin',
    tap = 'tap',
    shake = 'shake',
}

export type IShake = any;
export type ITree = any;

export interface IGame extends IEngagement {
    display_properties: IShake | ITree;
    game_type: GameType;
}

export interface IUpdateGame extends IEngagement {
    display_properties: IShake | ITree;
    game_type: GameType;
}

@Injectable()
export class GameService extends EngagementService<IGame> implements IEngagementService {
    protected service: string = 'game';

    // important so, that parent abstract class get HttpService injected
    constructor(protected http: HttpService) {
        super(http);
    }
}
