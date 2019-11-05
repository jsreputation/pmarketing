import { Observable } from 'rxjs';
import { IGame, IPlayOutcome } from './game.model';

export abstract class IGameService {
    public abstract play(engagementId: number, campaignId?: number): Observable<IPlayOutcome>;
    public abstract prePlay(engagementId: number, campaignId?: number): Observable<IPlayOutcome>;
    public abstract prePlayConfirm(transactionId: number): Observable<void>;
    public abstract getGamesFromCampaign(campaignId: number): Observable<IGame[]>;
    public abstract get(gameId: number): Observable<IGame>;
}
