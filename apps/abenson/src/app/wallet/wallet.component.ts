import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StatusLabelMapping, Voucher, IVoucherService, VoucherState } from '@perx/core';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  public issuedVouchers: Observable<Voucher[]>;

  public redeemedVouchers: Observable<Voucher[]>;

  public mapping: StatusLabelMapping = {
    issued: 'Approved',
    redeemed: 'Redeemed',
    expired: 'Expired',
    reserved: 'Pending',
    released: 'Declined',
  };

  constructor(private vouchersService: IVoucherService) {}

  public ngOnInit(): void {
    const feed = this.vouchersService.getAll();
    this.issuedVouchers = feed
      .pipe(
        map((vouchers: Voucher[]) => vouchers.filter(voucher => voucher.state === VoucherState.issued))
      );

    this.redeemedVouchers = feed
      .pipe(
        map((vouchers: Voucher[]) => vouchers.filter(voucher => voucher.state !== VoucherState.issued))
      );
  }
}
