import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICampaign, ICampaignService, IVoucherService, VoucherState, Voucher, CampaignType } from '@perx/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'perx-blackcomb-pages-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit, OnDestroy {
  public campaigns$: Observable<ICampaign[]>;
  public vouchers$: Observable<Voucher[]>;
  private destroy$: Subject<any> = new Subject();
  public filter: string[];

  constructor(
    private router: Router,
    private vouchersService: IVoucherService,
    private campaignService: ICampaignService
  ) { }

  public ngOnInit(): void {
    this.campaigns$ = this.campaignService.getCampaigns()
      .pipe(
        map((campaigns: ICampaign[]) => campaigns.filter(c => c.type === CampaignType.stamp)),
        takeUntil(this.destroy$)
      );
    this.vouchers$ = this.vouchersService.getAll().pipe(
      takeUntil(this.destroy$)
    );
    this.filter = [VoucherState.issued, VoucherState.reserved, VoucherState.released];
  }

  public voucherSelected(voucher: Voucher): void {
    this.router.navigate([`/voucher-detail/${voucher.id}`]);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
