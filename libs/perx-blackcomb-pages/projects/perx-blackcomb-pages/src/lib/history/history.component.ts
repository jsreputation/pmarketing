import { Component, OnInit } from '@angular/core';
import { Voucher, IVoucherService, VoucherState } from '@perx/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'perx-blackcomb-pages-history',
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
