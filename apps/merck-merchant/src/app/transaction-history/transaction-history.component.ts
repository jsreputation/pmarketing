import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { Observable, of, forkJoin } from 'rxjs';
import {
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
  private pointsEarnedTxt: string;
  private pointsSpentTxt: string;

  private pageNumberPurchase: number = 1;
  private pageSizePurchase: number = 10;
  private complitePaginationPurchase: boolean = false;

  private pageNumberReward: number = 1;
  private pageSizeReward: number = 10;
  private complitePaginationReward: boolean = false;
  private currentSelectedLanguage: string = 'en';

  constructor(
    private location: Location,
    private datePipe: DatePipe,
    private merchantAdminService: IMerchantAdminService,
    private translate: TranslateService
  ) {
    this.translate.get(['POINT_EARNED', 'POINT_SPENT']).subscribe((res: any) => {
      this.pointsEarnedTxt = res.POINT_EARNED;
      this.pointsSpentTxt = res.POINT_SPENT;
    });
  }

  public ngOnInit(): void {
    this.currentSelectedLanguage = this.translate.currentLang || this.translate.defaultLang;
    this.salesTitleFn = (tr: IMerchantPurchaseTransactionHistory) =>
      `${tr.pharmacyName}`;
    this.salesDescFn = (tr: IMerchantPurchaseTransactionHistory) =>
      `${tr.productName}`;
    this.salesSubTitleFn = (tr: IMerchantPurchaseTransactionHistory) =>
      `${this.datePipe.transform(tr.transactionDate, 'dd/MM/yyyy')}`;
    this.salespriceLabelFn = (tr: IMerchantPurchaseTransactionHistory) => {
      const value = tr.pointsIssued || 0;
      const absVal = String(Math.abs(value));
      return value < 0 ? this.pointsSpentTxt.replace('{points}', absVal) : this.pointsEarnedTxt.replace('{points}', absVal);
    };

    this.redemptionsTitleFn = (tr: IMerchantRewardTransactionHistory) =>
      `${tr.rewardName}`;
    this.redemptionsSubTitleFn = (tr: IMerchantRewardTransactionHistory) =>
      `${this.datePipe.transform(tr.issuedDate, 'dd/MM/yyyy')}`;
    this.redemptionsPriceLabelFn = (tr: IMerchantRewardTransactionHistory) =>
      `${tr.customerName}`;

    this.merchantAdminService.getTransactionHistory(this.pageNumberPurchase, this.pageSizePurchase).subscribe(
      (transactions: IMerchantPurchaseTransactionHistory[]) => this.purchaseTransactions = of(transactions),
      (err) => console.log(err)
    );
    this.merchantAdminService.getRewardTransactionHistory(this.pageNumberReward, this.pageSizeReward).subscribe(
      (transactions: IMerchantRewardTransactionHistory[]) => this.rewardTransactions = of(transactions),
      (err) => console.log(err)
    );
  }

  public onLeftActionClick(): void {
    this.location.back();
  }

  public onScroll(page: string): void {
    switch (page) {
      case 'purchase':
        this.getNextPurchasePage();
        break;
      case 'rewards':
        this.getNextRewardPage();
        break;
    }
  }

  private getNextPurchasePage(): void {
    if (this.complitePaginationPurchase) {
      return;
    }
    forkJoin(
      this.purchaseTransactions,
      this.merchantAdminService.getTransactionHistory(this.pageNumberPurchase, this.pageSizePurchase, this.currentSelectedLanguage)
    ).subscribe((val) => {
      if (val[1].length < this.pageSizePurchase) {
        this.complitePaginationPurchase = true;
      }
      this.purchaseTransactions = of([...val[0], ...(val[1] as IMerchantPurchaseTransactionHistory[])]);
    });
    this.pageNumberPurchase++;
  }

  private getNextRewardPage(): void {
    if (this.complitePaginationReward) {
      return;
    }
    forkJoin(
      this.rewardTransactions,
      this.merchantAdminService.getRewardTransactionHistory(this.pageNumberReward, this.pageSizeReward, this.currentSelectedLanguage)
    ).subscribe((val) => {
      if (val[1].length < this.pageSizeReward) {
        this.complitePaginationReward = true;
      }
      this.rewardTransactions = of([...val[0], ...val[1]]);
    });
    this.pageNumberReward++;
  }

}
