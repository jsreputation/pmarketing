import { Component, Input } from '@angular/core';

@Component({
  selector: 'perx-blackcomb-pages-circular-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent {
  @Input() public campaignProgress: Number;
}
