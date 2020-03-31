import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IVoucherService, RedemptionType, Voucher } from '@perxtech/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'hkbn-voucher-details',
  templateUrl: './voucher-details.component.html',
  styleUrls: ['./voucher-details.component.scss']
})
export class VoucherDetailsComponent implements OnInit, OnDestroy {

  public voucherId: number;
  public redeemLabelFn: () => string;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private vouchersService: IVoucherService,
    private translate: TranslateService
  ) {
  }

  public ngOnInit(): void {
    this.translate.get('REDEEM_NOW').subscribe((redeem) => this.redeemLabelFn = () => redeem);
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
    this.vouchersService.get(id).subscribe((voucher: Voucher) => {
      let url = `/wallet/${id}`;
      if (voucher.redemptionType === RedemptionType.qr) {
        url = `${url}/qrcode`;
      } else {
        url = `${url}/code`;
      }
      this.router.navigate([url]);
    });
  }

}
