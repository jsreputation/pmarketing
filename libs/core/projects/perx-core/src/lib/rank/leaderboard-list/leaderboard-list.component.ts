import { Component, Input } from '@angular/core';
import { LeaderBoard } from '../models/rank.model';

@Component({
  selector: 'perx-core-leaderboard-list',
  templateUrl: './leaderboard-list.component.html',
  styleUrls: ['./leaderboard-list.component.scss']
})
export class LeaderboardListComponent {

  @Input() public leaderboards: LeaderBoard[];
  public ghostTimeOut: boolean;

  constructor() { }

  public onClick(voucher: LeaderBoard): void {
    console.log(voucher, 'was clicked');
  }
}
