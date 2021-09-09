
import { Observable } from 'rxjs';
import { IInstantOutcomeTransaction } from './models/instant-outcome-transaction.model';


export abstract class IInstantOutcomeTransactionService {
  public abstract getInstantOutcomeTransactions(): Observable<IInstantOutcomeTransaction[]>;
  public abstract claimPrize(instantOutcomeTransactionId: number): Observable<IInstantOutcomeTransaction>;
}
