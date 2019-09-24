import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService, IVoucherService, Voucher, VoucherState } from '@perx/core';
import { flatMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QRCodeComponent implements OnInit {
  public voucherId: number;
  public voucherState: VoucherState;
  public code: string;
  constructor(
    private route: ActivatedRoute,
    private notification: NotificationService,
    private vouchersService: IVoucherService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.route.params.pipe(flatMap((param) => this.vouchersService.get(parseInt(param.id, 10))),
      tap((voucher: Voucher) => {
        this.voucherId = voucher.id;
        this.voucherState = voucher.state;
        this.code = voucher.code;
      }),
      flatMap(() => this.vouchersService.stateChangedForVoucher(this.voucherId))).subscribe((val) =>
        this.successRedeemed(val)
        , (msg) =>
          this.notification.addSnack(msg));
  }

  public successRedeemed(voucher: Voucher): void {
    if (voucher.state === VoucherState.redeemed && this.voucherState === VoucherState.issued) {
      this.notification.addPopup({ title: 'Congratulations' });
    }
  }

  public goToHome(): void {
    this.router.navigate(['home']);
  }
}
