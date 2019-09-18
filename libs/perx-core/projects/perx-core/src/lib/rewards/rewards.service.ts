import { IReward, ICatalog, IPrice } from './models/reward.model';
import { Observable } from 'rxjs';

export abstract class RewardsService {

  public abstract getTags(): void;

  public abstract getAllRewards(tags?: string[], categories?: string[]): Observable<IReward[]>;

  public abstract getRewards(page: number, pageSize: number, tags?: string[], categories?: string[]): Observable<IReward[]>;

  public abstract getReward(id: number): Observable<IReward>;

  public abstract getRewardPricesOptions(id: number): Observable<IPrice[]>;

  public abstract getAllCatalogs(): Observable<ICatalog[]>;

  public abstract getCatalogs(page: number, pageSize: number): Observable<ICatalog[]>;

  public abstract getCatalog(id: number): Observable<ICatalog>;
}
