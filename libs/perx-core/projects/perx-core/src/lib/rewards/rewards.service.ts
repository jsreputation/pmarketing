import {IReward, ICatalog, IPrice} from './models/reward.model';
import {Observable, throwError} from 'rxjs';
import {IVoucher} from '../vouchers/models/voucher.model';

export abstract class RewardsService {

  public abstract getTags(): void;

  public abstract getAllRewards(tags?: string[]): Observable<IReward[]>;

  public abstract getRewards(page: number, pageSize: number, tags?: string[]): Observable<IReward[]>;

  public abstract reserveReward(rewardId: number, priceId: number): Observable<IVoucher>;

  public abstract getReward(id: number): Observable<IReward>;

  // @ts-ignore
  public abstract getRewardPricesOptions(id: number): Observable<IPrice[]> {
    return throwError('Not implemented yet');
  }

  public abstract getAllCatalogs(): Observable<ICatalog[]>;

  public abstract getCatalogs(page: number, pageSize: number): Observable<ICatalog[]>;

  public abstract getCatalog(id: number): Observable<ICatalog>;

}
