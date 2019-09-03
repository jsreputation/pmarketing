import { Component, OnInit } from '@angular/core';
import { ICampaign, CampaignService, VouchersService, VoucherState, Voucher } from '@perx/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

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
    private vouchersService: VouchersService,
    private campaignService: CampaignService
  ) { }

  public ngOnInit(): void {
    this.campaigns$ = this.campaignService.getCampaigns();
    this.vouchers$ = this.vouchersService.getAll();
    this.filter = [VoucherState.issued, VoucherState.reserved, VoucherState.released];
  }

  public onCampaignSelect(campaign: ICampaign): void {
    this.router.navigate([`/game-play/${campaign.id}`]);
  }

  public voucherSelected(voucher: Voucher): void {
    this.router.navigate([`/voucher-detail/${voucher.id}`]);
  }
}
