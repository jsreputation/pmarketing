import { Component, OnInit } from '@angular/core';
import { ICampaign, ICampaignService, IVoucherService, VoucherState, Voucher, CampaignType } from '@perx/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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
    this.vouchers$ = this.vouchersService.getAll().pipe(tap((s) => console.log(s)));
    this.filter = [VoucherState.issued, VoucherState.reserved, VoucherState.released];
  }

  public voucherSelected(voucher: Voucher): void {
    this.router.navigate([`/voucher-detail/${voucher.id}`]);
  }
}
