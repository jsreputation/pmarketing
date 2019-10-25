import {
  Component,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';

import {
  flatMap,
  tap,
} from 'rxjs/operators';

import {
  NotificationService,
  IVoucherService,
  Voucher,
  VoucherState,
} from '@perx/core';

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
    , (err) => {
      if (err && err.error) {
        this.notification.addSnack(err.error.message);
      } else {
        this.notification.addSnack('Oops, something went wrong');
      }
    });
  }

  public successRedeemed(voucher: Voucher): void {
    if (voucher.state === VoucherState.redeemed && this.voucherState === VoucherState.issued) {
      this.notification.addPopup({
        title: 'Successfully Redeemed!',
        text: `You have redeemed ${voucher.reward.name}.`,
        buttonTxt: 'Back to rewards',
        imageUrl: 'assets/img/success_redeem.png',
      });
      this.router.navigate(['wallet']);
    }
  }

  public goToHome(): void {
    this.router.navigate(['home']);
  }
}
