import { Component, OnInit } from '@angular/core';
import { PageAppearence, PageProperties, BarSelectedItem } from '../../page-properties';
import { Observable, of, forkJoin } from 'rxjs';
import {
  LoyaltyService,
  ITransactionHistory,
  TransactionPipe,
  IRewardTransactionHistory,
  IPurchaseTransactionHistory
} from '@perx/core';
import { DatePipe } from '@angular/common';
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'mc-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit, PageAppearence {

  public transactions: Observable<ITransactionHistory[]>;
  public purchasesTitleFn: (tr: ITransactionHistory) => string;
  public redemptionsTitleFn: (tr: ITransactionHistory) => string;
  public descFn: (tr: ITransactionHistory) => string;
  public subTitleFn: (tr: ITransactionHistory) => string;
  public priceLabelFn: (tr: ITransactionHistory) => string;

  private pageNumber: number = 1;
  private pageSize: number = 10;
  private complitePagination: boolean = false;
  // @ts-ignore
  private labelIndex: number = 0;
  constructor(
    private loyaltyService: LoyaltyService,
    private datePipe: DatePipe,
    private transactionPipe: TransactionPipe) {
  }

  public ngOnInit(): void {
    this.purchasesTitleFn = (tr: ITransactionHistory) =>
      `${tr.transactionDetails && tr.transactionDetails.data ? (tr.transactionDetails.data as IPurchaseTransactionHistory).pharmacyName : 'no-name'}`;

    this.redemptionsTitleFn = (tr: ITransactionHistory) =>
      `${tr.transactionDetails && (tr.transactionDetails.data as IRewardTransactionHistory).rewardName}`;

    this.descFn = (tr: ITransactionHistory) =>
      `${tr.transactionDetails && tr.transactionDetails.data ? (tr.transactionDetails.data as IPurchaseTransactionHistory).productName : ''}`;

    this.subTitleFn = (tr: ITransactionHistory) => `${this.datePipe.transform(tr.transactedAt, 'dd/MM/yyyy')}`;
    this.priceLabelFn = (tr: ITransactionHistory) => `${this.transactionPipe.transform(tr.pointsAmount || 0)}`;

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
      pageTitle: 'STATIC_TRANSACTION_HISTORY'
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
}
