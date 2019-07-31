import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'cl-vouchers-progress-bar',
  templateUrl: './vouchers-progress-bar.component.html',
  styleUrls: ['./vouchers-progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VouchersProgressBarComponent {
  @Input() options = [
    {type: 'available', value: 30000},
    {type: 'expired', value: 10000},
    {type: 'issued', value: 50000}
  ];

  public get total(): number {
    const reducer = (accumulator, item) => accumulator + item.value;
    return this.options.reduce(reducer, 0);
  }

  public getPercent(value: number): number {
    return value / this.total * 100;
  }
}
