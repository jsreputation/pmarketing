import { Observable } from 'rxjs';
import { ITransaction } from '../models/transactions.model';

export abstract class TransactionsService {
  public abstract getTransactions(
    page: number,
    pageSize: number,
    startAmount?: number,
    state?: string,
    endDate?: Date): Observable<ITransaction[]>;
  public abstract getTransactionSummary(state?: string, endDate?: Date): Observable<{ totalAmount: number }>;
  public abstract getTransactionsCountByType(type: string, endDate?: Date): Observable<number>;
}
