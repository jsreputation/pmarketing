import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IVoucherService } from '../../vouchers/ivoucher.service';
import { Observable } from 'rxjs';
import { IVoucher } from '../../vouchers/models/voucher.model';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'perx-core-voucher-detail-page',
  templateUrl: './voucher-detail-page.component.html',
  styleUrls: ['./voucher-detail-page.component.scss']
})
export class VoucherDetailPageComponent implements OnInit {
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private vouchersService: IVoucherService
  ) { }

  public voucher$: Observable<IVoucher>;

  public ngOnInit(): void {
    this.voucher$ = this.activeRoute.paramMap
      .pipe(
        filter((params: ParamMap) => params.has('id')),
        switchMap((params: ParamMap) => {
          const id: string = params.get('id');
          const idN: number = Number.parseInt(id, 10);
          return this.vouchersService.get(idN);
        })
      );
  }

  public onRedeem(): void {
    this.voucher$.subscribe((v: IVoucher) => {
      this.router.navigate(['redeem', v.id]);
    });
  }
}
