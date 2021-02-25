import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'perx-core-leaderboard-about',
  templateUrl: './leaderboard-about.component.html',
  styleUrls: ['./leaderboard-about.component.scss']
})
export class LeaderboardAboutComponent implements OnInit {
  // @Input()
  // public metric: string;
  // @Input()
  // public userGameInfo: UserRanking;
  // @Input()
  // public rantTextFn: () => Observable<string>;
  // @Input()
  // public pointTextFn: () => Observable<string>;

  constructor() { }

  public ngOnInit(): void {
    // if (!this.rantTextFn) {
    //   this.rantTextFn = () => this.translate.get('LEADER_BOARD.POSITION');
    // }
    // if (!this.pointTextFn) {
    //   this.pointTextFn = () => this.translate.get('LEADER_BOARD.POINT_UNIT');
    // }
    // if (!this.metric) {
    //   this.translate.get('LEADER_BOARD.POINT_TITLE').subscribe(metric => this.metric = metric);
    // }
  }
}
