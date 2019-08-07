import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'cl-reward-vouchers-preview',
  templateUrl: './reward-vouchers-preview.component.html',
  styleUrls: ['./reward-vouchers-preview.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RewardVouchersPreviewComponent {
  public DATE_FORMAT = 'dd MMM yyyy';
  @Input() public data: any;

}
