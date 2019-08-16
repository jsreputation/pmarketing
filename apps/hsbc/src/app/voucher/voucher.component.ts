import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VouchersService, Voucher } from '@perx/core';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent implements OnInit {
  public firstTime: boolean = false;
  public id: number;
  public redeeming: boolean = false;
  public voucher: Voucher;
  public btnTxt: string = 'Redeem now';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private voucherService: VouchersService,
  ) { }

  public ngOnInit(): void {
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

  public onRedeem(): void {
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
