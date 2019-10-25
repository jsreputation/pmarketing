import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { IData, ChartData } from '../data.model';

@Component({
  selector: 'pc-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnChanges {
  @Input()
  public data: Observable<IData>;

  public ngxChartData: ChartData[];

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.data.subscribe((data: IData) => {
        this.ngxChartData = data.rows.map((row: (string | number)[]) => ({
          name: row[0],
          value: row[1]
        }));
      });
    }
  }
}
