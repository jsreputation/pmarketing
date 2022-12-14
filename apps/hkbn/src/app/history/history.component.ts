import {
  Component,
  OnInit,
} from '@angular/core';

import {
  BehaviorSubject,
  Observable,
} from 'rxjs';
import {
  map,
  scan,
} from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';

import {
  ILoyaltyTransaction,
  LoyaltyService,
  ILoyalty,
  isEmptyArray,
} from '@perxtech/core';

const REQ_PAGE_SIZE: number = 10;

@Component({
  selector: 'hkbn-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  public transactions$: Observable<ILoyaltyTransaction[]>;
  private transactions: BehaviorSubject<ILoyaltyTransaction[]> = new BehaviorSubject<ILoyaltyTransaction[]>([]);
  public transactionsLoaded: boolean = false;
  public transactionsEnded: boolean = false;
  private transactionsPageId: number = 1;
  private loyaltyId: number = null;
  public accrued: Observable<ILoyaltyTransaction[]>;
  public redeemed: Observable<ILoyaltyTransaction[]>;
  public priceLabelFn: (tr: ILoyaltyTransaction) => Observable<string>;
  public subTitleFn: (tr: ILoyaltyTransaction) => Observable<string>;
  public titleFn: (tr: ILoyaltyTransaction) => Observable<string>;

  private async initLoyaltyId(): Promise<void> {
    const loyalties: ILoyalty[] = await this.loyaltyService.getLoyalties().toPromise();
    if (!isEmptyArray(loyalties) && loyalties[0]) {
      this.loyaltyId = loyalties[0].id;
    }
  }

  private loadTransactions(): void {
    this.transactionsLoaded = false;
    if (!this.loyaltyId) {
      return;
    }

    this.loyaltyService.getTransactions(this.loyaltyId, this.transactionsPageId, REQ_PAGE_SIZE)
      .subscribe((transactionsArr: ILoyaltyTransaction[]) => {
        if (isEmptyArray(transactionsArr)) {
          return;
        }

        this.transactions.next(transactionsArr);
        this.transactionsLoaded = true;
        // accrued/redeemed have to have separate requests, infinite-scroll
        this.accrued = this.transactions.pipe(
          map((transactions: ILoyaltyTransaction[]) => transactions.filter(transaction => transaction.pointsBalance > 0))
        );
        this.redeemed = this.transactions.pipe(
          map((transactions: ILoyaltyTransaction[]) => transactions.filter(transaction => transaction.pointsBalance <= 0))
        );
        if (transactionsArr.length < REQ_PAGE_SIZE) {
          this.transactionsEnded = true;
        }
      });
  }

  private initTransactionsScan(): void {
    this.transactions$ = this.transactions.asObservable().pipe(
      scan((acc, curr) => [...acc, ...curr ? curr : []], [])
    );
  }

  constructor(
    private loyaltyService: LoyaltyService,
    private translate: TranslateService,
  ) {
    this.initTransactionsScan();
  }

  public async ngOnInit(): Promise<void> {
    await this.initLoyaltyId();
    this.loadTransactions();
    this.initTranslate();

  }

  public onScroll(): void {
    if (this.transactionsEnded) {
      return null;
    }

    this.transactionsPageId++;
    this.loadTransactions();
  }

  private initTranslate(): void {
    this.priceLabelFn = (tr: ILoyaltyTransaction) => this.translate.get(['TRANSACTION_HISTORY.POINT_EARNED', 'TRANSACTION_HISTORY.POINT_SPENT']).pipe(
      map(res => {
        const pointsSpentTxt = res['TRANSACTION_HISTORY.POINT_EARNED'];
        const pointsEarnedTxt = res['TRANSACTION_HISTORY.POINT_SPENT'];
        const value = tr.points || 0;
        const absVal = String(Math.abs(value));
        return value < 0 ? pointsSpentTxt.replace('{points}', absVal) : pointsEarnedTxt.replace('{points}', absVal);
      })
    );
  }
}
