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
  public yourResultsText: Observable<string>;

  constructor(private translate: TranslateService) { }

  public ngOnInit(): void {
    this.yourResultsText = this.translate.get('LEADER_BOARD.YOUR_RESULTS');
    if (!this.rantTextFn) {
      this.rantTextFn = () => this.translate.get('LEADER_BOARD.POSITION');
    }

    if (this.metric) {
      // use metric key to display relavant translation
      this.translate.get(`LEADER_BOARD.${this.metric.toUpperCase()}`).subscribe(metric => this.metric = metric);
    } else {
      this.translate.get('LEADER_BOARD.DEFAULT_METRIC_TITLE').subscribe(metric => this.metric = metric);
    }
  }
}
