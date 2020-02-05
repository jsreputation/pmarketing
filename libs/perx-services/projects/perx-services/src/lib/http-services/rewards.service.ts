import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPRewards, PRewardState, IPPostReward, IPPostRewardResponse } from '@perx/model';
import { HttpClient } from '@angular/common/http';
import { ApiConfigService } from '../configs/api-config';

export interface IRewardsListQueryParams {
  search_string?: string;
  state?: PRewardState;
}

@Injectable({
  providedIn: 'root'
})
export class RewardsService {
  constructor(private http: HttpClient, private apiConfig: ApiConfigService) { }

  public getRewards(query?: IRewardsListQueryParams): Observable<IPRewards> {
    const params: { [k: string]: string } = {};
    if (query) {
      Object.entries(query).forEach(([k, value]: [string, string]) => { params[k] = value; });
    }
    return this.http.get<IPRewards>(`${this.apiConfig.baseApiPath}/v4/dash/rewards`, { params });
  }

  public postReward(query: IPPostReward): Observable<IPPostRewardResponse> {
    return this.http.post<IPPostRewardResponse>(`${this.apiConfig.baseApiPath}/v4/dash/rewards`, query);
  }

  public putReward(query: any): Observable<IPPostRewardResponse> {
    return this.http.put<IPPostRewardResponse>(`${this.apiConfig.baseApiPath}/v4/dash/rewards/${query.id}`, query);
  }
}
