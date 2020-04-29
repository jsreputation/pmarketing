import { Component, Input, OnInit } from '@angular/core';
import { UserRanking } from '../models/rank.model';

@Component({
  selector: 'perx-core-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  @Input() public rank1to3Images: [string, string, string] =  [
    'https://cdn.perxtech.io/content/hsbc-hk/images/firstplace.png',
    'https://cdn.perxtech.io/content/hsbc-hk/images/secondplace.png',
    'https://cdn.perxtech.io/content/hsbc-hk/images/thirdplace.png'
  ];
  @Input() public metric: string = 'score';
  public columnsToDisplay: ['rank', 'displayName', 'value'] = ['rank', 'displayName', 'value'];
  @Input() public dataArray: UserRanking[] = [
    {id: 1, rank: 1, displayName: 'john', value: 1},
    {id: 1, rank: 2, displayName: 'oliver', value: 1},
    {id: 1, rank: 3, displayName: 'jimmy', value: 1},
    {id: 1, rank: 4, displayName: 'kimmel', value: 1},
    {id: 1, rank: 5, displayName: 'fallon', value: 1},
    {id: 1, rank: 6, displayName: 'craig', value: 1},
    {id: 1, rank: 7, displayName: 'ferguson', value: 1},
    {id: 1, rank: 8, displayName: 'graham', value: 1},
    {id: 1, rank: 9, displayName: 'norton', value: 1},
    {id: 1, rank: 10, displayName: 'ellen', value: 1},
  ];
  @Input() public dataNumberToDisplay: number = 10;

  public ngOnInit(): void {
    if (this.dataArray.length > this.dataNumberToDisplay) {
      this.dataArray = this.dataArray.slice(0, this.dataNumberToDisplay);
    }
  }
}
