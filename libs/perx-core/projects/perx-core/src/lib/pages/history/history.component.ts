import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IVoucherService } from '../../vouchers/ivoucher.service';
import { VoucherState, IVoucher } from '../../vouchers/models/voucher.model';

@Component({
  selector: 'perx-core-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  public vouchers$: Observable<IVoucher[]>;
  public filter: string[];

  constructor(private vouchersService: IVoucherService) { }

  public ngOnInit(): void {
    this.vouchers$ = this.vouchersService.getAll();
    this.filter = [VoucherState.redeemed, VoucherState.expired];
  }
}
