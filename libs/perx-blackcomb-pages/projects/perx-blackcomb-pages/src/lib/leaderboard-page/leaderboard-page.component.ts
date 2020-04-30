import { Component } from '@angular/core';
import {
  IRankService,
  LeaderBoard,
  ProfileService,
  UserRanking
} from '@perxtech/core';
import {
  map,
  switchMap,
  withLatestFrom
} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'perx-blackcomb-pages-leaderboard-page',
  templateUrl: './leaderboard-page.component.html',
  styleUrls: ['./leaderboard-page.component.scss']
})
export class LeaderboardPageComponent {
  public leaderboardRanks: UserRanking[];
  public userMiniRankData: UserRanking = {
    id: 1,
    rank: 12,
    displayName: 'test',
    value: 1000
  };

  public leaderboard$: Observable<LeaderBoard>;
  public leaderBoardSettings: LeaderBoard;

  public constructor(
    private rankService: IRankService,
    private profileService: ProfileService
  ) {
    this.leaderboard$ = this.rankService.getLeaderBoards()
      .pipe(
        map(leaderboards => leaderboards[0])
      );

    this.leaderboard$.pipe(
      switchMap((leaderboard) => this.rankService.getLeaderBoardRanks(leaderboard.id))
    ).subscribe((ranksArr) => {
      if (ranksArr) {
        this.leaderboardRanks = ranksArr;
      }
    });

    this.profileService.whoAmI().pipe(
      withLatestFrom(this.leaderboard$),
      switchMap(([profile, leaderboard]) => {
        if (leaderboard) {
          this.leaderBoardSettings = leaderboard;
        }
        if (leaderboard && profile && profile.id) {
          return this.rankService.getLeaderBoardUserRank(leaderboard.id, profile.id);
        }
        return of(undefined);
      })
    ).subscribe(
      (userMiniRank: UserRanking) => {
        if (userMiniRank) {
          this.userMiniRankData = userMiniRank;
        }
      }
    );
  }
}
