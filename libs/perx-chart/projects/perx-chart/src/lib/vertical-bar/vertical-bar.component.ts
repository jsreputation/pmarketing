import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { IData } from '../data.model';

@Component({
  selector: 'pc-vertical-bar',
  templateUrl: './vertical-bar.component.html',
  styleUrls: ['./vertical-bar.component.scss']
})
export class VerticalBarComponent implements OnChanges {
  @Input()
  public data: Observable<IData>;

  public ngxChartData: any[];
  public single: boolean = true;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
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

          const series = row.slice(1).map((v: any, i: number) => {
            return {
              name: data.cols[i + 1].display_name,
              value: v,
              extra: {
                code: data.columns[i + 1]
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
}
