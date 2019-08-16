import { IReward, ICatalog } from './models/reward.model';
import { Observable } from 'rxjs';

export abstract class RewardsService {

  public abstract getTags(): void;

  public abstract getAllRewards(): Observable<IReward[]>;

  public abstract getRewards(page: number, pageSize: number): Observable<IReward[]>;

  public abstract getReward(id: number): Observable<IReward>;

  public abstract getCatalogs(page: number, pageSize: number): Observable<ICatalog[]>;

  public abstract getCatalog(id: number): Observable<IReward>;

}
