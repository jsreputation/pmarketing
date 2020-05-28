import { Observable } from 'rxjs';
import {
  ILoyalty,
  ITransaction,
  ITransactionHistory
} from './models/loyalty.model';

export abstract class LoyaltyService {
  public abstract getLoyalties(page?: number, pageSize?: number, locale?: string): Observable<ILoyalty[]>;

  public abstract getLoyalty(id?: number, locale?: string): Observable<ILoyalty>;

  public abstract getAllTransactions(loyaltyId?: number, locale?: string): Observable<ITransaction[]>;

  public abstract getTransactions(loyaltyId: number, page?: number, pageSize?: number, locale?: string): Observable<ITransaction[]>;

  public abstract getTransactionHistory(page?: number, pageSize?: number, locale?: string, sortBy?: string, orderBy?: string): Observable<ITransactionHistory[]>;
}
