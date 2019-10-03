import { Observable } from 'rxjs';
import { ILoyalty, ITransaction } from './models/loyalty.model';

export abstract class LoyaltyService {
  public abstract getLoyalties(page?: number, pageSize?: number): Observable<ILoyalty[]>;

  public abstract getLoyalty(id?: number): Observable<ILoyalty>;

  public abstract getAllTransactions(loyaltyId?: number): Observable<ITransaction[]>;

  public abstract getTransactions(loyaltyId: number, page?: number, pageSize?: number): Observable<ITransaction[]>;
}
