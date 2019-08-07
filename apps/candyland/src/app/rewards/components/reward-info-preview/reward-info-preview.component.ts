import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'cl-reward-info-preview',
  templateUrl: './reward-info-preview.component.html',
  styleUrls: ['./reward-info-preview.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RewardInfoPreviewComponent implements OnInit {
  @Input() public data: any;

  constructor() {
  }

  

}
