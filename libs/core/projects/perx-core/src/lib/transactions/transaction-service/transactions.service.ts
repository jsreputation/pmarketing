import { Observable } from 'rxjs';
import { ITransaction } from '../models/transactions.model';

export abstract class TransactionsService {
  public abstract getTransactions(
    page: number,
    pageSize: number,
    startAmount?: number,
    state?: string): Observable<ITransaction[]>;
  public abstract getTransactionSummary(state?: string): Observable<{ totalAmount: number }>;
  public abstract getTransactionsCountByType(type: string): Observable<number>;
}
