import { IReward, ICatalog, IPrice } from './models/reward.model';
import { Observable } from 'rxjs';
import { IMerchant } from '../merchants/models/merchants.model';

export abstract class RewardsService {
  public abstract getAllRewards(tags?: string[], categories?: string[]): Observable<IReward[]>;

  public abstract getRewards(page: number, tags?: string[], categories?: string[], merchants?: IMerchant[]): Observable<IReward[]>;

  public abstract getReward(id: number, userId?: string): Observable<IReward>;

  public abstract getRewardPricesOptions(id: number): Observable<IPrice[]>;

  public abstract getAllCatalogs(): Observable<ICatalog[]>;

  public abstract getCatalog(id: number): Observable<ICatalog>;
}
