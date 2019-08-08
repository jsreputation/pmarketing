import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IData } from '@perx/chart';
import { singleData } from '../mock';

@Component({
  selector: 'app-pie-grid',
  templateUrl: './pie-grid.component.html',
  styleUrls: ['./pie-grid.component.scss']
})
export class PieGridComponent {
  public view: number[] = [700, 400];

  public singleData: Observable<IData> = of(singleData);
}
