import { Component, Output, EventEmitter } from '@angular/core';
import { Voucher, VoucherState } from '@perx/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { vouchers } from '../../vouchers.mock';

@Component({
  selector: 'app-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrls: ['./vouchers.component.scss']
})
export class VouchersComponent {
  public vouchers: Observable<Voucher[]>;

  public redeemedVouchers: Observable<Voucher[]>;

  @Output()
  public tapped: EventEmitter<Voucher> = new EventEmitter();

  constructor(private router: Router) {
    this.vouchers = of(vouchers)
      .pipe(
        map((vouchs: Voucher[]) => vouchs.filter(voucher => voucher.state === VoucherState.issued))
      );
    this.redeemedVouchers = of(vouchers)
      .pipe(
        map((vouchs: Voucher[]) => vouchs.filter(voucher => voucher.state !== VoucherState.issued))
      );
  }

  public voucherSelected(voucher: Voucher): void {
    this.router.navigate(['/voucher'], { queryParams: { id: voucher.id } });
  }
}
