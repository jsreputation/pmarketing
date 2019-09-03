import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { IData, ChartData } from '../data.model';

@Component({
  selector: 'pc-horizontal-bar',
  templateUrl: './horizontal-bar.component.html',
  styleUrls: ['./horizontal-bar.component.scss']
})
export class HorizontalBarComponent implements OnChanges {
  @Input()
  public data: Observable<IData>;

  public ngxChartData: ChartData[];
  public single: boolean = true;

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes.data) {
      return;
    }
    this.ngxChartData = [];
    if (this.data === undefined || this.data === null) {
      return;
    }
    this.data.subscribe((data: IData) => {
      // data format and chart type is different depending on the number of values to display per row
      this.single = data.cols.length === 2;
      this.ngxChartData = data.rows.map((row: any[]) => {
        if (this.single) {
          return {
            name: row[0],
            value: row[1]
          };
        }

        const series = row.slice(1).map((v: number, i: number) => {
          return {
            name: data.cols[i + 1].display_name,
            value: v,
            extra: {
              code: data.cols[i + 1].name
            }
          };
        });

        return {
          name: row[0],
          series
        };
      });
    });
  }
}
