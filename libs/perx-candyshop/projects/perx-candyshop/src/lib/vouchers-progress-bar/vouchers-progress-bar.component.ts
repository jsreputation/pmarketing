import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'cs-vouchers-progress-bar',
  templateUrl: './vouchers-progress-bar.component.html',
  styleUrls: ['./vouchers-progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VouchersProgressBarComponent {
  @Input() public options: { type: string, value: number }[];

  public get total(): number {
    const reducer = (accumulator, item) => accumulator + item.value;
    return this.options.reduce(reducer, 0);
  }

  public getPercent(value: number): number {
    return value / this.total * 100;
  }
}
