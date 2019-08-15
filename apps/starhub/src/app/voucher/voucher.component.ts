import { Component } from '@angular/core';
import { Voucher, ILocation } from '@perx/core';
import { vouchers } from '../vouchers.mock';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent {
  public voucher: Voucher;
  public howToUse: string | undefined;
  public locations: ILocation[];

  constructor() {
    this.voucher = vouchers[0];
    this.howToUse = this.voucher.description[0].content;
  }
}
