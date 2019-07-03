import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VouchersService } from '@perx/core/dist/perx-core';
import { IVoucher } from '@perx/core/dist/perx-core/lib/vouchers/models/voucher.model';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent implements OnInit {
  firstTime = false;
  id: number;
  redeeming = false;
  voucher: IVoucher;
  btnTxt = 'Redeem now';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private voucherService: VouchersService,
  ) { }

  ngOnInit() {
    this.firstTime = this.route.snapshot.paramMap.get('win') === 'true';
    this.id = this.route.snapshot.params.id;
    this.voucherService.get(this.id)
      .subscribe(voucher => {
        this.voucher = voucher;
        if (voucher.state !== 'issued') {
          this.btnTxt = 'VIEW eGIFT code';
        }
      });
  }

  onRedeem() {
    if (this.voucher.state === 'redeemed') {
      this.router.navigate([`/redemption/${this.id}`]);
    } else {
      this.redeeming = true;
      this.voucherService.redeemVoucher(this.id)
        .subscribe(
          () => {
            this.router.navigate([`/redemption/${this.id}`]);
          },
          () => {
            this.router.navigate([`/redemption/${this.id}`]);
          }
        );
    }
  }
}
