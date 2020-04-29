import {Observable} from 'rxjs';
import {LeaderBoard, UserRanking} from './v4-rank.service';

export abstract class IRankService {
  public abstract getLeaderBoards(): Observable<LeaderBoard>;
  public abstract getLeaderBoard(id: number): Observable<LeaderBoard[]>;
  public abstract getLeaderBoardRanks(id: number): Observable<UserRanking[]>
}
