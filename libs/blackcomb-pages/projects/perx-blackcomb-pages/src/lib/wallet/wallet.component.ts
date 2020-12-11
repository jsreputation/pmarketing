import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Router } from '@angular/router';

import {
  Observable, forkJoin, of, Subject
} from 'rxjs';

import {
  IVoucherService,
  VoucherState,
  Voucher,
  RssFeedsPages,
  FeedItem,
  FeedReaderService,
  SettingsService,
  IRssFeeds,
  IRssFeedsData,
  IFlags,
  IConfig,
  ConfigService,
} from '@perxtech/core';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import {
  map,
  switchMap
} from 'rxjs/operators';

const REQ_PAGE_SIZE: number = 10;
@Component({
  selector: 'perx-blackcomb-pages-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  public vouchers$: Observable<Voucher[]>;
  public filter: string[];
  public rewardsHeadline: string;
  public expiryLabelFn: ((v: Voucher) => Observable<string>) | undefined;
  public newsFeedItems: Observable<FeedItem[] | undefined>;
  public showVoucherStatusLabels: boolean = false;
  public statusLabelMappings: Record<string, string> = {
      issued: 'Approved',
      redeemed: 'Redeemed',
      expired: 'Expired',
      reserved: 'Pending',
      released: 'Declined',
  };
  public currentPage: number = 0;
  public completed: boolean = false;
  public sourceType: string | undefined = undefined;

  constructor(
    private router: Router,
    private vouchersService: IVoucherService,
    private datePipe: DatePipe,
    private translate: TranslateService,
    private feedService: FeedReaderService,
    private settingsService: SettingsService,
    private configService: ConfigService
  ) { }

  public ngOnInit(): void {
    this.configService.readAppConfig().subscribe(
      (config: IConfig<void>) => {
        this.sourceType = config.sourceType ? config.sourceType.toString() : undefined;
      });
    this.translate.get('STATUS_LABELS').subscribe(statusLabelsTranslated => {
      Object.entries(this.statusLabelMappings).forEach(
        ([key, value]) => {
          if (
            statusLabelsTranslated[key.toUpperCase()] &&
            statusLabelsTranslated[key.toUpperCase()] !== value
          ) {
            this.statusLabelMappings[key] = statusLabelsTranslated[key.toUpperCase()];
          }
        }
      );
    });

    this.translate.get('WALLET.MY_WALLET').subscribe(text => this.rewardsHeadline = text);
    this.vouchers$ = of([]);
    this.onScroll();
    this.filter = [ VoucherState.issued, VoucherState.released, VoucherState.reserved ];
    this.settingsService.getRemoteFlagsSettings().subscribe(
      (flags: IFlags) => {
        if (flags.showVoucherStatusLabels) {
          this.showVoucherStatusLabels = flags.showVoucherStatusLabels;
        }
      }
    );
    this.initRssItems();
    this.translate.get('WALLET.REWARD_STATUS_EXPIRY')
      .subscribe((text: string) => {
        this.expiryLabelFn = (v: Voucher) => {
          const dateStr = this.datePipe.transform(v.expiry, 'shortDate');
          return of(text.replace('{{date}}', dateStr || '~'));
        };
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public voucherSelected(voucher: Voucher): void {
    this.router.navigate([`/voucher-detail/${voucher.id}`]);
  }

  public onScroll(): void {
    this.currentPage = this.currentPage + 1;
    if (this.completed) {
      return;
    }
    forkJoin(
      this.vouchers$,
      this.vouchersService.getFromPage(this.currentPage, { type: 'active', sourceType: this.sourceType })
    ).subscribe((val) => {
      if (!val[1].length && val[1].length < REQ_PAGE_SIZE) {
        this.completed = true;
      }
      this.vouchers$ = of([...val[0], ...val[1]]);
    });
  }

  private initRssItems(): void {
    this.newsFeedItems = this.settingsService.getRssFeeds().pipe(
      map((res: IRssFeeds) => res.data ? res.data.find(feed => feed.page === RssFeedsPages.WALLET) : undefined),
      switchMap((feedData: IRssFeedsData | undefined) => {
        if (!feedData || !feedData.url) {
          return of([] as FeedItem[]);
        }
        return this.feedService.getFromUrl(feedData.url);
      })
    );
  }
}
