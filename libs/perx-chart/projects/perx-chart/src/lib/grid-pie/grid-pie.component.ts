import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { IData } from '../data.model';

@Component({
  selector: 'pc-grid-pie',
  templateUrl: './grid-pie.component.html',
  styleUrls: ['./grid-pie.component.scss']
})
export class GridPieComponent implements OnChanges {
  @Input()
  public data: Observable<IData>;

  @Input()
  public view: number[];

  public ngxChartData: any[];

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.data.subscribe((data: IData) => {
        this.ngxChartData = data.rows.map((row: any[]) => {
          return {
            name: row[0],
            value: row[1]
          };
        });
      });
    }
  }
}
