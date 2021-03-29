import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ConfigService } from '../config/config.service';
import {
  LeaderBoard,
  UserRanking
} from './models/rank.model';

const camelToPascalCase = (str: string) => str.replace(/\B_[a-z]/g, m => (
  m.charAt(1).toUpperCase()
));

const objectKeysPascalize = (keyConvertFn, object: {} | null) => {
  const resultObj = {};
  if (object) {
    Object.entries(object).forEach(([key, value]) => {
      // if the valaue is an object, pascalize it's properties as well
      if (typeof (value) === 'object') {
        if (Array.isArray(value) && value.length) {
          const arr: any[] = [];
          value.forEach((arrayValue) => arr.push(objectKeysPascalize(keyConvertFn, arrayValue)));
          resultObj[keyConvertFn(key)] = arr;
        } else {
          resultObj[keyConvertFn(key)] = objectKeysPascalize(keyConvertFn, value);
        }
      } else {
        resultObj[keyConvertFn(key)] = value;
      }
    });
    return resultObj;
  }
};

interface V4LeaderBoard {
  display_properties: {
    [key: string]: any;
  };
  id: number;
  metric: string;
  title: string;
}

interface V4UserRanking {
  display_name: string;
  id: number;
  rank: number;
  value: number;
  is_current_user: boolean;
}

// whistler jsonApiWrap is different
interface ApiWrap<T> {
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class V4RankService {
  private baseUrl: string;

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) {
    this.configService.readAppConfig()
      .subscribe((config) => {
        this.baseUrl = config.apiHost;
      });
  }

  public getLeaderBoards(): Observable<LeaderBoard[]> {
    return this.http.get(`${this.baseUrl}/v4/leaderboards`)
      .pipe(
        map((res: ApiWrap<V4LeaderBoard[]>) => res.data),
        map((dataArr: V4LeaderBoard[]) => dataArr.map(data => objectKeysPascalize(camelToPascalCase, data) as LeaderBoard)),
        shareReplay(1)
      );
  }

  public getLeaderBoard(id: number): Observable<LeaderBoard> {
    return this.http.get(`${this.baseUrl}/v4/leaderboards/${id}`)
      .pipe(
        map((res: ApiWrap<V4LeaderBoard>) => res.data),
        map((data: V4LeaderBoard) => objectKeysPascalize(camelToPascalCase, data) as LeaderBoard),
        shareReplay()
      );
  }

  public getLeaderBoardsByCampaignID(campaignId: number): Observable<LeaderBoard[]> {
    return this.http.get(`${this.baseUrl}/v4/leaderboards?campaign_id=${campaignId}`)
      .pipe(
        map((res: ApiWrap<V4LeaderBoard[]>) => res.data),
        map((dataArr: V4LeaderBoard[]) => dataArr.map(data => objectKeysPascalize(camelToPascalCase, data) as LeaderBoard)),
        shareReplay(1)
      );
  }

  public getLeaderBoardRanks(id: number): Observable<UserRanking[]> {
    return this.http.get(`${this.baseUrl}/v4/leaderboards/${id}/top_users`)
      .pipe(
        map((res: ApiWrap<V4UserRanking[]>) => res.data),
        map((ranking: V4UserRanking[]) =>
          ranking.map((rank, index) => ({ ...rank, rank: index + 1 }))), // top_users response is sorted by rank
        map((dataArr: V4UserRanking[]) => dataArr.map(data => objectKeysPascalize(camelToPascalCase, data) as UserRanking))
      );
  }

  public getLeaderBoardUserRank(id: number): Observable<UserRanking> {
    return this.http.get(`${this.baseUrl}/v4/leaderboards/${id}/my_rank`)
      .pipe(
        map((res: ApiWrap<V4UserRanking>) => res.data),
        map((data: V4UserRanking) => objectKeysPascalize(camelToPascalCase, data) as UserRanking)
      );
  }
}
