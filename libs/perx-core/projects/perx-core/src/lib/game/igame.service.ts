import { Observable } from 'rxjs';
import { IGame, IPlayOutcome } from './game.model';

export abstract class IGameService {
    public abstract play(campaignId: number, engagementId?: number): Observable<IPlayOutcome>;
    public abstract getGamesFromCampaign(campaignId: number): Observable<IGame[]>;
    public abstract get(gameId: number): Observable<IGame>;
}
