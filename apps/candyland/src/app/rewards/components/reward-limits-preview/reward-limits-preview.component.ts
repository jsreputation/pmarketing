import {Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'cl-reward-limits-preview',
  templateUrl: './reward-limits-preview.component.html',
  styleUrls: ['./reward-limits-preview.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RewardLimitsPreviewComponent  {
  @Input() public data: any;

}
