import { Component, OnDestroy, OnInit } from '@angular/core';
import { Voucher, IVoucherService, VoucherState, StatusLabelMapping } from '@perxtech/core';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';

const REQ_PAGE_SIZE: number = 10;
@Component({
  selector: 'perx-blackcomb-pages-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  public vouchers$: Observable<Voucher[]>;
  public filter: string[];
  public currentPage: number = 0;
  public completed: boolean = false;
  public expiryLabelFn: ((v: Voucher) => Observable<string>) | undefined;
  public redeemedOnLabelFn: ((v: Voucher) => Observable<string>) | undefined;

  public mapping: StatusLabelMapping = {
    issued: 'Approved',
    redeemed: 'Redeemed',
    expired: 'Expired',
    reserved: 'Pending',
    released: 'Declined',
  };

  constructor(private vouchersService: IVoucherService,
              private translate: TranslateService,
              private datePipe: DatePipe) { }

  public ngOnInit(): void {
    this.vouchers$ = of([]);
    this.onScroll();
    this.filter = [VoucherState.redeemed, VoucherState.expired];
    this.translate.get('STATUS_LABELS').subscribe(statusLabelsTranslated => {
      Object.entries(this.mapping).forEach(
        ([key, value]) => {
          if (
            statusLabelsTranslated[key.toUpperCase()] &&
            statusLabelsTranslated[key.toUpperCase()] !== value
          ) {
            this.mapping[key] = statusLabelsTranslated[key.toUpperCase()];
          }
        }
      );
    });

    this.translate.get('WALLET.REWARD_STATUS_EXPIRY')
      .subscribe((text: string) => {
        this.expiryLabelFn = (v: Voucher) => {
          const dateStr = this.datePipe.transform(v.expiry, 'shortDate');
          return of(text.replace('{{date}}', dateStr || '~'));
        };
      });

    this.translate.get('WALLET.REWARD_STATUS_REDEEMED_ON')
      .subscribe((text: string) => {
        this.redeemedOnLabelFn = (v: Voucher) => {
          const dateStr = this.datePipe.transform(v.redemptionDate, 'shortDate');
          return of(text.replace('{{date}}', dateStr || '~'));
        };
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onScroll(): void {
    this.currentPage = this.currentPage + 1;
    if (this.completed) {
      return;
    }
    forkJoin(
      this.vouchers$,
      this.vouchersService.getFromPage(this.currentPage)
    ).subscribe((val) => {
      if (!val[1].length && val[1].length < REQ_PAGE_SIZE) {
        this.completed = true;
      }
      this.vouchers$ = of([...val[0], ...val[1]]);
    });

  }
}
