import { Observable } from 'rxjs';
import { IStampCard, IStamp } from './models/stamp.model';

export interface IStampService {

  getCards(campaignId: number): Observable<IStampCard[]>;

  getCurrentCard(campaignId: number): Observable<IStampCard>;

  getStamps(campaignId: number): Observable<IStamp[]>;

  putStamp(stampId: number): Observable<IStamp>;

  stampAll(cardId: number): Observable<IStamp[]>;

}
