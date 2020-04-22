import { Component, Input, OnInit } from '@angular/core';
import { IRanker } from '../models/rank.model';

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
  public columnsToDisplay: ['rank', 'nickname', 'value'] = ['rank', 'nickname', 'value'];
  @Input() public dataArray: IRanker[] = [
    {rank: 1, nickname: 'john', value: 1},
    {rank: 2, nickname: 'oliver', value: 1},
    {rank: 3, nickname: 'jimmy', value: 1},
    {rank: 4, nickname: 'kimmel', value: 1},
    {rank: 5, nickname: 'fallon', value: 1},
    {rank: 6, nickname: 'craig', value: 1},
    {rank: 7, nickname: 'ferguson', value: 1},
    {rank: 8, nickname: 'graham', value: 1},
    {rank: 9, nickname: 'norton', value: 1},
    {rank: 10, nickname: 'ellen', value: 1},
  ];
  @Input() public dataNumberToDisplay: number = 10;

  public ngOnInit(): void {
    if (this.dataArray.length > this.dataNumberToDisplay) {
      this.dataArray = this.dataArray.slice(0, this.dataNumberToDisplay);
    }
  }
}
