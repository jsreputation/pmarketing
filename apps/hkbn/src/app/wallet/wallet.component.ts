import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { IVoucher } from '../../../../../libs/perx-core/projects/perx-core/src/lib/vouchers/models/voucher.model';

@Component({
  selector: 'hkbn-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WalletComponent {
  constructor(private router: Router) {
  }

  public onRoute(voucher: IVoucher): void {
    this.router.navigate([`/wallet/${voucher.id}`]);
  }

  public onRedeemedRoute(voucher: IVoucher): void {
    this.router.navigate([`/reward/${voucher.id}`]);
  }
}
