import { Observable } from 'rxjs';
import { ITransaction } from '../models/transactions.model';

export abstract class TransactionsService {
  public abstract getTransactions(page: number, pageSize: number): Observable<ITransaction[]>;
}
