import { Observable } from 'rxjs';
import { ILoyalty, IPointHistory } from './models/loyalty.model';

export abstract class LoyaltyService {
  public abstract getLoyalties(page: number, pageSize: number): Observable<ILoyalty[]>;

  public abstract getLoyalty(id: number): Observable<ILoyalty>;

  public abstract getAllHistory(loyaltyId: number): Observable<IPointHistory[]>;

  public abstract getHistory(loyaltyId: number, page: number, pageSize: number): Observable<IPointHistory[]>;
}
