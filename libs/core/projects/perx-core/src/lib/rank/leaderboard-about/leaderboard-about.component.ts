import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest } from 'rxjs';
import { LeaderBoard } from '../models/rank.model';

@Component({
  selector: 'perx-core-leaderboard-about',
  templateUrl: './leaderboard-about.component.html',
  styleUrls: ['./leaderboard-about.component.scss']
})
export class LeaderboardAboutComponent implements OnInit {
  @Input() public data: LeaderBoard;

  constructor(private translateService: TranslateService) { }
  public prizesTxt: string;
  public rankTxt: string;
  public tncTitle: string;

  public ngOnInit(): void {
    combineLatest([
      this.translateService.get('LEADER_BOARD.PRIZES'),
      this.translateService.get('LEADER_BOARD.RANK'),
      this.translateService.get('LEADER_BOARD.TERMS_AND_CONDITIONS')])
      .subscribe(
        ([prizes, rank, tncTitle]) => {
          this.prizesTxt = prizes;
          this.rankTxt = rank;
          this.tncTitle = tncTitle;
        }
      );
  }

  public getRankName(name: string, index: number): string {
    return name ? `${name} ${this.prizesTxt}:` : `${this.rankTxt} ${index + 1} ${this.prizesTxt}:`;
  }
}
