import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {Router} from '@angular/router';

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
import {TranslateService} from '@ngx-translate/core';
import {DatePipe} from '@angular/common';

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
  public expiryLabelFn: ((v: Voucher) => string) | undefined;

  constructor(
    private router: Router,
    private vouchersService: IVoucherService,
    private stampService: StampService,
    private campaignService: ICampaignService,
    private datePipe: DatePipe,
    private translate: TranslateService
  ) { }

  public ngOnInit(): void {
    this.stampCards$ = this.campaignService.getCampaigns()
      .pipe(
        map((campaigns: ICampaign[]) => campaigns.filter(c => c.type === CampaignType.stamp)),
        mergeMap((res) => combineLatest(
          ...res.map(c => this.stampService.getCurrentCard(c.id))
        )),
        map((stampCard: IStampCard[]) => stampCard.filter(c => c.title && c.title !== ''))
      );
    this.translate.get('MY_WALLET').subscribe(text => this.rewardsHeadline = text);
    this.vouchers$ = this.vouchersService.getAll();
    this.filter = [VoucherState.issued, VoucherState.released];
    this.translate.get('VOUCHER_EXPIRY')
      .subscribe((text: string) => {
        this.expiryLabelFn = (v: Voucher) => {
          const dateStr = this.datePipe.transform(v.expiry, 'shortDate');
          return text.replace('{{date}}', dateStr || '~');
        };
      });
  }

  public voucherSelected(voucher: Voucher): void {
    this.router.navigate([`/voucher-detail/${voucher.id}`]);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
