import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable, forkJoin, of } from 'rxjs';

import {
  LoyaltyService,
  ITransactionHistory,
  IRewardTransactionHistory,
  // IPurchaseTransactionHistory,
  TransactionPipe,
  CashbackTransactionPipe,
  SettingsService,
  IFlags,
  // ITransactionProperties
} from '@perxtech/core';
import { oc } from 'ts-optchain';

// import { ShowTitleInHeader } from '../layout/layout.component';

@Component({
  selector: 'perx-blackcomb-pages-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit/*, ShowTitleInHeader */ {
  public transactions: Observable<ITransactionHistory[]>;
  public purchasesTitleFn: (tr: ITransactionHistory) => string;
  public redemptionsTitleFn: (tr: ITransactionHistory) => string;
  public descFn: (tr: ITransactionHistory) => string;
  public subTitleFn: (tr: ITransactionHistory) => string;
  public priceLabelFn: (tr: ITransactionHistory) => string;

  private pageNumber: number = 1;
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
    this.transactions = this.loyaltyService.getTransactionHistory(this.pageNumber, this.pageSize);
    this.settingsService.getRemoteFlagsSettings().subscribe((flags: IFlags) => {
      if (flags.rebateDemoFlow) {
        this.priceLabelFn = (tr: ITransactionHistory) => `${this.cashbackTransactionPipe.transform(tr.pointsAmount || 0)}`
        this.descFn = (tr: ITransactionHistory) => {
          let text = '';
          const properties = oc(tr).transactionDetails.data.properties();
          if (properties) {
            text = properties.storeName ?
              `${properties.storeCode ? `${properties.storeCode} -` : ''} ${[ properties.storeName ]}` : '';
          }
          return text;
        };
      } else {
        this.priceLabelFn = (tr: ITransactionHistory) => `${this.transactionPipe.transform(tr.pointsAmount || 0)}`;
        this.descFn = (tr: ITransactionHistory) => {
          let text = '';
          const properties = oc(tr).transactionDetails.data.properties();
          if (properties) {
            text = properties.storeName ? properties.storeName : '';
          }
          return text;
        };
      }
    });
    this.purchasesTitleFn = (tr: ITransactionHistory) => {
      let text = '';
      const properties = oc(tr).transactionDetails.data.properties();
      if (properties) {
        text = properties.productName ? properties.productName : '';
      }
      return text;
    };

    this.redemptionsTitleFn = (tr: ITransactionHistory) =>
      `${(tr.transactionDetails && tr.transactionDetails.data) ?
        (tr.transactionDetails.data as IRewardTransactionHistory).rewardName : ''}`;

    this.subTitleFn = (tr: ITransactionHistory) => `${this.datePipe.transform(tr.transactedAt, 'dd/MM/yyyy')}`;
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
