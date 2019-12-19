import {
  Component,
  OnInit,
  Input,
} from '@angular/core';
import {
  Router,
} from '@angular/router';

import {
  NotificationService,
  IVoucherService,
  Voucher,
  VoucherState,
} from '@perx/core';
import { Observable, Subject } from 'rxjs';
import { IVoucher } from '@perx/core/dist/perx-core/lib/vouchers/models/voucher.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QRCodeComponent implements OnInit {
  @Input()
  public voucherId: number;
  @Input('voucher')
  public voucher$: Observable<IVoucher>;

  public voucherState: VoucherState;
  public code?: string;
  private redeemSubject: Subject<number> = new Subject();
  constructor(
    private notification: NotificationService,
    private vouchersService: IVoucherService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    if (!this.voucher$ && this.voucherId) {
      this.voucher$ = this.vouchersService.get(this.voucherId);
    }
    if (this.voucher$ && !this.voucherId) {
      this.voucher$.subscribe((voucher) => {
        this.voucherId = voucher.id;
        this.redeemSubject.next(this.voucherId);
      });
    } else if (this.voucherId) {
      this.redeemSubject.next(this.voucherId);
    }

    this.redeemSubject.pipe(
      switchMap((id) => this.vouchersService.stateChangedForVoucher(id)))
      .subscribe((val) => this.successRedeemed(val), (err) => {
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
        text: `You have redeemed ${voucher.reward ? voucher.reward.name : ''}.`,
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
