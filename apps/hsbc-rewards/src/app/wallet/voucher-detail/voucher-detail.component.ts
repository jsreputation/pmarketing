import { Component, OnInit } from '@angular/core';
import { StatusLabelMapping, IVoucherService } from '@perx/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, catchError } from 'rxjs/operators';
import { voucher } from 'src/assets/mock/vouchers';
import { of, Observable } from 'rxjs';
import { IVoucher } from '@perx/core/dist/perx-core/lib/vouchers/models/voucher.model';

@Component({
  selector: 'app-voucher-detail',
  templateUrl: './voucher-detail.component.html',
  styleUrls: ['./voucher-detail.component.scss']
})
export class VoucherDetailComponent implements OnInit {
  public voucher: Observable<IVoucher>;

  public mapping: StatusLabelMapping = {
    issued: 'Approved',
    redeemed: 'Redeemed',
    expired: 'Expired',
    reserved: 'Pending',
    released: 'Declined',
  };

  constructor(
    private voucherService: IVoucherService,
    private route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this.voucher = this.route.params.pipe(switchMap((param) => this.voucherService.get(param.id, undefined, {
      type: null,
      sourceType: 'hsbc-rewards'
    }))).pipe(catchError(() => of(voucher[0])));
  }
}
