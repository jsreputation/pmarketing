import {
  IReward,
  ICatalog,
  IPrice,
  Sort,
  ISearchHistory,
  ITrending,
  ICategoryTags
} from './models/reward.model';
import { Observable } from 'rxjs';
import { ITabConfigExtended } from './rewards-list-tabbed/rewards-list-tabbed.component';

export abstract class RewardsService {
  public abstract getAllRewards(tags?: string[] | null, categories?: string[], locale?: string): Observable<IReward[]>;

  public abstract getAllFavoriteRewards(
    tags?: string[] | null, categories?: string[], locale?: string, filterFavorites?: boolean): Observable<IReward[]>;

  public abstract getRewards(
    page: number,
    pageSize: number,
    tags?: string[] | null,
    categories?: string[] | null,
    locale?: string | null,
    filterFavorites?: boolean,
    order?: Sort,
    sortBy?: string | null,
  ): Observable<IReward[]>;

  public abstract getReward(id: number, userId?: string, locale?: string): Observable<IReward>;

  public abstract getRewardPricesOptions(id: number, locale?: string): Observable<IPrice[]>;

  public abstract getAllCatalogs(locale?: string): Observable<ICatalog[]>;

  public abstract getCatalog(id: number, locale?: string): Observable<ICatalog>;

  public abstract getCatalogs(
    page?: number,
    pageSize?: number,
    locale?: string,
    order?: Sort,
    sortBy?: string | null): Observable<ICatalog[]>;

  public abstract getCategories(): Observable<ITabConfigExtended[]>;

  public abstract nearMe(rad?: number, lat?: number, lng?: number): Observable<IReward[]>;
  
  public abstract favoriteReward(rewardId: number): Observable<IReward>;

  public abstract unfavoriteReward(rewardId: number): Observable<IReward>;

  public abstract getAllCategories(): Observable<ICategoryTags[]>;

  public abstract getTrending(): Observable<ITrending[]>;

  public abstract getSearchHistory(): Observable<ISearchHistory[]>;

  public abstract getRewardsRelated(rewardId: number): Observable<IReward[]>;

  public abstract searchRewards(text: string, tags?: string, locale?: string): Observable<IReward[]>;

}
