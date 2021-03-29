import { Observable, of } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { LeaderBoard, UserRanking } from '../models/rank.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'perx-core-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  @Input() public leaderboard: LeaderBoard;
  public columnsToDisplay: ['rank', 'displayName', 'value'] = ['rank', 'displayName', 'value'];
  @Input() public dataArray: UserRanking[];
  @Input() public nickNameTxtFn: () => Observable<string>;
  public metric: string;
  public rank1to3Images: string[] = [];

  constructor(private translate: TranslateService) { }

  public ngOnInit(): void {
    if (!this.nickNameTxtFn) {
      this.nickNameTxtFn = () => of('NICKNAME');
    }

    if (this.leaderboard && this.leaderboard.metric) {
      // use metric key to display relavant translation
      this.translate.get(`LEADER_BOARD.${this.leaderboard.metric.toUpperCase()}`).subscribe(metric => this.metric = metric);
    } else {
      this.translate.get('LEADER_BOARD.DEFAULT_METRIC_TITLE').subscribe(metric => this.metric = metric);
    }
    this.extractRankImages();
  }

  private extractRankImages(): void {
    if (this.leaderboard) {
      const podiums = this.leaderboard.podiums;
      this.rank1to3Images = podiums.map((podium) => podium.displayProperties && podium.displayProperties.rankIcon ?
        podium.displayProperties.rankIcon.value.imageUrl : '');
    }
  }
}
