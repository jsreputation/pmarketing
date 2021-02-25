import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IRankService,
  LeaderBoard
} from '@perxtech/core';
import { iif } from 'rxjs';

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
    private rankService: IRankService,
    private route: ActivatedRoute) {
    // if we recieve the campaign ID (acessed from within campaign) filter leaderboards by campaign
    // if no ID recieved (accessed from home screen) fetch all leaderboards
    iif(() => this.route.snapshot.paramMap.has('id'),
      this.rankService.getLeaderBoardsByCampaignID(Number.parseInt(this.route.snapshot.paramMap.get('id') as string, 10)),
      this.rankService.getLeaderBoards(),
    ).subscribe((leaderboards) => this.leaderboards = leaderboards);
  }

}
