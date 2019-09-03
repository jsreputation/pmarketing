import { Component, OnInit } from '@angular/core';
import { Voucher, VouchersService, VoucherState } from '@perx/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  public vouchers$: Observable<Voucher[]>;

  constructor(private vouchersService: VouchersService) { }

  public ngOnInit(): void {
    this.vouchers$ = this.vouchersService.getAll()
      .pipe(map((vouchers: Voucher[]) => vouchers.filter((voucher: Voucher) => {
        return voucher.state !== VoucherState.issued;
      })));
  }
}
