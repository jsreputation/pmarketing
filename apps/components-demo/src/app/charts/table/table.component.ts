import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IData } from '@perxtech/chart';
import { data } from '../trend-mock';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  public data: Observable<IData> = of(data);
}
