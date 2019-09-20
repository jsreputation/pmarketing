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
  public voucher: Voucher;
  constructor(
    private route: ActivatedRoute,
    private notification: NotificationService,
    private vouchersService: IVoucherService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.route.params.pipe(flatMap((param) => this.vouchersService.get(+param.id)),
      tap((voucher) => this.voucher = voucher),
      flatMap(() => this.vouchersService.stateChangedForVoucher(this.voucher.id))).subscribe((val) =>
        this.successRedeemed(val)
        , (msg) =>
          this.notification.addSnack(msg));
  }

  public successRedeemed(voucher: Voucher): void {
    if (voucher.state === VoucherState.redeemed && this.voucher.state === VoucherState.issued) {
      this.notification.addPopup({ title: 'Congratulations' });
    }
  }

  public goToHome(): void {
    this.router.navigate(['home']);
  }
}
