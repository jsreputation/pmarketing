import { Component } from '@angular/core';
import {
  IRankService,
  LeaderBoard,
  ProfileService,
  UserRanking
} from '@perxtech/core';
import {
  catchError, concatMap,
  map,
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
  public userMiniRankData: UserRanking =  ({
    displayName: '[No Name]',
    id: 0,
    rank: 0 || 'NA',
    value: 0
  });

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
      concatMap((leaderboard) => this.rankService.getLeaderBoardRanks(leaderboard.id))
    ).subscribe((ranksArr) => {
      if (ranksArr) {
        this.leaderboardRanks = ranksArr as UserRanking[];
      }
    });

    this.profileService.whoAmI().pipe(
      withLatestFrom(this.leaderboard$),
      concatMap(([profile, leaderboard]) => {
        if (leaderboard) {
          this.leaderBoardSettings = leaderboard;
        }
        if (leaderboard && profile && profile.id) {
          const defaultMiniRank = {
            displayName: (profile.customProperties
              && profile.customProperties.nickname
              && profile.customProperties.fullName
              && profile.identifier
            ),
            id: 0,
            rank: 0 || 'NA',
            value: 0
          };
          return this.rankService.getLeaderBoardUserRank(leaderboard.id, profile.id)
            .pipe(
              catchError(_ => of(defaultMiniRank))
            );
        }
        return of(undefined);
      })
    ).subscribe(res => {
      if (res) {
        this.userMiniRankData = res;
      }
    });
  }
}
