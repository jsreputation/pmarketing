import { Observable, throwError } from 'rxjs';
import { ILoyalty, ITransaction } from './models/loyalty.model';
import { IVoucher } from '../vouchers/models/voucher.model';

export abstract class LoyaltyService {
  public abstract getLoyalties(page?: number, pageSize?: number): Observable<ILoyalty[]>;

  public abstract getLoyalty(id: number): Observable<ILoyalty>;

  public abstract getAllTransactions(loyaltyId: number): Observable<ITransaction[]>;

  public abstract getTransactions(loyaltyId: number, page?: number, pageSize?: number): Observable<ITransaction[]>;

  // @ts-ignore
  public exchangePoints(loyaltyId: number, rewardId: number, quantity: number = 1): Observable<IVoucher[]> {
    return throwError('Not implemented yet');
  }
}
