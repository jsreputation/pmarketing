import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { IData } from '../data.model';

@Component({
  selector: 'pc-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnChanges {
  @Input()
  public data: Observable<IData>;

  public displayedColumns: string[];
  public tableData: {}[] = [];

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.data.subscribe((data: IData) => {
        this.displayedColumns = data.columns;
        data.rows.map((row: (string|number)[]) => {
          const tableElement = {};
          this.displayedColumns.map( (item: string|number, j: number) => {
            tableElement[item] = typeof (row[j]) === 'number' ? Math.round(+row[j]) : row[j];
          });
          this.tableData.push(tableElement);
        });
      });
    }
  }
}
