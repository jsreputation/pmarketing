import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvConfig } from './env-config';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface IV4Meta {
  count?: number;
  size?: number;
  total_pages?: number;
  page?: number;
}

interface IV4Reward {
  id: number;
  name: string;
  description: string;
  valid_from: string;
}

interface IV4GetRewardsResponse {
  data: IV4Reward[];
  meta?: IV4Meta;
}

interface IV4GetRewardResponse {
  data: IV4Reward[];
}

@Injectable({
  providedIn: 'root'
})
export class RewardsService {

  private apiHost: string;

  constructor(private http: HttpClient, config: EnvConfig) {
    this.apiHost = config.env.apiHost;
  }

  getTags() {
    // todo: api not implemented yet
  }

  getRewards(page = 1, pageSize = 25): Observable<IV4Reward[]> {
    return this.http.get<IV4GetRewardsResponse>(
      `${ this.apiHost }/v4/rewards`,
      {
        params: {
          page: `${ page }`,
          size: `${ pageSize }`
        }
      }
    ).pipe(
      map(res => res.data)
    );
  }

  getReward(id: number): Observable<IV4Reward[]> {
    return this.http.get<IV4GetRewardResponse>(
      `${ this.apiHost }/v4/reward/${ id }`
    ).pipe(
      map(res => res.data)
    );
  }

}
