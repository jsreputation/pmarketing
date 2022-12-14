import { Observable } from 'rxjs';
import { IStampCard, IStamp } from './models/stamp.model';

export abstract class StampService {

  public abstract getCards(campaignId: number): Observable<IStampCard[]>;

  public abstract getCurrentCard(campaignId: number): Observable<IStampCard>;

  public abstract stampsChangedForStampCard(campaignId: number): Observable<IStampCard | undefined>;

  public abstract getStamps(campaignId: number): Observable<IStamp[]>;

  public abstract putStamp(stampId: number, sourceType?: string): Observable<IStamp>;

  public abstract stampAll(cardId: number): Observable<IStamp[]>;

  public abstract getActiveCards(stampType?: string): Observable<IStampCard[]>;
}
