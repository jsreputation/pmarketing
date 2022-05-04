import { Observable } from 'rxjs';
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
      this.nickNameTxtFn = () => this.translate.get('LEADER_BOARD.NICKNAME');
    }

    if (this.leaderboard && this.leaderboard?.displayProperties?.baseName) {
      // use metric key to display relavant translation
      this.metric = this.leaderboard.displayProperties.baseName;
    } else {
      this.translate.get('LEADER_BOARD.DEFAULT_METRIC_TITLE').subscribe(metric => this.metric = metric);
    }
    this.extractRankImages();
  }

  private extractRankImages(): void {
    if (this.leaderboard) {
      const podiums = this.leaderboard.podiums;

      podiums.map((podium) => {
        const imgUrl = podium.displayProperties && podium.displayProperties.rankIcon ?
        podium.displayProperties.rankIcon.value.imageUrl : '';
        if (podium.positionStart === podium.positionEnd) {
          this.rank1to3Images.push(imgUrl);
        } else {
          for (let i = podium.positionStart; i <= podium.positionEnd ; i++) {
            this.rank1to3Images.push(imgUrl);
          }
        }
      });
    }
  }
}
