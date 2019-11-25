import { Component, OnInit } from '@angular/core';
import {DatePipe} from '@angular/common';
import { Observable } from 'rxjs';

import {
  LoyaltyService,
  ITransactionHistory,
  IRewardTransactionHistory,
  IPurchaseTransactionHistory,
  TransactionPipe
} from '@perx/core';

@Component({
  selector: 'perx-blackcomb-pages-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit {

  public transactions: Observable<ITransactionHistory[]>;
  public purchasesTitleFn: (tr: ITransactionHistory) => string;
  public redemptionsTitleFn: (tr: ITransactionHistory) => string;
  public descFn: (tr: ITransactionHistory) => string;
  public subTitleFn: (tr: ITransactionHistory) => string;
  public priceLabelFn: (tr: ITransactionHistory) => string;

  constructor(
    private loyaltyService: LoyaltyService,
    private transactionPipe: TransactionPipe,
    private datePipe: DatePipe) {

  }
  public ngOnInit(): void {
    this.transactions = this.loyaltyService.getTransactionHistory();

    this.purchasesTitleFn = (tr: ITransactionHistory) =>
      `${(tr.transactionDetails && tr.transactionDetails.data) ?
        (tr.transactionDetails.data as IPurchaseTransactionHistory).pharmacyName : ''}`;

    this.redemptionsTitleFn = (tr: ITransactionHistory) =>
      `${(tr.transactionDetails && tr.transactionDetails.data) ?
        (tr.transactionDetails.data as IRewardTransactionHistory).rewardName : ''}`;

    this.descFn = (tr: ITransactionHistory) =>
      `${tr.transactionDetails && tr.transactionDetails.data &&
        (tr.transactionDetails.data as IPurchaseTransactionHistory).productName}`;

    this.subTitleFn = (tr: ITransactionHistory) => `${this.datePipe.transform(tr.transactedAt, 'dd/MM/yyyy')}`;
    this.priceLabelFn = (tr: ITransactionHistory) => `${this.transactionPipe.transform(tr.pointsAmount || 0)}`;
  }
}
