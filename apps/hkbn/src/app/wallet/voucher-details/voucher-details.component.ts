import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VouchersService } from '@perx/core/dist/perx-core';
import { IVoucher } from '@perx/core/projects/perx-core/src/lib/vouchers/models/voucher.model';

@Component({
  selector: 'hkbn-voucher-details',
  templateUrl: './voucher-details.component.html',
  styleUrls: ['./voucher-details.component.scss']
})
export class VoucherDetailsComponent implements OnInit, OnDestroy {

  public voucherId: number;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private vouchersService: VouchersService
  ) {
  }

  public ngOnInit(): void {
    this.activeRoute.paramMap
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((params: ParamMap) => {
        this.voucherId = parseInt(params.get('id'), 10);
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onRedeem(id: number): void {
    this.vouchersService.get(id).subscribe((voucher: IVoucher) => {
      let url = `/wallet/${id}`;
      if (voucher.redemptionType === 'qrcode') {
        url = `${url}/qrcode`;
      } else {
        url = `${url}/code`;
      }
      this.router.navigate([url]);
    });
  }

}
