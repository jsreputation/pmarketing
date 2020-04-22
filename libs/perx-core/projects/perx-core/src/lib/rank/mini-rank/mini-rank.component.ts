import { Component, Input } from '@angular/core';

@Component({
  selector: 'perx-core-mini-rank',
  templateUrl: './mini-rank.component.html',
  styleUrls: ['./mini-rank.component.scss']
})
export class MiniRankComponent {

  @Input()
  public userGameInfo: {
    id: number;

    nickName: string;

    points: number;

    ranking: number;
  } = {
    id: 0,
    nickName: 'test-user',
    points: 2020,
    ranking: 1
  };
}
