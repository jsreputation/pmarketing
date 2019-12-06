import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Voucher, IVoucherService, VoucherState, StatusLabelMapping } from '@perx/core';
import { Router } from '@angular/router';

@Component({
  selector: 'perx-blackcomb-pages-wallet-history',
  templateUrl: './wallet-history.component.html',
  styleUrls: ['./wallet-history.component.scss']
})
export class WalletHistoryComponent implements OnInit {
  public vouchers$: Observable<Voucher[]>;
  public walletFilter: string[];
  public historyFilter: string[];

  public mapping: StatusLabelMapping = {
    issued: 'Approved',
    redeemed: 'Redeemed',
    expired: 'Expired',
    reserved: 'Pending',
    released: 'Declined',
  };
  public paramId: string;

  constructor(
    private vouchersService: IVoucherService,
    private router: Router
  ) {
  }

  public ngOnInit(): void {
    this.walletFilter = [VoucherState.issued, VoucherState.reserved, VoucherState.released];
    this.historyFilter = [VoucherState.redeemed, VoucherState.expired];

    this.vouchers$ = this.vouchersService.getAll();
  }

  public voucherSelected(voucher: Voucher): void {
    this.router.navigate([`/voucher-detail/${voucher.id}`]);
  }
}
