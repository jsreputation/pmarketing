import { IEngagement, IUpdateEngagement } from '../services/engagement.model';
import { IGame } from 'src/services/game/game.service';

export enum EngagementType {
    game = 'game',
    stamps = 'stamps',
    instant_reward = 'instant_reward',
    survey = 'survey',
}

export interface EngagementDto extends IEngagement {
    type: EngagementType;
}

export interface UpdateEngagementDto extends IUpdateEngagement {
    type: EngagementType;
}
