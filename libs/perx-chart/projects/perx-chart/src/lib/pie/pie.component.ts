import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { IData } from '../data.model';

@Component({
  selector: 'pc-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnChanges {
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
