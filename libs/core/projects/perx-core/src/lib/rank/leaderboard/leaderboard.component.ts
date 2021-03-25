import { Observable, of } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { UserRanking } from '../models/rank.model';
import { TranslateService } from '@ngx-translate/core';

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
  public metric: string;
  public columnsToDisplay: ['rank', 'displayName', 'value'] = ['rank', 'displayName', 'value'];
  @Input() public dataArray: UserRanking[];
  @Input() public nickNameTxtFn: () => Observable<string>;

  constructor(private translate: TranslateService) { }

  public ngOnInit(): void {
    if (!this.nickNameTxtFn) {
      this.nickNameTxtFn = () => of('NICKNAME');
    }

    if (this.metric) {
      // use metric key to display relavant translation
      this.translate.get(`LEADER_BOARD.${this.metric.toUpperCase()}`).subscribe(metric => this.metric = metric);
    } else {
      this.translate.get('LEADER_BOARD.DEFAULT_METRIC_TITLE').subscribe(metric => this.metric = metric);
    }
  }
}
