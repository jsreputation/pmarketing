import { Asset } from '../../game/v4-game.service';

export interface IBadge {
    id: number;
    active: boolean;
    title: string;
    description?: string;
    image: Asset;
}
