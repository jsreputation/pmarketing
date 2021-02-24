import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { UserRanking } from '../models/rank.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'perx-core-mini-rank',
  templateUrl: './mini-rank.component.html',
  styleUrls: ['./mini-rank.component.scss']
})
export class MiniRankComponent implements OnInit {
  @Input()
  public metric: string;
  @Input()
  public userGameInfo: UserRanking;
  @Input()
  public rantTextFn: () => Observable<string>;
  @Input()
  public pointTextFn: () => Observable<string>;

  constructor(private translate: TranslateService) { }

  public ngOnInit(): void {
    if (!this.rantTextFn) {
      this.rantTextFn = () => this.translate.get('LEADER_BOARD.POSITION');
    }
    if (!this.pointTextFn) {
      this.pointTextFn = () => this.translate.get('LEADER_BOARD.POINT_UNIT');
    }
    if (!this.metric) {
      this.translate.get('LEADER_BOARD.POINT_TITLE').subscribe(metric => this.metric = metric);
    }
  }
}
