
import { Observable } from 'rxjs';
import { IPrizeSetItem, IPrizeSet } from './models/prize-set-outcome.model';


export abstract class IPrizeSetOutcomeService {
  public abstract getPrizeSetIssuedOutcomes(transactionId: number): Observable<IPrizeSetItem[]>;
  public abstract getPrizeSetState(transactionId: number): Observable<string>;
  public abstract getPrizeSetDetails(prizeSetId: number): Observable<IPrizeSet>;
}
