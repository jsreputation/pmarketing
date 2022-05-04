import {
  Observable
} from 'rxjs';
import {
  LeaderBoard,
  UserRanking
} from './models/rank.model';

export abstract class IRankService {
  public abstract getLeaderBoards(): Observable<LeaderBoard[]>;
  public abstract getLeaderBoard(id: number): Observable<LeaderBoard>;
  public abstract getLeaderBoardsByCampaignID(id: number): Observable<LeaderBoard[]>;
  public abstract getLeaderBoardRanks(id: number, topUsersCount?: number): Observable<UserRanking[]>;
  public abstract getLeaderBoardUserRank(id: number): Observable<UserRanking>;
}
