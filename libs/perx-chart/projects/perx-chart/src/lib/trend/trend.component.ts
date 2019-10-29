import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { IData } from '../data.model';

interface TrendChartData {
  reward_name: string | number;
  revenue: string | number;
  chart_data: {
    series: {
      extra: {
        code: string
      };
      name: string;
      value: number;
    }[];
    name: string | number;
  }[];
}

@Component({
  selector: 'pc-trend',
  templateUrl: './trend.component.html',
  styleUrls: ['./trend.component.scss']
})
export class TrendComponent implements OnChanges {
  @Input()
  public data: Observable<IData>;

  @Input()
  public view: number[];

  public ngxChartData: TrendChartData[];
  public displayedColumns: string[] = ['Rewards name', 'Revenue', 'Trend past 12 month'];

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.data.subscribe((data: IData) => {
        this.ngxChartData = data.rows.map((row: (string | number)[]) => {
          const series = row.slice(2).map((v: number, i: number) => ({
            name: data.cols[i + 2].display_name,
            value: v,
            extra: {
              code: data.cols[i].name
            }
          }));
          return {
            reward_name: row[0],
            revenue: row[1],
            chart_data: [{
              name: row[0],
              series
            }]
          };
        });
      });
    }
  }
}
