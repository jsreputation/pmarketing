import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IVoucher } from '@perxtech/core/projects/perx-core/src/lib/vouchers/models/voucher.model';
import { Observable } from 'rxjs';
import { Voucher, IVoucherService, VoucherState } from '@perxtech/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'hkbn-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WalletComponent implements OnInit {
  public issuedVouchers: Observable<Voucher[]>;

  public redeemedVouchers: Observable<Voucher[]>;

  constructor(private router: Router, private vouchersService: IVoucherService) {
  }

  public ngOnInit(): void {
    const feed = this.vouchersService.getAll();
    this.issuedVouchers = feed
      .pipe(
        map((vouchs: Voucher[]) => vouchs.filter(voucher => voucher.state === VoucherState.issued))
      );

    this.redeemedVouchers = feed
      .pipe(
        map((vouchs: Voucher[]) => vouchs.filter(voucher => voucher.state !== VoucherState.issued))
      );
  }

  public onRoute(voucher: IVoucher): void {
    this.router.navigate([`/wallet/${voucher.id}`]);
  }

  public onRedeemedRoute(voucher: IVoucher): void {
    this.router.navigate([`/reward/${voucher.id}`]);
  }
}
