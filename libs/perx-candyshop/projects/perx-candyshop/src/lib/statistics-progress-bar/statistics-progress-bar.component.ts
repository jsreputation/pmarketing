import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'cs-statistics-progress-bar',
  templateUrl: './statistics-progress-bar.component.html',
  styleUrls: ['./statistics-progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsProgressBarComponent {
  @Input() public itemName: string = 'items';
  @Input() public options: { type: string, value: number }[];

  public get total(): number {
    const reducer = (accumulator, item) => accumulator + item.value;
    return this.options.reduce(reducer, 0);
  }

  public getPercent(value: number): number {
    return value / this.total * 100;
  }
}
