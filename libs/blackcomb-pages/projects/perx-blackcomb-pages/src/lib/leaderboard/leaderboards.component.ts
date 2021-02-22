import { Component } from '@angular/core';
import {
  IRankService,
  LeaderBoard
} from '@perxtech/core';

@Component({
  selector: 'perx-blackcomb-pages-leaderboards',
  templateUrl: './leaderboards.component.html',
  styleUrls: ['./leaderboards.component.scss']
})


export class LeaderboardsComponent {

  public leaderboards: LeaderBoard[];
  public repeatGhostCount: number = 10;
  public ghostTimeOut: boolean;

  public constructor(
    private rankService: IRankService) {
    this.rankService.getLeaderBoards().subscribe((leaderboards) => this.leaderboards = leaderboards);
  }

}
