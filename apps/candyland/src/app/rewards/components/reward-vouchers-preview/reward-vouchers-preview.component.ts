import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'cl-reward-vouchers-preview',
  templateUrl: './reward-vouchers-preview.component.html',
  styleUrls: ['./reward-vouchers-preview.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RewardVouchersPreviewComponent implements OnInit {
  DATE_FORMAT = 'dd MMM yyyy';
  @Input() data: any;

  constructor() {
  }

  ngOnInit() {
    console.log('vouchers', this.data);
  }

}
