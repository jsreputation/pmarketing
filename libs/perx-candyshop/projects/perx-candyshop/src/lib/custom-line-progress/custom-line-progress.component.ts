import { Component, Input } from '@angular/core';

@Component({
  selector: 'cs-custom-line-progress',
  templateUrl: './custom-line-progress.component.html',
  styleUrls: ['./custom-line-progress.component.scss']
})
export class CustomLineProgressComponent {
  @Input() public amount: number;
  @Input() public total: number;
  @Input() public vertical: boolean = false;

  public calcSize(): string | null {
    if (!this.amount || !this.total) {
      return null;
    }
    const percent = this.amount * 100 / this.total;
    return `${percent}%`;
  }

}
