import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Config} from '../config/config';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RankService {
  private baseUrl: string;

  constructor(
    private http: HttpClient,
    config: Config,
  ) {
    this.baseUrl = config.apiHost || '';
  }

  public getLeaderBoards() {
    return this.http.get(`${this.baseUrl}/leaderboards`)
      .pipe(
        map((res: any) => res.data)
      )
  }

  // havent confirmed type / properties
  public getLeaderBoard(id: number) {
    return this.http.get(`${this.baseUrl}/leaderboards/${id}`)
      .pipe(
        map((res: any) => res.data)
      )
  }

  public getLeaderBoardRanks(id: number) {
    return this.http.get(`${this.baseUrl}/leaderboards/${id}/users`)
      .pipe(
        map((res: any) => res.data)
      )
  }

}
