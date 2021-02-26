import { Component } from '@angular/core';
import {
  IRankService,
  LeaderBoard,
  ProfileService,
  UserRanking
} from '@perxtech/core';
import {
  catchError,
  concatMap
} from 'rxjs/operators';
import { combineLatest, Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'perx-blackcomb-pages-leaderboard-page',
  templateUrl: './leaderboard-page.component.html',
  styleUrls: ['./leaderboard-page.component.scss']
})
export class LeaderboardPageComponent {
  public leaderboardRanks: UserRanking[];
  public userMiniRankData: UserRanking = ({
    displayName: '[No Name]',
    id: 0,
    rank: 0 || 'NA',
    value: 0
  });

  public leaderboard$: Observable<LeaderBoard>;
  public leaderBoardSettings: LeaderBoard;

  public constructor(
    private rankService: IRankService,
    private profileService: ProfileService,
    private route: ActivatedRoute
  ) {
    if (this.route.snapshot.paramMap.has('id')) {
      const IdN = Number.parseInt(this.route.snapshot.paramMap.get('id') as string, 10);
      this.leaderboard$ = this.rankService.getLeaderBoard(IdN);
      this.leaderboard$.pipe(
        concatMap((leaderboard) => this.rankService.getLeaderBoardRanks(leaderboard.id))
      ).subscribe((ranksArr) => {
        if (ranksArr) {
          this.leaderboardRanks = ranksArr as UserRanking[];
        }
      });

      combineLatest(this.profileService.whoAmI(), this.leaderboard$).pipe(
        concatMap(([profile, leaderboard]) => {
          if (leaderboard) {
            this.leaderBoardSettings = leaderboard;
          }
          if (leaderboard && profile && profile.id) {
            const defaultMiniRank = {
              displayName: (profile.customProperties
                && (profile.customProperties.nickname
                  || profile.customProperties.fullName
                  || profile.identifier)
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
      ).subscribe((miniRank: UserRanking | undefined) => {
        if (miniRank) {
          this.userMiniRankData = miniRank;
        }
      });
    }
  }
}
