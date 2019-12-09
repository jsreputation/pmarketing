import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StatusLabelMapping, Voucher, IVoucherService, VoucherState, ConfigService } from '@perx/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  public issuedVouchers: Observable<Voucher[]>;
  public comingSoon: boolean = true;
  public redeemedVouchers: Observable<Voucher[]>;

  public mapping: StatusLabelMapping = {
    issued: 'Approved',
    redeemed: 'Redeemed',
    expired: 'Expired',
    reserved: 'Pending',
    released: 'Declined',
  };

  constructor(
    private vouchersService: IVoucherService,
    private router: Router,
    private configService: ConfigService
  ) { }

  public ngOnInit(): void {
    const feed = this.vouchersService.getAll();
    this.configService.readAppConfig().subscribe((config) => this.comingSoon = config.comingSoon as boolean);
    this.issuedVouchers = feed
      .pipe(
        map((vouchers: Voucher[]) => vouchers.filter(voucher => voucher.state === VoucherState.issued))
      );

    this.redeemedVouchers = feed
      .pipe(
        map((vouchers: Voucher[]) => vouchers.filter(voucher => voucher.state !== VoucherState.issued))
      );
  }
  public openDetail(voucher: Voucher): void {
    this.router.navigate(['wallet', 'details', voucher.id]);
  }
}
