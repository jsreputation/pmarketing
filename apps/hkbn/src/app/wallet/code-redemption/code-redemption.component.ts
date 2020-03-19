import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { takeUntil, flatMap } from 'rxjs/operators';
import { IVoucherService, VoucherState } from '@perxtech/core';
import { IVoucher } from '@perxtech/core/projects/perx-core/src/lib/vouchers/models/voucher.model';
import { NotificationWrapperService } from 'src/app/services/notification-wrapper.service';
import { Location } from '@angular/common';

@Component({
  selector: 'hkbn-code-redemption',
  templateUrl: './code-redemption.component.html',
  styleUrls: ['./code-redemption.component.scss']
})
export class CodeRedemptionComponent implements OnInit, OnDestroy {
  public previousStatus: VoucherState;
  public voucherId: number;
  public subscriptionVoucher: Subscription;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private vouchersService: IVoucherService,
    private notificationWrapperService: NotificationWrapperService,
    private router: Router,
    private location: Location
  ) {
  }

  public ngOnInit(): void {
    this.subscriptionVoucher = this.route.paramMap
      .pipe(
        takeUntil(this.destroy$)
      )
      .pipe(flatMap((params: ParamMap) => {
        this.voucherId = parseInt(params.get('id'), 10);
        return this.vouchersService.stateChangedForVoucher(this.voucherId);
      })).subscribe((voucher: IVoucher) => {
        if (voucher.state === VoucherState.issued) {
          this.previousStatus = VoucherState.issued;
        }
        if (this.previousStatus === VoucherState.issued && voucher.state === VoucherState.redeemed) {
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
  public redeem(): void {
    this.location.back();
  }
}
