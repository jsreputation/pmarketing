import { Observable, throwError } from 'rxjs';
import { ILoyalty, IPointHistory } from './models/loyalty.model';
import { IVoucher } from '../vouchers/models/voucher.model';

export abstract class LoyaltyService {
  public abstract getLoyalties(page?: number, pageSize?: number): Observable<ILoyalty[]>;

  public abstract getLoyalty(id: number): Observable<ILoyalty>;

  public abstract getAllHistory(loyaltyId: number): Observable<IPointHistory[]>;

  public abstract getHistory(loyaltyId: number, page?: number, pageSize?: number): Observable<IPointHistory[]>;

  // @ts-ignore
  public exchangePoints(rewardId: number): Observable<IVoucher[]> {
    return throwError('Not implemented yet');
  }
}
