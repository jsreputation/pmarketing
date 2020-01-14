import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IVoucherService, Voucher, IConfig, ConfigService } from '@perx/core';
import { DatePipe } from '@angular/common';

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
  public btnTxt: string = 'View Code';
  public sourceType: string;
  public expiryFn: (voucher: Voucher) => string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private voucherService: IVoucherService,
    private configService: ConfigService,
    private datePipe: DatePipe
  ) { }

  public ngOnInit(): void {
    this.firstTime = this.route.snapshot.paramMap.get('win') === 'true';
    this.id = this.route.snapshot.params.id;
    this.expiryFn = (v: Voucher) => v.expiry ? `Expiry: ${this.datePipe.transform(v.expiry, 'mediumDate')}` : '';

    this.configService.readAppConfig().subscribe(
      (config: IConfig<void>) => {
        this.sourceType = config.sourceType ? config.sourceType.toString() : '';
        this.fetchVouchers(this.sourceType);
      }
    );
  }

  private fetchVouchers(srcType: string): void {
    this.voucherService.get(this.id, false, {sourceType: srcType, type: null})
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
