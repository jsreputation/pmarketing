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
  IStampCard,
  ConfigService,
  IConfig,
  StampState,
  StampService
} from '@perx/core';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import {
  // tap,
  mergeMap,
  map,
  takeUntil,
  filter,
  take
} from 'rxjs/operators';
import { oc } from 'ts-optchain';

interface IStampCardConfig {
  stampsType: string;
}
const REQ_PAGE_SIZE: number = 10;
@Component({
  selector: 'perx-blackcomb-pages-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  public stampCards$: Observable<IStampCard[]>;
  public vouchers$: Observable<Voucher[]>;
  public filter: string[];
  public rewardsHeadline: string;
  public expiryLabelFn: ((v: Voucher) => string) | undefined;

  public currentPage: number = 0;
  public completed: boolean = false;

  // public stampsType: string;
  public puzzleTextFn: (puzzle: IStampCard) => string;
  public titleFn: (index?: number) => string;

  constructor(
    private router: Router,
    private vouchersService: IVoucherService,
    private datePipe: DatePipe,
    private translate: TranslateService,
    private configService: ConfigService,
    private stampService: StampService,
  ) {
    this.puzzleTextFn = (puzzle: IStampCard) => !puzzle.stamps ||
      puzzle.stamps.filter(st => st.state === StampState.issued).length <= 1 ? 'new stamp' : 'new stamps';
    this.titleFn = (index?: number, totalCount?: number) => index !== undefined ?
      `Stamp Card ${this.puzzleIndex(index)} out of ${totalCount}` : '';
  }

  public ngOnInit(): void {
    this.getStampCard();
    this.translate.get('MY_WALLET').subscribe(text => this.rewardsHeadline = text);
    this.vouchers$ = of([]);
    this.onScroll();
    this.filter = [VoucherState.issued, VoucherState.released];
    this.translate.get('VOUCHER_EXPIRY')
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

  private getStampCard(): void {
    this.stampCards$ = this.configService.readAppConfig<IStampCardConfig>().pipe(
      map((config: IConfig<IStampCardConfig>) => oc(config).custom.stampsType('puzzle')),
      // tap((stampsType: string) => {
      //   if (stampsType === 'stamp_card') {
      //     this.puzzleTextFn = (puzzle: IStampCard) => !puzzle.stamps ||
      //       puzzle.stamps.filter(st => st.state === StampState.issued).length > 1 ? 'new stamps' : 'new stamp';
      //     this.titleFn = (index?: number, totalCount?: number) => index !== undefined ?
      //       `Stamp Card ${this.puzzleIndex(index)} out of ${totalCount}` : '';
      //   }
      // }),
      mergeMap((stampsType: string) => this.stampService.getActiveCards(stampsType)),
      filter((cards: IStampCard[]) => cards.length > 0),
      map((cards: IStampCard[]) => cards.slice(0, 1)),
      take(1),
      takeUntil(this.destroy$)
    );
  }

  public puzzleIndex(index: number): string {
    if (index < 0) {
      return '';
    }
    return String(++index);
  }

  public selected(puzzle: IStampCard): void {
    this.router.navigate([`/stamp/${puzzle.campaignId}`]);
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
