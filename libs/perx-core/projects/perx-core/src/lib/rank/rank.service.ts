import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ConfigService } from '../config/config.service';

type LeaderBoard = {
  display_properties: {
    [key: string]: any;
  };
  id: number;
  metric: string;
  title: string;
};

type UserRanking = {
  display_name: string;
  id: number;
  rank: number;
  value: number;
};

@Injectable({
  providedIn: 'root'
})
export class RankService {
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

  public getLeaderBoards(): Observable<LeaderBoard> {
    return this.http.get(`${this.baseUrl}/v4/leaderboards`)
      .pipe(
        map((res: any) => res.data)
      );
  }

  public getLeaderBoard(id: number): Observable<LeaderBoard[]> {
    return this.http.get(`${this.baseUrl}/v4/leaderboards/${id}`)
      .pipe(
        map((res: any) => res.data)
      );
  }

  public getLeaderBoardRanks(id: number): Observable<UserRanking[]> {
    return this.http.get(`${this.baseUrl}/v4/leaderboards/${id}/users`)
      .pipe(
        map((res: any) => res.data)
      );
  }

}
