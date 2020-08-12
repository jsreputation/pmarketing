import { Observable } from 'rxjs';
import { IGame, IPlayOutcome, IEngagementTransaction } from './game.model';

export abstract class IGameService {
  public abstract play(engagementId: number, campaignId?: number): Observable<IPlayOutcome | void>;
  public abstract prePlay(engagementId: number, campaignId?: number): Observable<IEngagementTransaction>;
  public abstract prePlayConfirm(
    transactionId: number,
    informationCollectionSetting?: string): Observable<IEngagementTransaction | IPlayOutcome | void>;
  public abstract getGamesFromCampaign(campaignId: number): Observable<IGame[]>;
  public abstract get(gameId: number, campaignId?: number): Observable<IGame>;
  public abstract getActiveGames(): Observable<IGame[]>;
}
