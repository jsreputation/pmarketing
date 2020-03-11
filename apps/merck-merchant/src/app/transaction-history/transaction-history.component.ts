import { Component, OnInit } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { Observable, of } from 'rxjs';
import {
  TransactionPipe,
  IMerchantAdminService,
  IMerchantTransactionHistory,
  IMerchantPurchaseTransactionHistory,
  IMerchantRewardTransactionHistory
} from '@perxtech/core';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit {
  public purchaseTransactions: Observable<IMerchantPurchaseTransactionHistory[]>;
  public rewardTransactions: Observable<IMerchantRewardTransactionHistory[]>;
  public salesTitleFn: (tr: IMerchantPurchaseTransactionHistory) => string;
  public salesDescFn: (tr: IMerchantTransactionHistory) => string;
  public salesSubTitleFn: (tr: IMerchantTransactionHistory) => string;
  public salespriceLabelFn: (tr: IMerchantTransactionHistory) => string;
  public redemptionsTitleFn: (tr: IMerchantRewardTransactionHistory) => string;
  public redemptionsSubTitleFn: (tr: IMerchantRewardTransactionHistory) => string;
  public redemptionsPriceLabelFn: (tr: IMerchantRewardTransactionHistory) => string;

  constructor(
    private location: Location,
    private datePipe: DatePipe,
    private transactionPipe: TransactionPipe,
    private merchantAdminService: IMerchantAdminService
  ) { }

  public ngOnInit(): void {
    this.salesTitleFn = (tr: IMerchantPurchaseTransactionHistory) =>
      `${tr.pharmacyName}`;
    this.salesDescFn = (tr: IMerchantPurchaseTransactionHistory) =>
      `${tr.productName}`;
    this.salesSubTitleFn = (tr: IMerchantPurchaseTransactionHistory) =>
      `${this.datePipe.transform(tr.transactionDate, 'dd/MM/yyyy')}`;
    this.salespriceLabelFn = (tr: IMerchantPurchaseTransactionHistory) =>
      `${this.transactionPipe.transform(tr.pointsIssued || 0)}`;

    this.redemptionsTitleFn = (tr: IMerchantRewardTransactionHistory) =>
      `${tr.rewardName}`;
    this.redemptionsSubTitleFn = (tr: IMerchantRewardTransactionHistory) =>
      `${this.datePipe.transform(tr.issuedDate, 'dd/MM/yyyy')}`;
    this.redemptionsPriceLabelFn = (tr: IMerchantRewardTransactionHistory) =>
      `${tr.customerName}`;

    this.merchantAdminService.getTransactionHistory().subscribe(
      (transactions: IMerchantPurchaseTransactionHistory[]) => this.purchaseTransactions = of(transactions),
      (err) => console.log(err)
    );
    this.merchantAdminService.getRewardTransactionHistory().subscribe(
      (transactions: IMerchantRewardTransactionHistory[]) => this.rewardTransactions = of(transactions),
      (err) => console.log(err)
    );
  }

  public onLeftActionClick(): void {
    this.location.back();
  }
}
