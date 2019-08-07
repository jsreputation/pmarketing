import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IData } from '@perx/chart';
import { BASE_TYPE } from '@perx/chart';

@Component({
  selector: 'app-advanced-pie',
  templateUrl: './advanced-pie.component.html',
  styleUrls: ['./advanced-pie.component.scss']
})
export class AdvancedPieComponent {
  public view: number[] = [1000, 400];

  public singleData: Observable<IData> = of({
    columns: ['age', 'count'],
    cols: [
      { name: 'age', display_name: 'Age', base_type: BASE_TYPE.text, source: 'native' },
      { name: 'count', display_name: 'Count', base_type: BASE_TYPE.integer, source: 'native' }
    ],
    rows: [
      ['18-', 178],
      ['18-24', 1378],
      ['25-34', 3960],
      ['35-44', 2722],
      ['45-54', 991],
      ['56-64', 376],
      ['65+', 168],
      ['Unknown', 1730]
    ],
    insights: null
  });
}
