import { IReward } from './models/reward.model';
import { Observable } from 'rxjs';

export abstract class RewardsService {

  public abstract getTags(): void;

  public abstract getRewards(page: number, pageSize: number): Observable<IReward[]>;

  public abstract getReward(id: number): Observable<IReward[]>;
}
