import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { takeUntil, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { VouchersService, VoucherState } from '@perx/core';
import { NotificationWrapperService } from 'src/app/services/notification-wrapper.service';
import { IVoucher } from '@perx/core/projects/perx-core/src/lib/vouchers/models/voucher.model';

@Component({
  selector: 'hkbn-qr-redemption',
  templateUrl: './qr-redemption.component.html',
  styleUrls: ['./qr-redemption.component.scss']
})
export class QrRedemptionComponent implements OnInit {

  public voucherId: number;
  public status: VoucherState;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private voucherService: VouchersService,
    private notificationWrapperService: NotificationWrapperService
  ) {
  }

  public ngOnInit(): void {
    this.route.paramMap
      .pipe(
        takeUntil(this.destroy$),
        switchMap((params: ParamMap) => {
          this.voucherId = parseInt(params.get('id'), 10);
          return this.voucherService.stateChangedForVoucher(this.voucherId);
        })
      )
      .subscribe((voucher: IVoucher) => {
        if (voucher.state === VoucherState.issued) {
          this.status = voucher.state;
        }
        if (this.status === VoucherState.issued && voucher.state === VoucherState.redeemed) {
          this.notificationWrapperService.addPopup({
            title: 'Success',
            buttonTxt: 'Wallet'
          });
          this.router.navigate(['/wallet']);
        }
      });
  }

  public cancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
