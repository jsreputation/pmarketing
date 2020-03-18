import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CardType } from '@perxtech/chart';

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

  constructor() {
    this.params = {
      start_date: '2019-07-01',
      end_date: '2019-08-31'
    };
  }
}
