import { Observable } from 'rxjs';

export abstract class TransactionsService {
  public abstract getTransactions(): Observable<any>
}
