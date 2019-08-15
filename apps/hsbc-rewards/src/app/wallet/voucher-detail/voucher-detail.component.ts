import { Component, OnInit } from '@angular/core';
import { VouchersService } from '@perx/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, catchError } from 'rxjs/operators';
import { voucher } from 'src/assets/mock/vouchers';
import { of } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-voucher-detail',
  templateUrl: './voucher-detail.component.html',
  styleUrls: ['./voucher-detail.component.scss']
})
export class VoucherDetailComponent implements OnInit {
  voucher;

  constructor(
    private voucherServe: VouchersService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.voucher = this.route.params.pipe(switchMap((param) => {
      return this.voucherServe.get(param.id);
    })).pipe(catchError(() => {
      return of(voucher[0]);
    }))
  }

  reedEm() {
    this.location.back();
  }
}
