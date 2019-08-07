import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { IData } from '../data.model';

@Component({
  selector: 'pc-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent implements OnChanges {
  @Input()
  public data: Observable<IData>;

  @Input()
  public view: number[];

  public ngxChartData: any[];

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.data.subscribe((data: IData) => {
        this.ngxChartData = data.rows.map((row: any[]) => {
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
