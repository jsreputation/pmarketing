import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { takeUntil, flatMap } from 'rxjs/operators';
import { VouchersService, VoucherState } from '@perx/core';
import { IVoucher } from '@perx/core/projects/perx-core/src/lib/vouchers/models/voucher.model';
import { NotificationWrapperService } from 'src/app/services/notification-wrapper.service';

@Component({
  selector: 'hkbn-code-redemption',
  templateUrl: './code-redemption.component.html',
  styleUrls: ['./code-redemption.component.scss']
})
export class CodeRedemptionComponent implements OnInit {
  private previousStatus: VoucherState;
  public voucherId: number;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private vouchersService: VouchersService,
    private notificationWrapperService: NotificationWrapperService,
    private router: Router
  ) {
  }

  public ngOnInit(): void {
    this.route.paramMap
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
        if (this.previousStatus === VoucherState.issued && voucher.state === VoucherState.redeemed ) {
          this.notificationWrapperService.addPopup({
            title: 'Success',
            buttonTxt: 'Wallet'
          });
          this.router.navigate(['/wallet']);
        }
      });
  }

  public redeem(): void {
    this.vouchersService.redeemVoucher(this.voucherId).subscribe(() => {
    });
  }
}
