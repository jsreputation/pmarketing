import { Component } from '@angular/core';
import { Voucher } from '@perx/core';
import { vouchers } from '../vouchers.mock';

@Component({
  selector: 'app-redemption',
  templateUrl: './redemption.component.html',
  styleUrls: ['./redemption.component.scss']
})
export class RedemptionComponent {
  public voucher: Voucher;
  constructor() {
    this.voucher = vouchers[0];
  }
}
