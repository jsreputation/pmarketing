import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { IData, ChartData } from '../data.model';

@Component({
  selector: 'pc-grid-pie',
  templateUrl: './grid-pie.component.html',
  styleUrls: ['./grid-pie.component.scss']
})
export class GridPieComponent implements OnChanges {
  @Input()
  public data: Observable<IData>;

  public ngxChartData: ChartData[];

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes.data) {
      return;
    }
    this.ngxChartData = [];
    if (this.data === undefined || this.data === null) {
      return;
    }
    this.data.subscribe((data: IData) => {
      this.ngxChartData = data.rows.map((row: any[]) => ({
        name: row[0],
        value: row[1]
      }));
    });
  }
}
