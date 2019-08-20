import { Component } from '@angular/core';
import { CardType } from '@perx/chart';

@Component({
  selector: 'cl-chart-card',
  templateUrl: './chart-card.component.html',
  styleUrls: ['./chart-card.component.scss']
})
export class ChartCardComponent {
  public id: number;
  public cardType: CardType;
  public params: { [key: string]: string };

  constructor() {
    this.params = {
      start_date: '2019-07-01',
      end_date: '2019-08-31'
    };
  }
}
