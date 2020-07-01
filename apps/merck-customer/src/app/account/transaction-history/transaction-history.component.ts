import { Component, OnInit } from '@angular/core';
import { PageAppearence, PageProperties, BarSelectedItem } from '../../page-properties';
import { Observable, of, forkJoin } from 'rxjs';
import {
  LoyaltyService,
  ILoyaltyTransactionHistory,
  TransactionPipe,
  IRewardTransactionHistory,
  IPurchaseTransactionHistory
} from '@perxtech/core';
import { DatePipe } from '@angular/common';
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'mc-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit, PageAppearence {

  public transactions: Observable<ILoyaltyTransactionHistory[]>;
  public purchasesTitleFn: (tr: ILoyaltyTransactionHistory) => string;
  public redemptionsTitleFn: (tr: ILoyaltyTransactionHistory) => string;
  public descFn: (tr: ILoyaltyTransactionHistory) => string;
  public subTitleFn: (tr: ILoyaltyTransactionHistory) => string;
  public priceLabelFn: (tr: ILoyaltyTransactionHistory) => string;

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
    this.purchasesTitleFn = (tr: ILoyaltyTransactionHistory) =>
      `${tr.transactionDetails && tr.transactionDetails.data ? (tr.transactionDetails.data as IPurchaseTransactionHistory).pharmacyName : 'no-name'}`;

    this.redemptionsTitleFn = (tr: ILoyaltyTransactionHistory) =>
      `${tr.transactionDetails && (tr.transactionDetails.data as IRewardTransactionHistory).rewardName}`;

    this.descFn = (tr: ILoyaltyTransactionHistory) =>
      `${tr.transactionDetails && tr.transactionDetails.data ? (tr.transactionDetails.data as IPurchaseTransactionHistory).productName : ''}`;

    this.subTitleFn = (tr: ILoyaltyTransactionHistory) => `${this.datePipe.transform(tr.transactedAt, 'dd/MM/yyyy')}`;
    this.priceLabelFn = (tr: ILoyaltyTransactionHistory) => `${this.transactionPipe.transform(tr.pointsAmount || 0)}`;

    this.loyaltyService.getTransactionHistory(this.pageNumber, this.pageSize).subscribe(
      (transactions: ILoyaltyTransactionHistory[]) => this.transactions = of(transactions),
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
