import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { IData } from '../data.model';

interface TableData {
  rewards_name: string | number;
  revenue: string | number;
  month1: string | number;
  month2: string | number;
  month3: string | number;
  month4: string | number;
  month5: string | number;
  month6: string | number;
  month7: string | number;
  month8: string | number;
  month9: string | number;
  month10: string | number;
  month11: string | number;
  month12: string | number;
}

@Component({
  selector: 'pc-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnChanges {
  @Input()
  public data: Observable<IData>;

  public displayedColumns: string[];
  public tableData: TableData[];

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.data.subscribe((data: IData) => {
        this.displayedColumns = data.columns;
        this.tableData = data.rows.map( (row: (string | number)[]) => {
          return {
            rewards_name: row[0],
            revenue: Math.round(+row[1]),
            month1: Math.round(+row[2]),
            month2: Math.round(+row[3]),
            month3: Math.round(+row[4]),
            month4: Math.round(+row[5]),
            month5: Math.round(+row[6]),
            month6: Math.round(+row[7]),
            month7: Math.round(+row[8]),
            month8: Math.round(+row[9]),
            month9: Math.round(+row[10]),
            month10: Math.round(+row[11]),
            month11: Math.round(+row[12]),
            month12: Math.round(+row[13]),
          };
        });
      });

    }
  }
}
