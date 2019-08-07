import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'cl-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent {
  @Input() public current: number;
  @Input() public total: number;

  public get progress(): number {
    return this.current / this.total * 100;
  }
}
