import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IData } from '@perx/chart';
import { BASE_TYPE } from '@perx/chart';

@Component({
  selector: 'app-horizontal-bar',
  templateUrl: './horizontal-bar.component.html',
  styleUrls: ['./horizontal-bar.component.scss']
})
export class HorizontalBarComponent {
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

  public multipleData: Observable<IData> = of({
    columns: ['age', '2010', '2011'],
    cols: [
      { name: 'age', display_name: 'Age', base_type: BASE_TYPE.text, source: 'native' },
      { name: '2010', display_name: '2010', base_type: BASE_TYPE.integer, source: 'native' },
      { name: '2011', display_name: '2011', base_type: BASE_TYPE.integer, source: 'native' }
    ],
    rows: [
      ['18-', 178, 80],
      ['18-24', 1378, 1000],
      ['25-34', 3960, 4000],
      ['35-44', 2722, 2000],
      ['45-54', 991, 600],
      ['56-64', 376, 1000],
      ['65+', 168, 168],
      ['Unknown', 1730, 250]
    ],
    insights: null
  });
}
