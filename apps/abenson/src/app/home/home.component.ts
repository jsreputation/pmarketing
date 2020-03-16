import { Component, OnInit } from '@angular/core';
import {
  ICampaign,
  ICampaignService,
  IVoucherService,
  VoucherState,
  Voucher,
  CampaignType,
  ConfigService,
  IConfig, ILoyalty
} from '@perx/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {map, share} from 'rxjs/operators';
import { IAbensonConfig } from '../model/IAbenson.model';
import {CurrencyPipe, DatePipe} from '@angular/common';

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
  public subTitleFn: (loyalty: ILoyalty) => string;
  public summaryExpiringFn: (loyalty: ILoyalty) => string;

  constructor(
    private router: Router,
    private vouchersService: IVoucherService,
    private campaignService: ICampaignService,
    private configService: ConfigService,
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe
  ) { }

  public ngOnInit(): void {
    this.configService.readAppConfig<IAbensonConfig>().subscribe((config: IConfig<IAbensonConfig>) => {
      this.comingSoon = config.custom ? config.custom.comingSoon as boolean : false;
    });
    this.campaigns$ = this.campaignService.getCampaigns()
      .pipe(
        map((campaign) => campaign.filter(el => el.type === CampaignType.game)),
        share()
      );
    this.vouchers$ = this.vouchersService.getAll();
    this.filter = [VoucherState.issued, VoucherState.reserved, VoucherState.released];
    this.subTitleFn = (loyalty: ILoyalty) => `Equivalent to ${this.currencyPipe.transform(loyalty.currencyBalance, loyalty.currency, 'symbol-narrow', '1.0-0', 'en-PH')} e-Cash`;
    this.summaryExpiringFn = () => `Your total points as of ${this.datePipe.transform(new Date(), 'mediumDate')}`;

  }

  public onCampaignSelect(campaign: ICampaign): void {
    this.router.navigate([`/game/${campaign.id}`]);
  }

  public voucherSelected(voucher: Voucher): void {
    this.router.navigate([`/voucher-detail/${voucher.id}`]);
  }
}
