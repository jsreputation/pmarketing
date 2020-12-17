import { Observable } from 'rxjs';
import { ITransaction } from '../models/transactions.model';

export abstract class TransactionsService {
  public abstract getTransactions(
    page: number,
    pageSize: number,
    startAmount?: number): Observable<ITransaction[]>;
    public abstract getTransactionSummary(): Observable<{totalAmount: number}>;
}
