import { Component, Input } from '@angular/core';

@Component({
  selector: 'perx-core-mini-rank',
  templateUrl: './mini-rank.component.html',
  styleUrls: ['./mini-rank.component.scss']
})
export class MiniRankComponent {

  @Input()
  public userGameInfo: {
    rank;
    name;
    value;
  } = {
    rank: 12,
    name: 'test',
    value: 1000
  };
}
