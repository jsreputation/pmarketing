import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ConfigService } from '../config/config.service';
import {
  LeaderBoard,
  UserRanking
} from './models/rank.model';

const camelToPascalCase = (str: string) => str.replace(/\B_[a-z]/g, m => (
  m.charAt(1).toUpperCase()
));

const objectKeysPascalize = (keyConvertFn, object: {}) => {
  const resultObj = {};
  Object.entries(object).forEach(([key, value]) => {
    resultObj[keyConvertFn(key)] = value;
  });
  return resultObj;
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
        map((dataArr: V4LeaderBoard[]) => dataArr.map(data => objectKeysPascalize(camelToPascalCase, data) as LeaderBoard))
      );
  }

  public getLeaderBoard(id: number): Observable<LeaderBoard> {
    return this.http.get(`${this.baseUrl}/v4/leaderboards/${id}`)
      .pipe(
        map((res: ApiWrap<V4LeaderBoard>) => res.data),
        map((data: V4LeaderBoard) => objectKeysPascalize(camelToPascalCase, data) as LeaderBoard)
      );
  }

  public getLeaderBoardRanks(id: number): Observable<UserRanking[]> {
    return this.http.get(`${this.baseUrl}/v4/leaderboards/${id}/users`)
      .pipe(
        map((res: ApiWrap<V4UserRanking[]>) => res.data),
        map((dataArr: V4UserRanking[]) => dataArr.map(data => objectKeysPascalize(camelToPascalCase, data) as UserRanking))
      );
  }
}
