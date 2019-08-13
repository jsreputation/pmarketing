import { IEngagement, IUpdateEngagement } from '../services/engagement.model';
import { IGame } from 'src/services/game/game.service';

export enum EngagementType {
    game = 'game',
}

export interface EngagementDto extends IEngagement {
    type: EngagementType;
}

export interface UpdateEngagementDto extends IUpdateEngagement {
    type: EngagementType;
}

// export interface GameEngagementDto extends IGame {
//     type: EngagementType;
// }
