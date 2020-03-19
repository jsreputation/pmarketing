import { Component, OnInit } from '@angular/core';
import {
  Observable,
  of
} from 'rxjs';
import { Voucher, IVoucherService, StatusLabelMapping } from '@perxtech/core';
import { mock } from '../mock';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public data: Observable<Voucher[]>;

  public mapping: StatusLabelMapping = {
    issued: 'Approved',
    redeemed: 'Redeemed',
    expired: 'Expired',
    reserved: 'Pending',
    released: 'Declined',
  };

  constructor(private vouchersService: IVoucherService) { }

  public ngOnInit(): void {
    this.vouchersService.getAll().subscribe(
      (vouchers) => this.data = of(vouchers),
      () => this.data = of(mock)
    );
  }
}
