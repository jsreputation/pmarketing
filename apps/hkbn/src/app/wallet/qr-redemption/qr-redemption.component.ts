import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { takeUntil, switchMap } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { IVoucherService, VoucherState, Voucher } from '@perxtech/core';
import { NotificationWrapperService } from 'src/app/services/notification-wrapper.service';
import { Location } from '@angular/common';

@Component({
  selector: 'hkbn-qr-redemption',
  templateUrl: './qr-redemption.component.html',
  styleUrls: ['./qr-redemption.component.scss']
})
export class QrRedemptionComponent implements OnInit, OnDestroy {

  public voucherId: number;
  public status: VoucherState;
  private destroy$: Subject<void> = new Subject<void>();
  private subscriptionVoucher: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private voucherService: IVoucherService,
    private notificationWrapperService: NotificationWrapperService,
    private location: Location
  ) {
  }

  public ngOnInit(): void {
    this.subscriptionVoucher = this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          this.voucherId = parseInt(params.get('id'), 10);
          return this.voucherService.stateChangedForVoucher(this.voucherId);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe((voucher: Voucher) => {
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
  public ngOnDestroy(): void {
    this.subscriptionVoucher.unsubscribe();
  }
  public cancel(): void {
    this.location.back();
  }

}
