import { Component, OnInit } from '@angular/core';
import { Voucher, IVoucherService, VoucherState } from '@perx/core';
import { Observable } from 'rxjs';

/**
 * @deprecated use libs/perx-blackcomb-pages/projects/perx-blackcomb-pages/src/lib/history/history.component.ts
 */
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  public vouchers$: Observable<Voucher[]>;
  public filter: string[];

  constructor(private vouchersService: IVoucherService) { }

  public ngOnInit(): void {
    this.vouchers$ = this.vouchersService.getAll();
    this.filter = [VoucherState.redeemed, VoucherState.expired];
  }
}
