import { Observable, of } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { UserRanking } from '../models/rank.model';

@Component({
  selector: 'perx-core-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  @Input() public rank1to3Images: [string, string, string] = [
    'https://cdn.perxtech.io/content/hsbc-hk/images/firstplace.png',
    'https://cdn.perxtech.io/content/hsbc-hk/images/secondplace.png',
    'https://cdn.perxtech.io/content/hsbc-hk/images/thirdplace.png'
  ];
  @Input()
  public metric: string = 'score';
  public columnsToDisplay: ['rank', 'displayName', 'value'] = ['rank', 'displayName', 'value'];
  @Input() public dataArray: UserRanking[];
  @Input()
  public nickNameTxtFn: () => Observable<string>
  // @Input() public dataNumberToDisplay: number = 10;

  public ngOnInit(): void {
    // if (this.dataArray.length > this.dataNumberToDisplay) {
    //   this.dataArray = this.dataArray.slice(0, this.dataNumberToDisplay);
    // }
    if (!this.nickNameTxtFn) {
      this.nickNameTxtFn = () => of('NICKNAME');
    }
  }
}
