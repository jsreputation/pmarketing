
import { Observable } from 'rxjs';
import { IPrizeSetItem } from './models/prize-set-outcome.model';


export abstract class IPrizeSetOutcomeService {
  public abstract getPrizeSet(transactionId: number): Observable<IPrizeSetItem[]>;
  public abstract getPrizeSetState(transactionId: number): Observable<string>;
}
