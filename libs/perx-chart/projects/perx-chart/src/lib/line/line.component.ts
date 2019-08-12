import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { IData, ChartData, BaseType } from '../data.model';

interface IDataCol {
  name: string;
  display_name: string;
  base_type: BaseType;
  source: string;
}

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

  public ngxChartData: ChartData[];

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.data.subscribe((data: IData) => {
        this.ngxChartData = data.cols.slice(1).map((col: IDataCol, i: number) => {
          const series = data.rows.map((row: any[]) => ({
            name: row[0],
            value: row[i + 1],
            extra: {
              code: data.columns[i + 1]
            }
          }));
          return {
            name: col.display_name,
            series
          };
        });
      });
    }
  }
}
