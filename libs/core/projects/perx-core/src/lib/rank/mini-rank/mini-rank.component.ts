import { Component, Input } from '@angular/core';
import { UserRanking } from '../models/rank.model';

@Component({
  selector: 'perx-core-mini-rank',
  templateUrl: './mini-rank.component.html',
  styleUrls: ['./mini-rank.component.scss']
})
export class MiniRankComponent {
  @Input()
  public metric: string = 'score';
  @Input()
  public userGameInfo: UserRanking;
}
