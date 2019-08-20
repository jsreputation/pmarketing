import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CardType } from '@perx/chart';
import { Observable, of } from 'rxjs';
import { BaseType } from '../../../../../../../libs/perx-chart/dist/perx-chart';

@Component({
  selector: 'cl-chart-card',
  templateUrl: './chart-card.component.html',
  styleUrls: ['./chart-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChartCardComponent {
  @Input() public id: number;
  @Input() public cardType: CardType;
  @Input() public params: { [key: string]: string };
  // 310 650
  public singleData: Observable<any> = of({
    columns: ['age', 'count'],
    cols: [
      { name: 'age', display_name: 'Age', base_type: BaseType.text, source: 'native' },
      { name: 'count', display_name: 'Count', base_type: BaseType.integer, source: 'native' }
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
  constructor() {
    this.params = {
      start_date: '2019-07-01',
      end_date: '2019-08-31'
    };
  }
}
