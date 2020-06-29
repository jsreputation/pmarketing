import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable, forkJoin, of } from 'rxjs';

import {
  LoyaltyService,
  ILoyaltyTransactionHistory,
  IRewardTransactionHistory,
  // IPurchaseTransactionHistory,
  TransactionPipe,
  CashbackTransactionPipe,
  SettingsService,
  IFlags,
  // ILoyaltyTransactionProperties
} from '@perxtech/core';
import { oc } from 'ts-optchain';

// import { ShowTitleInHeader } from '../layout/layout.component';

@Component({
  selector: 'perx-blackcomb-pages-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit/*, ShowTitleInHeader */ {
  public transactions: Observable<ILoyaltyTransactionHistory[]>;
  public purchasesTitleFn: (tr: ILoyaltyTransactionHistory) => string;
  public redemptionsTitleFn: (tr: ILoyaltyTransactionHistory) => string;
  public descFn: (tr: ILoyaltyTransactionHistory) => string;
  public subTitleFn: (tr: ILoyaltyTransactionHistory) => string;
  public priceLabelFn: (tr: ILoyaltyTransactionHistory) => string;

  private pageNumber: number = 2;
  private pageSize: number = 10;
  private complitePagination: boolean = false;
  constructor(
    private loyaltyService: LoyaltyService,
    private settingsService: SettingsService,
    private transactionPipe: TransactionPipe,
    private cashbackTransactionPipe: CashbackTransactionPipe,
    private datePipe: DatePipe
  ) { }

  public ngOnInit(): void {
    this.transactions = this.loyaltyService.getTransactionHistory(this.pageNumber - 1, this.pageSize);
    this.settingsService.getRemoteFlagsSettings().subscribe((flags: IFlags) => {
      if (flags.rebateDemoFlow) {
        this.priceLabelFn = (tr: ILoyaltyTransactionHistory) => `${this.cashbackTransactionPipe.transform(tr.pointsAmount || 0)}`;
        this.descFn = (tr: ILoyaltyTransactionHistory) => {
          let text = '';
          const properties = oc(tr).transactionDetails.data.properties();
          if (properties) {
            text = properties.storeName ? `${properties.storeName}` : '';
          }
          return text;
        };
        this.purchasesTitleFn = (tr: ILoyaltyTransactionHistory) => {
          let text = '';
          const properties = oc(tr).transactionDetails.data.properties();
          if (properties) {
            text = properties.storeCode ? properties.storeCode : '';
          }
          return text;
        };
      } else {
        this.priceLabelFn = (tr: ILoyaltyTransactionHistory) => `${this.transactionPipe.transform(tr.pointsAmount || 0)}`;
        this.descFn = (tr: ILoyaltyTransactionHistory) => {
          let text = '';
          const properties = oc(tr).transactionDetails.data.properties();
          if (properties) {
            text = properties.storeName ? properties.storeName : '';
          }
          return text;
        };
        this.purchasesTitleFn = (tr: ILoyaltyTransactionHistory) => {
          let text = '';
          const properties = oc(tr).transactionDetails.data.properties();
          if (properties) {
            text = properties.productName ? properties.productName : '';
          }
          return text;
        };
      }
    });

    this.redemptionsTitleFn = (tr: ILoyaltyTransactionHistory) =>
      `${(tr.transactionDetails && tr.transactionDetails.data) ?
        (tr.transactionDetails.data as IRewardTransactionHistory).rewardName : ''}`;

    this.subTitleFn = (tr: ILoyaltyTransactionHistory) => `${this.datePipe.transform(tr.transactedAt, 'dd/MM/yyyy')}`;
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

  // public getTitle(): string {
  //   return 'Transaction History';
  // }
}
