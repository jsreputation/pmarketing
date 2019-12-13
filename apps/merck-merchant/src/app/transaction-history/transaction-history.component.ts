import { Component, OnInit } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { Observable, of } from 'rxjs';
import {
  TransactionPipe,
  IMerchantAdminService,
  IMerchantTransactionHistory,
  IMerchantPurchaseTransactionHistory,
  IMerchantRewardTransactionHistory
} from '@perx/core';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit {
  public transactions: Observable<IMerchantTransactionHistory[]>;
  public purchasesTitleFn: (tr: IMerchantTransactionHistory) => string;
  public redemptionsTitleFn: (tr: IMerchantTransactionHistory) => string;
  public descFn: (tr: IMerchantTransactionHistory) => string;
  public subTitleFn: (tr: IMerchantTransactionHistory) => string;
  public priceLabelFn: (tr: IMerchantTransactionHistory) => string;

  constructor(
    private location: Location,
    private datePipe: DatePipe,
    private transactionPipe: TransactionPipe,
    private merchantAdminService: IMerchantAdminService
  ) { }

  public ngOnInit(): void {
    this.purchasesTitleFn = (tr: IMerchantTransactionHistory) =>
    `${tr.transactionDetails && (tr.transactionDetails.data as IMerchantPurchaseTransactionHistory).pharmacyName}`;

    this.redemptionsTitleFn = (tr: IMerchantTransactionHistory) =>
      `${tr.transactionDetails && (tr.transactionDetails.data as IMerchantRewardTransactionHistory).rewardName}`;

    this.descFn = (tr: IMerchantTransactionHistory) =>
      `${tr.transactionDetails && (tr.transactionDetails.data as IMerchantPurchaseTransactionHistory).productName}`;

    this.subTitleFn = (tr: IMerchantTransactionHistory) => `${this.datePipe.transform(tr.transactedAt, 'dd/MM/yyyy')}`;
    this.priceLabelFn = (tr: IMerchantTransactionHistory) => `${this.transactionPipe.transform(tr.pointsAmount || 0)}`;

    this.merchantAdminService.getTransactionHistory().subscribe(
      (transactions: IMerchantTransactionHistory[]) => this.transactions = of(transactions),
      (err) => console.log(err)
    );
  }

  public onLeftActionClick(): void {
    this.location.back();
  }
}
