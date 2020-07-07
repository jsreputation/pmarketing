import { Observable, of } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { UserRanking } from '../models/rank.model';

@Component({
  selector: 'perx-core-mini-rank',
  templateUrl: './mini-rank.component.html',
  styleUrls: ['./mini-rank.component.scss']
})
export class MiniRankComponent implements OnInit {
  @Input()
  public metric: string = 'score';
  @Input()
  public userGameInfo: UserRanking;
  @Input()
  public rantTextFn: () => Observable<string>;
  @Input()
  public pointTextFn: () => Observable<string>;

  public ngOnInit(): void {
    if (!this.rantTextFn) {
      this.rantTextFn = () => of('Your Rank');
    }
    if (!this.pointTextFn) {
      this.pointTextFn = () => of(' points');
    }
  }
}
