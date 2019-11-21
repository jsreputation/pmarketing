import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'cl-reward-item-preview',
  templateUrl: './reward-item-preview.component.html',
  styleUrls: ['./reward-item-preview.component.scss',
    '../reward-item/reward-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RewardItemPreviewComponent {
  @Input() public data: any;
  @Input() public probability: number;
  @Input() public limit: number;
  @Input() public enableProbability: boolean;
 }
