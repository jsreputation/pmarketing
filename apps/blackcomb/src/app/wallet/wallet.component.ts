import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { ICampaign, Voucher, IVoucherService, ICampaignService, CampaignType, VoucherState, StampService } from '@perx/core';
import { Router } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';

/**
 * @deprecated
 */
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
    private stampService: StampService,
    private campaignService: ICampaignService
  ) { }

  public ngOnInit(): void {
    this.campaigns$ = this.campaignService.getCampaigns()
      .pipe(
        map((campaigns: ICampaign[]) => campaigns.filter(c => c.type === CampaignType.stamp)),
        mergeMap((res) => combineLatest(
          ...res.map(c => this.stampService.getCurrentCard(c.id)
            .pipe(
              map(res2 => ({ ...res2, campaignId: c.id, campaignTitle: c.name, campaignDescription: c.description })))
          )
        )
        ));

    this.vouchers$ = this.vouchersService.getAll();
    this.filter = [VoucherState.issued, VoucherState.reserved, VoucherState.released];
  }

  public voucherSelected(voucher: Voucher): void {
    this.router.navigate([`/voucher-detail/${voucher.id}`]);
  }
}
