import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'perx-blackcomb-pages-mini-rank',
  templateUrl: './mini-rank.component.html',
  styleUrls: ['./mini-rank.component.scss']
})
export class MiniRankComponent implements OnInit {

  @Input()
  public userGameInfo: {
    id;

    nickname;

    metric;

    quantity;
  };

  constructor() { }

  ngOnInit() {
  }

}
