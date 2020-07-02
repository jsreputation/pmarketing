import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable, forkJoin, of, iif } from 'rxjs';

import {
  LoyaltyService,
  ILoyaltyTransactionHistory,
  IRewardTransactionHistory,
  // IPurchaseTransactionHistory,
  TransactionPipe,
  ILoyalty,
  TransactionsService,
  ITransaction,
  // ILoyaltyTransactionProperties
} from '@perxtech/core';
import { oc } from 'ts-optchain';
import {
  map,
} from 'rxjs/operators';

// import { ShowTitleInHeader } from '../layout/layout.component';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit/*, ShowTitleInHeader */ {
  public transactions: Observable<ILoyaltyTransactionHistory[] | ITransaction[]>;
  public purchasesTitleFn: (tr: ILoyaltyTransactionHistory | ITransaction) => string;
  public redemptionsTitleFn: (tr: ILoyaltyTransactionHistory) => string;
  public descFn: (tr: ILoyaltyTransactionHistory | ITransaction) => string;
  public subTitleFn: (tr: ILoyaltyTransactionHistory | ITransaction) => string;
  public priceLabelFn: (tr: ILoyaltyTransactionHistory | ITransaction) => string;

  private pageNumber: number = 2;
  private pageSize: number = 25;
  private complitePagination: boolean = false;
  public isPremiumMember: boolean = false;

  constructor(
    private loyaltyService: LoyaltyService,
    private transactionsService: TransactionsService,
    private transactionPipe: TransactionPipe,
    // private cashbackTransactionPipe: CashbackTransactionPipe,
    private datePipe: DatePipe
  ) { }

  public ngOnInit(): void {

    // if premium member hide stuff.
    this.loyaltyService.getLoyalties().pipe(
      map( (loyalties: ILoyalty[]) => loyalties[0]),
      map((loyalty: ILoyalty) => {
        if (loyalty && loyalty.tiers) {
          this.isPremiumMember = loyalty.tiers.filter((tier) => tier.name === 'Premium').length > 0;
          this.transactions = iif(() => this.isPremiumMember,
            this.transactionsService.getTransactions(this.pageNumber - 1, this.pageSize),
            this.loyaltyService.getTransactionHistory(this.pageNumber - 1, this.pageSize)
          );
        }
      })
    ).subscribe(() => {
      if (this.isPremiumMember) {
        this.priceLabelFn = (tr: ITransaction) => `${tr.currency ? tr.currency : 'MYR'}${tr.amount}`;
        this.descFn = (tr: ITransaction) => {
          let text = '';
          const properties = oc(tr).properties();
          if (properties) {
            text = properties.invoiceNumber ? `Invoice: ${properties.invoiceNumber}` : '';
          }
          return text;
        };
        this.purchasesTitleFn = (tr: ITransaction) => `${tr.properties.productName}`;
      } else {
        this.priceLabelFn = (tr: ILoyaltyTransactionHistory) => `${this.transactionPipe.transform(tr.pointsAmount || 0)}`;
        this.descFn = (tr: ILoyaltyTransactionHistory) => {
          let text = '';
          const properties = oc(tr).transactionDetails.data.properties();
          if (properties) {
            text = properties.invoiceNumber ? `Invoice: ${properties.invoiceNumber}` : '';
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

    this.subTitleFn = (tr: ILoyaltyTransactionHistory | ITransaction) => `${this.datePipe.transform(tr.transactedAt, 'dd/MM/yyyy')}`;
  }

  public onScroll(): void {
    if (this.complitePagination) {
      return;
    }
    forkJoin(this.transactions,
      iif(() => this.isPremiumMember,
        this.transactionsService.getTransactions(this.pageNumber, this.pageSize),
        this.loyaltyService.getTransactionHistory(this.pageNumber, this.pageSize)))
      .subscribe((val) => {
        if (val[1].length < this.pageSize) {
          this.complitePagination = true;
        }
        this.transactions = of([...val[0], ...val[1]]) as any;
      });
    this.pageNumber++;
  }

  // public getTitle(): string {
  //   return 'Transaction History';
  // }
}
