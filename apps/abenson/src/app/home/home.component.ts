import { Component, OnInit } from '@angular/core';
import { ICampaign, ICampaignService, IVoucherService, VoucherState, Voucher, CampaignType, ConfigService } from '@perx/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public campaigns$: Observable<ICampaign[]>;
  public vouchers$: Observable<Voucher[]>;
  public filter: string[];
  public comingSoon: boolean = true;
  constructor(
    private router: Router,
    private vouchersService: IVoucherService,
    private campaignService: ICampaignService,
    private configService: ConfigService
  ) { }

  public ngOnInit(): void {
    this.configService.readAppConfig().subscribe((val) => this.comingSoon = val.comingSoon as boolean);
    this.campaigns$ = this.campaignService.getCampaigns()
      .pipe(map((compaing) => compaing.filter(el => el.type === CampaignType.game)));
    this.vouchers$ = this.vouchersService.getAll();
    this.filter = [VoucherState.issued, VoucherState.reserved, VoucherState.released];
  }

  public onCampaignSelect(campaign: ICampaign): void {
    this.router.navigate([`/game/${campaign.id}`]);
  }

  public voucherSelected(voucher: Voucher): void {
    this.router.navigate([`/voucher-detail/${voucher.id}`]);
  }
}
