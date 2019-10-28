import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IVoucherService, Voucher, IConfig, ConfigService } from '@perx/core';

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
  public btnTxt: string = 'View';
  public sourceType: string;
  public expiryFn: () => string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private voucherService: IVoucherService,
    private configService: ConfigService
  ) { }

  public ngOnInit(): void {
    this.firstTime = this.route.snapshot.paramMap.get('win') === 'true';
    this.id = this.route.snapshot.params.id;
    this.expiryFn = () => 'd MMMM y';
    this.configService.readAppConfig().subscribe(
      (config: IConfig) => {
        this.sourceType = config.sourceType.toString();
        this.fetchVouchers(this.sourceType);
      }
    );
  }

  private fetchVouchers(srcType: string): void {
    this.voucherService.get(this.id, null, {sourceType: srcType, type: null})
      .subscribe(voucher => {
        this.voucher = voucher;
        if (voucher.state !== 'issued' && this.sourceType === 'hsbc-collect2') {
          this.btnTxt = 'VIEW EGIFT CODE';
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
