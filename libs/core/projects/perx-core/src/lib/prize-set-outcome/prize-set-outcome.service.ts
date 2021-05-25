
import { Observable } from 'rxjs';
import { IPrizeSetItem } from './models/prize-set-outcome.model';


export abstract class IPrizeSetOutcomeService {
  public abstract getPrizeSetIssuedOutcomes(transactionId: number): Observable<IPrizeSetItem[]>;
  public abstract getPrizeSetState(transactionId: number): Observable<string>;
  public abstract getPrizeSetOutcomes(prizeSetId: number): Observable<IPrizeSetItem[]>;
}
