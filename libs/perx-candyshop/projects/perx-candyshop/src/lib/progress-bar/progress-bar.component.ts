import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'cs-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent {
  @Input() public current: number;
  @Input() public total: number;

  public get progress(): number {
    // TODO: delete when get total from API
    const total = this.total >= this.current ? this.total : this.current;
    return this.current / total * 100;
  }
}
