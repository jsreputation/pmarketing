import { Observable } from 'rxjs';
import {
  ILoyalty,
  ILoyaltyTransaction,
  ILoyaltyTransactionHistory
} from './models/loyalty.model';

export abstract class LoyaltyService {
  public abstract getLoyalties(page?: number, pageSize?: number, locale?: string): Observable<ILoyalty[]>;

  public abstract getLoyalty(id?: number, locale?: string): Observable<ILoyalty>;

  public abstract getAllTransactions(loyaltyId?: number, locale?: string): Observable<ILoyaltyTransaction[]>;

  public abstract getTransactions(loyaltyId: number, page?: number, pageSize?: number, locale?: string): Observable<ILoyaltyTransaction[]>;

  public abstract getTransactionHistory(
    page?: number,
    pageSize?: number,
    locale?: string,
    sortBy?: string,
    orderBy?: string
  ): Observable<ILoyaltyTransactionHistory[]>;
}
