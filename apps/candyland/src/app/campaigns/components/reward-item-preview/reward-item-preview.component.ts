import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'cl-reward-item-preview',
  templateUrl: './reward-item-preview.component.html',
  styleUrls: ['./reward-item-preview.component.scss',
    '../reward-item/reward-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RewardItemPreviewComponent implements OnInit {
  @Input() public data;
  @Input() public propability;

  constructor() {
  }

  ngOnInit() {
  }

}
