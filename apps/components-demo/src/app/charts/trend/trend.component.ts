import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IData } from '@perx/chart';
import { data } from '../trend-mock';

@Component({
  selector: 'app-trend',
  templateUrl: './trend.component.html',
  styleUrls: ['./trend.component.scss']
})
export class TrendComponent  {

  public singleData: Observable<IData> = of(data);

  public view: number[] = [350, 150];
}
