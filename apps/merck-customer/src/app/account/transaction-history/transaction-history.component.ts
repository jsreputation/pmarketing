import { Component, OnInit } from '@angular/core';
import { PageAppearence, PageProperties, BarSelectedItem } from '../../page-properties';
import { Observable, of, forkJoin } from 'rxjs';
import {
  LoyaltyService,
  ITransactionHistory,
  IRewardTransactionHistory,
  IPurchaseTransactionHistory
} from '@perxtech/core';
import { DatePipe } from '@angular/common';
import { MatTabChangeEvent } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'mc-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit, PageAppearence {

  public transactions: Observable<ITransactionHistory[]>;
  public purchasesTitleFn: (tr: ITransactionHistory) => Observable<string>;
  public redemptionsTitleFn: (tr: ITransactionHistory) => Observable<string>;
  public descFn: (tr: ITransactionHistory) => Observable<string>;
  public subTitleFn: (tr: ITransactionHistory) => Observable<string>;
  public priceLabelFn: (tr: ITransactionHistory) => Observable<string>;

  private pageNumber: number = 1;
  private pageSize: number = 10;
  private complitePagination: boolean = false;
  // @ts-ignore
  private labelIndex: number = 0;
  constructor(
    private loyaltyService: LoyaltyService,
    private datePipe: DatePipe,
    private translate: TranslateService
  ) {
  }

  public ngOnInit(): void {
    this.initTranslate();
    this.descFn = (tr: ITransactionHistory) =>
      of(`${tr.transactionDetails && tr.transactionDetails.data ? (tr.transactionDetails.data as IPurchaseTransactionHistory).productName : ''}`);

    this.purchasesTitleFn = (tr: ITransactionHistory) =>
      of(`${tr.transactionDetails && tr.transactionDetails.data ? (tr.transactionDetails.data as IPurchaseTransactionHistory).pharmacyName : ''}`);

    this.redemptionsTitleFn = (tr: ITransactionHistory) =>
      of(`${tr.transactionDetails && (tr.transactionDetails.data as IRewardTransactionHistory).rewardName}`);

    this.subTitleFn = (tr: ITransactionHistory) => of(`${this.datePipe.transform(tr.transactedAt, 'dd/MM/yyyy')}`);

    this.loyaltyService.getTransactionHistory(this.pageNumber, this.pageSize).subscribe(
      (transactions: ITransactionHistory[]) => this.transactions = of(transactions),
      (err) => console.log(err)
    );
    this.pageNumber++;
  }

  public getPageProperties(): PageProperties {
    return {
      header: true,
      backButtonEnabled: true,
      bottomSelectedItem: BarSelectedItem.ACCOUNT,
      pageTitle: 'TRANSACTION_HISTORY'
    };
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

  public tabChanged(event: MatTabChangeEvent): void {
    this.labelIndex = event.index;
  }

  private initTranslate(): void {
    this.priceLabelFn = (tr: ITransactionHistory) => this.translate.get(['TRANSACTION_HISTORY.POINT_EARNED', 'TRANSACTION_HISTORY.POINT_SPENT']).pipe(
      map(res => {
        let pointsSpentTxt = res.TRANSACTION_HISTORY && res.TRANSACTION_HISTORY.POINT_EARNED;
        let pointsEarnedTxt = res.TRANSACTION_HISTORY && res.TRANSACTION_HISTORY.POINT_SPENT;
        const value = tr.pointsAmount || 0;
        const absVal = String(Math.abs(value));
        return value < 0 ? pointsSpentTxt.replace('{points}', absVal) : pointsEarnedTxt.replace('{points}', absVal);
      })
    );
  }
}
