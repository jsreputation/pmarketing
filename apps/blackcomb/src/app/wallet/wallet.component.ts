import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICampaign, Voucher, IVoucherService, ICampaignService, CampaignType, VoucherState } from '@perx/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  public campaigns$: Observable<ICampaign[]>;
  public vouchers$: Observable<Voucher[]>;

  public filter: string[];

  constructor(
    private router: Router,
    private vouchersService: IVoucherService,
    private campaignService: ICampaignService
  ) { }

  public ngOnInit(): void {
    this.campaigns$ = this.campaignService.getCampaigns()
      .pipe(map((campaigns: ICampaign[]) => campaigns.filter(c => c.type === CampaignType.stamp)));
    this.vouchers$ = this.vouchersService.getAll();
    this.filter = [VoucherState.issued, VoucherState.reserved, VoucherState.released];
  }

  public voucherSelected(voucher: Voucher): void {
    this.router.navigate([`/voucher-detail/${voucher.id}`]);
  }
}
