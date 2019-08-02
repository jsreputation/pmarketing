import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IData } from '../data.model';

@Component({
  selector: 'pc-grid-pie',
  templateUrl: './grid-pie.component.html',
  styleUrls: ['./grid-pie.component.scss']
})
export class GridPieComponent {
  @Input()
  public data: Observable<IData>;
}
