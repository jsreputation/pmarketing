import {Component, OnInit} from '@angular/core';
import {PageAppearence, PageProperties, BarSelectedItem} from '../../page-properties';
import {Observable, of} from 'rxjs';
import {
  LoyaltyService,
  ITransactionHistory,
  TransactionPipe,
  IRewardTransactionHistory,
  IPurchaseTransactionHistory
} from '@perx/core';
import {DatePipe} from '@angular/common';

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

  constructor(private loyaltyService: LoyaltyService,
              private datePipe: DatePipe,
              private transactionPipe: TransactionPipe) {
  }

  public ngOnInit(): void {
    this.purchasesTitleFn = (tr: ITransactionHistory) =>
      `${tr.transactionDetails.data && (tr.transactionDetails.data as IPurchaseTransactionHistory).pharmacyName}`;

    this.redemptionsTitleFn = (tr: ITransactionHistory) =>
      `${tr.transactionDetails.data && (tr.transactionDetails.data as IRewardTransactionHistory).rewardName}`;

    this.descFn = (tr: ITransactionHistory) =>
      `${tr.transactionDetails.data && (tr.transactionDetails.data as IPurchaseTransactionHistory).productName}`;

    this.subTitleFn = (tr: ITransactionHistory) => `${this.datePipe.transform(tr.transactedAt, 'dd/MM/yyyy')}`;
    this.priceLabelFn = (tr: ITransactionHistory) => `${this.transactionPipe.transform(tr.pointsAmount)}`;

    this.loyaltyService.getTransactionHistory().subscribe(
      (transactions: ITransactionHistory[]) => this.transactions = of(transactions),
      (err) => console.log(err)
    );
  }

  public getPageProperties(): PageProperties {
    return {
      header: true,
      backButtonEnabled: true,
      bottomSelectedItem: BarSelectedItem.ACCOUNT,
      pageTitle: 'STATIC_TRANSACTION_HISTORY'
    };
  }
}
