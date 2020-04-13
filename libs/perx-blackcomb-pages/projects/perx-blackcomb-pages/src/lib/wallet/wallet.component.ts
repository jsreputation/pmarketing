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
} from '@perxtech/core';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';

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
  public expiryLabelFn: ((v: Voucher) => string) | undefined;

  public currentPage: number = 0;
  public completed: boolean = false;

  constructor(
    private router: Router,
    private vouchersService: IVoucherService,
    private datePipe: DatePipe,
    private translate: TranslateService,
  ) { }


  public ngOnInit(): void {
    this.translate.get('WALLET.MY_WALLET').subscribe(text => this.rewardsHeadline = text);
    this.vouchers$ = of([]);
    this.onScroll();
    this.filter = [VoucherState.issued, VoucherState.released];
    this.translate.get('WALLET.REWARD_STATUS_EXPIRY')
      .subscribe((text: string) => {
        this.expiryLabelFn = (v: Voucher) => {
          const dateStr = this.datePipe.transform(v.expiry, 'shortDate');
          return text.replace('{{date}}', dateStr || '~');
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
      this.vouchersService.getFromPage(this.currentPage, { type: 'active' })
    ).subscribe((val) => {
      if (!val[1].length && val[1].length < REQ_PAGE_SIZE) {
        this.completed = true;
      }
      this.vouchers$ = of([...val[0], ...val[1]]);
    });
  }
}
