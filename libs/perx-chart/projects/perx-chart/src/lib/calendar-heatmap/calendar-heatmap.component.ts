import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { ChartData, IData } from '../data.model';

@Component({
  selector: 'pc-calendar-heatmap',
  templateUrl: './calendar-heatmap.component.html',
  styleUrls: ['./calendar-heatmap.component.scss']
})
export class CalendarHeatmapComponent implements OnChanges {
  @Input()
  public data: Observable<IData>;

  @Input()
  public view: number[];

  public ngxChartData: ChartData[];

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.data.subscribe((data: IData) => {
        this.ngxChartData = data.rows.map((row: (string | number)[]) => {
          return {
            name: row[0],
            series: [{
              name: row[1],
              value: row[2]
            }]
          };
        });
      });
    }
  }
}
