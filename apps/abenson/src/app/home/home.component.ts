import { Component, OnInit } from '@angular/core';
import {
  CampaignType,
  ConfigService,
  ICampaign,
  ICampaignService,
  IConfig,
  ILoyalty,
  Voucher,
  VoucherState
} from '@perxtech/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { share } from 'rxjs/operators';
import { IAbensonConfig } from '../model/IAbenson.model';
import { CurrencyPipe, DatePipe } from '@angular/common';

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
  public subTitleFn: (loyalty: ILoyalty) => Observable<string>;
  public summaryExpiringFn: (loyalty: ILoyalty) => Observable<string>;

  constructor(
    private router: Router,
    private campaignService: ICampaignService,
    private configService: ConfigService,
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe
  ) { }

  public ngOnInit(): void {
    this.configService.readAppConfig<IAbensonConfig>().subscribe((config: IConfig<IAbensonConfig>) => {
      this.comingSoon = config.custom ? config.custom.comingSoon as boolean : false;
    });
    this.campaigns$ = this.campaignService.getCampaigns({type: CampaignType.game})
      .pipe(
        share()
      );
    this.vouchers$ = this.vouchersService.getAll();
    this.filter = [VoucherState.issued, VoucherState.reserved, VoucherState.released];
    this.subTitleFn = (loyalty: ILoyalty) => of(`Equivalent to ${this.currencyPipe.transform(loyalty.currencyBalance, loyalty.currency, 'symbol-narrow', '1.0-0', 'en-PH')} e-Cash`);
    this.summaryExpiringFn = () => of(`Your total points as of ${this.datePipe.transform(new Date(), 'mediumDate')}`);

  }

  public onCampaignSelect(campaign: ICampaign): void {
    this.router.navigate([`/game/${campaign.id}`]);
  }

  public voucherSelected(voucher: Voucher): void {
    this.router.navigate([`/voucher-detail/${voucher.id}`]);
  }
}
