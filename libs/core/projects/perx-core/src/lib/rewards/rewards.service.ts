import { IReward, ICatalog, IPrice } from './models/reward.model';
import { Observable } from 'rxjs';
import {ITabConfigExtended} from './rewards-list-tabbed/rewards-list-tabbed.component';

export abstract class RewardsService {
  public abstract getAllRewards(tags?: string[] | null, categories?: string[], locale?: string): Observable<IReward[]>;

  public abstract getRewards(
    page: number,
    pageSize: number,
    tags?: string[] | null,
    categories?: string[] | null,
    locale?: string | null,
  ): Observable<IReward[]>;

  public abstract getReward(id: number, userId?: string, locale?: string): Observable<IReward>;

  public abstract getRewardPricesOptions(id: number, locale?: string): Observable<IPrice[]>;

  public abstract getAllCatalogs(locale?: string): Observable<ICatalog[]>;

  public abstract getCatalog(id: number, locale?: string): Observable<ICatalog>;

  public abstract getCatalogs(page?: number, pageSize?: number, locale?: string): Observable<ICatalog[]>;

  public abstract getCategories(): Observable<ITabConfigExtended[]>;
}
