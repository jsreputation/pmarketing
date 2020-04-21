import {Component, Input, OnInit} from '@angular/core';

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
  public columnsToDisplay: ['rank', 'name', 'value'] = ['rank', 'name', 'value'];
  @Input() public dataArray: any[] = [
    {rank: 1, name: 'john', value: 1},
    {rank: 2, name: 'oliver', value: 1},
    {rank: 3, name: 'jimmy', value: 1},
    {rank: 4, name: 'kimmel', value: 1},
    {rank: 5, name: 'fallon', value: 1},
    {rank: 6, name: 'craig', value: 1},
    {rank: 7, name: 'ferguson', value: 1},
    {rank: 8, name: 'graham', value: 1},
    {rank: 9, name: 'norton', value: 1},
    {rank: 10, name: 'ellen', value: 1},
  ];
  @Input() public dataNumberToDisplay: number = 10;

  public ngOnInit(): void {
    if (this.dataArray.length > this.dataNumberToDisplay) {
      this.dataArray = this.dataArray.slice(0, this.dataNumberToDisplay);
    }
  }
}
