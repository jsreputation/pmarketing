import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvConfig } from './env-config';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RewardsService } from './rewards.service';
import { IReward } from './models/reward.model';

interface IV4Meta {
  count?: number;
  size?: number;
  total_pages?: number;
  page?: number;
}

interface IV4Tag {
  id: number;
  name: string;
}

interface IV4Reward {
  id: number;
  name: string;
  description: string;
  subtitle: string;
  valid_from: Date;
  valid_to: Date;
  favourite: boolean;
  merchant_id?: number;
  merchant_name?: string;
  merchant_website?: string;
  terms_and_conditions?: string;
  tags?: IV4Tag[];
}

interface IV4GetRewardsResponse {
  data: IV4Reward[];
  meta?: IV4Meta;
}

interface IV4GetRewardResponse {
  data: IV4Reward;
}

@Injectable({
  providedIn: 'root'
})
export class V4RewardsService extends RewardsService {

  private apiHost: string;

  constructor(private http: HttpClient, config: EnvConfig) {
    super();
    this.apiHost = config.env.apiHost;
  }

  public static v4RewardToReward(reward: IV4Reward): IReward {
    return {
      id: reward.id,
      name: reward.name,
      subtitle: reward.subtitle,
      description: reward.description,
      valid_from: reward.valid_from,
      valid_to: reward.valid_to,
      merchant_id: reward.merchant_id,
      merchant_name: reward.merchant_name,
      merchant_website: reward.merchant_website,
    };
  }

  public getTags(): void {
    // todo: api not implemented yet
  }

  public getRewards(page: number = 1, pageSize: number = 25): Observable<IReward[]> {
    return this.http.get<IV4GetRewardsResponse>(
      `${ this.apiHost }/v4/rewards`,
      {
        params: {
          page: `${ page }`,
          size: `${ pageSize }`
        }
      }
    ).pipe(
      map((res: IV4GetRewardsResponse) => res.data),
      map((rewards: IV4Reward[]) => rewards.map(
        (reward: IV4Reward) => V4RewardsService.v4RewardToReward(reward)
      ))
    );
  }

  public getReward(id: number): Observable<IReward> {
    return this.http.get<IV4GetRewardResponse>(
      `${ this.apiHost }/v4/reward/${ id }`
    ).pipe(
      map(res => res.data),
      map((reward: IV4Reward) => V4RewardsService.v4RewardToReward(reward))
    );
  }

}
