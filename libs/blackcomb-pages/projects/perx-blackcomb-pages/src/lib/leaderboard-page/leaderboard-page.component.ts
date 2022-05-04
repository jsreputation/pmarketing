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
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'perx-blackcomb-pages-leaderboard-page',
  templateUrl: './leaderboard-page.component.html',
  styleUrls: ['./leaderboard-page.component.scss']
})
export class LeaderboardPageComponent {
  public leaderboardRanks: UserRanking[];
  public userRankData: UserRanking = ({
    displayName: '[No Name]',
    id: 0,
    rank: 0 || 'NA',
    value: 0
  });

  public leaderboard$: Observable<LeaderBoard>;
  public leaderBoardSettings: LeaderBoard;
  private undefinedRankText: string;

  public constructor(
    private rankService: IRankService,
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) {
    if (this.route.snapshot.paramMap.has('id')) {
      const IdN = Number.parseInt(this.route.snapshot.paramMap.get('id') as string, 10);
      this.leaderboard$ = this.rankService.getLeaderBoard(IdN);
      this.leaderboard$.pipe(
        concatMap((leaderboard) => {
          const rankCount = leaderboard?.podiums?.length;
          const topUsersCount = leaderboard?.podiums[rankCount - 1]?.positionEnd;
          return (topUsersCount && leaderboard?.usersToShow && topUsersCount > leaderboard.usersToShow) ?
            this.rankService.getLeaderBoardRanks(leaderboard.id, topUsersCount) :
            this.rankService.getLeaderBoardRanks(leaderboard.id);
        })
      ).subscribe((ranksArr) => {
        if (ranksArr) {
          this.leaderboardRanks = ranksArr as UserRanking[];
        }
      });

      combineLatest(this.profileService.whoAmI(),
        this.leaderboard$,
        this.translate.get('LEADER_BOARD.NO_RANK')
      ).pipe(
        concatMap(([profile, leaderboard, undefinedRankText]) => {
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
              rank: 0 || undefinedRankText,
              value: 0
            };
            this.undefinedRankText = undefinedRankText;
            return this.rankService.getLeaderBoardUserRank(leaderboard.id)
              .pipe(
                catchError(_ => of(defaultMiniRank))
              );
          }
          return of(undefined);
        })
      ).subscribe((miniRank: UserRanking | undefined) => {
        if (miniRank) {
          if (miniRank.rank && this.leaderBoardSettings?.podiums?.length > 0) {
            for (const podium of this.leaderBoardSettings.podiums) {
              if (miniRank.rank >= podium.positionStart && miniRank.rank <= podium.positionEnd) {
                miniRank.rank = podium.displayProperties?.rankName ?
                                `${miniRank.rank} - ${podium.displayProperties.rankName}` : miniRank.rank;
                break;
              }
            }
          } else {
            miniRank.rank = miniRank.rank ? miniRank.rank : this.undefinedRankText;
          }
          this.userRankData = miniRank;
        }
      });
    }
  }
}
