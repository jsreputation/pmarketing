import { Observable } from 'rxjs';
import { IV4PointsOutcome } from '../campaign/v4-campaign.service';
import {
  IExchangerate,
  ILoyalty,
  ILoyaltyTransaction,
  ILoyaltyTransactionHistory,
  IPointTransfer
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

  public abstract getLoyaltyExchangerates(sourceLoyaltyId: number, page?: number, pageSize?: number): Observable<IExchangerate[]>;
  public abstract tansferPoints(pointTransfer: IPointTransfer): Observable<IV4PointsOutcome>;
}
