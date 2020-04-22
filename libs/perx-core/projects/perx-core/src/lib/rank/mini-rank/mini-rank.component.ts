import { Component, Input } from '@angular/core';
import { IRanker } from '../models/rank.model';

@Component({
  selector: 'perx-core-mini-rank',
  templateUrl: './mini-rank.component.html',
  styleUrls: ['./mini-rank.component.scss']
})
export class MiniRankComponent {

  @Input()
  public userGameInfo: IRanker = {
    rank: 12,
    nickname: 'test',
    value: 1000
  };
}
