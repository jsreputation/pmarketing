import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';

import {
  Observable,
  combineLatest,
  Subject,
} from 'rxjs';
import {
  map,
  mergeMap,
} from 'rxjs/operators';

import {
  ICampaign,
  ICampaignService,
  IVoucherService,
  VoucherState,
  Voucher,
  CampaignType,
  StampService,
  IStampCard,
} from '@perx/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'perx-blackcomb-pages-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit, OnDestroy {
  public stampCards$: Observable<IStampCard[]>;
  public vouchers$: Observable<Voucher[]>;
  private destroy$: Subject<void> = new Subject();
  public filter: string[];
  public rewardsHeadline: string;

  constructor(
    private router: Router,
    private vouchersService: IVoucherService,
    private stampService: StampService,
    private campaignService: ICampaignService,
    private translate: TranslateService
  ) { }

  public ngOnInit(): void {
    this.stampCards$ = this.campaignService.getCampaigns()
      .pipe(
        map((campaigns: ICampaign[]) => campaigns.filter(c => c.type === CampaignType.stamp)),
        mergeMap((res) =>  combineLatest(
          ...res.map(c => this.stampService.getCurrentCard(c.id))
        )
        ));
    this.translate.get('MY_WALLET').subscribe( text => this.rewardsHeadline = text);
    this.vouchers$ = this.vouchersService.getAll();
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
