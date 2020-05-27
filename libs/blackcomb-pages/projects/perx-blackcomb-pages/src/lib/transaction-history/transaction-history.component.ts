import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable, forkJoin, of } from 'rxjs';

import {
  LoyaltyService,
  ITransactionHistory,
  IRewardTransactionHistory,
  IPurchaseTransactionHistory
} from '@perxtech/core';
import { map } from 'rxjs/operators';

// import { ShowTitleInHeader } from '../layout/layout.component';

@Component({
  selector: 'perx-blackcomb-pages-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit/*, ShowTitleInHeader */ {
  public transactions: Observable<ITransactionHistory[]>;
  public purchasesTitleFn: (tr: ITransactionHistory) => Observable<string>;
  public redemptionsTitleFn: (tr: ITransactionHistory) => Observable<string>;
  public descFn: (tr: ITransactionHistory) => Observable<string>;
  public subTitleFn: (tr: ITransactionHistory) => Observable<string>;
  public priceLabelFn: (tr: ITransactionHistory) => Observable<string>;

  private pageNumber: number = 1;
  private pageSize: number = 10;
  private complitePagination: boolean = false;
  constructor(
    private loyaltyService: LoyaltyService,
    private datePipe: DatePipe,
    private translate: TranslateService
  ) { }

  public ngOnInit(): void {
    this.transactions = this.loyaltyService.getTransactionHistory(this.pageNumber, this.pageSize);

    this.purchasesTitleFn = (tr: ITransactionHistory) =>
      of(`${(tr.transactionDetails && tr.transactionDetails.data) ?
        (tr.transactionDetails.data as IPurchaseTransactionHistory).pharmacyName : ''}`);

    this.redemptionsTitleFn = (tr: ITransactionHistory) =>
      of(`${(tr.transactionDetails && tr.transactionDetails.data) ?
        (tr.transactionDetails.data as IRewardTransactionHistory).rewardName : ''}`);

    this.descFn = (tr: ITransactionHistory) =>
      of(`${tr.transactionDetails && tr.transactionDetails.data &&
        (tr.transactionDetails.data as IPurchaseTransactionHistory).productName}`);

    this.subTitleFn = (tr: ITransactionHistory) => of(`${this.datePipe.transform(tr.transactedAt, 'dd/MM/yyyy')}`);

    this.initTranslate();
  }

  public onScroll(): void {
    if (this.complitePagination) {
      return;
    }
    forkJoin(this.transactions, this.loyaltyService.getTransactionHistory(this.pageNumber, this.pageSize))
      .subscribe((val) => {
        if (val[1].length < this.pageSize) {
          this.complitePagination = true;
        }
        this.transactions = of([...val[0], ...val[1]]);
      });
    this.pageNumber++;
  }

  private initTranslate(): void {
    this.priceLabelFn = (tr: ITransactionHistory) => this.translate.get(['WALLET.POINT_EARNED', 'WALLET.POINT_SPENT']).pipe(
      map(res => {
        let pointsSpentTxt = res['WALLET.POINT_EARNED'];
        let pointsEarnedTxt = res['WALLET.POINT_SPENT'];
        const value = tr.pointsAmount || 0;
        const absVal = String(Math.abs(value));
        return value < 0 ? pointsSpentTxt.replace('{points}', absVal) : pointsEarnedTxt.replace('{points}', absVal);
      })
    );
  }

}
