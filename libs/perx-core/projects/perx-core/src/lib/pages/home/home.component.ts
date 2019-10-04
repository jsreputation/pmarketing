import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICampaign, CampaignType } from '../../campaign/models/campaign.model';
import { IVoucher, VoucherState } from '../../vouchers/models/voucher.model';
import { Router } from '@angular/router';
import { IVoucherService } from '../../vouchers/ivoucher.service';
import { ICampaignService } from '../../campaign/icampaign.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'perx-core-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public campaigns$: Observable<ICampaign[]>;
  public vouchers$: Observable<IVoucher[]>;

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

  public voucherSelected(voucher: IVoucher): void {
    this.router.navigate([`/voucher-detail/${voucher.id}`]);
  }
}
