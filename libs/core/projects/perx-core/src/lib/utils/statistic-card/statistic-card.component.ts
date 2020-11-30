import { Component, Input } from '@angular/core';

export interface IStatisticCardConfig {
  cardTitle: string;
  statistics: IStatistic[];
}

interface IStatistic {
  statisticTitle: string;
  value: number | string;
  unit?: string;
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
