
import { Observable } from 'rxjs';
import { IInstantOutcome, IInstantOutcomeTransaction } from './models/instant-outcome-transaction.model';


export abstract class IInstantOutcomeTransactionService {
  public abstract getInstantOutcomeTransactions(): Observable<IInstantOutcomeTransaction[]>;
  public abstract claimPrize(instantOutcomeTransactionId: number): Observable<IInstantOutcomeTransaction>;
  public abstract getInstantRewardState(transactionId: number): Observable<string>;
  public abstract getInstantOutcomeTransaction(transactionId: number): Observable<IInstantOutcomeTransaction>;
  public abstract getInstantOutcomeTransactionOutcomes(transactionId: number): Observable<IInstantOutcome[]>;
}
