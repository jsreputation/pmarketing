import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

export interface IStatisticCardConfig {
  cardTitle: Observable<string>;
  statistics: IStatistic[];
}

interface IStatistic {
  statisticTitle: Observable<string>;
  value: Observable<number> | Observable<string>;
  unit?: Observable<string>;
  unitBeforeValue?: boolean;
}

@Component({
  selector: 'perx-statistic-card',
  templateUrl: './statistic-card.component.html',
  styleUrls: ['./statistic-card.component.scss']
})
export class StatisticCardComponent {
  @Input() public data: IStatisticCardConfig;
}
