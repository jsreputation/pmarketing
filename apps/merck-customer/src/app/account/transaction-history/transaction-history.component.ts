import { Component, OnInit } from '@angular/core';
import { PageAppearence, PageProperties, BarSelectedItem } from '../../page-properties';
import { Observable, of, forkJoin } from 'rxjs';
import {
  LoyaltyService,
  ITransactionHistory,
  IRewardTransactionHistory,
  IPurchaseTransactionHistory
} from '@perxtech/core';
import { DatePipe } from '@angular/common';
import { MatTabChangeEvent } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

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
  private pointsEarnedTxt: string;
  private pointsSpentTxt: string;
  // @ts-ignore
  private labelIndex: number = 0;
  constructor(
    private loyaltyService: LoyaltyService,
    private datePipe: DatePipe,
    private translate: TranslateService
  ) {
    this.translate.get(['TRANSACTION_HISTORY.POINT_EARNED', 'TRANSACTION_HISTORY.POINT_SPENT']).subscribe((res: any) => {
      this.pointsEarnedTxt = res.TRANSACTION_HISTORY && res.TRANSACTION_HISTORY.POINT_EARNED;
      this.pointsSpentTxt = res.TRANSACTION_HISTORY && res.TRANSACTION_HISTORY.POINT_SPENT;
    });
  }

  public ngOnInit(): void {
    this.purchasesTitleFn = (tr: ITransactionHistory) =>
      `${tr.transactionDetails && tr.transactionDetails.data ? (tr.transactionDetails.data as IPurchaseTransactionHistory).pharmacyName : 'no-name'}`;

    this.redemptionsTitleFn = (tr: ITransactionHistory) =>
      `${tr.transactionDetails && (tr.transactionDetails.data as IRewardTransactionHistory).rewardName}`;

    this.descFn = (tr: ITransactionHistory) =>
      `${tr.transactionDetails && tr.transactionDetails.data ? (tr.transactionDetails.data as IPurchaseTransactionHistory).productName : ''}`;

    this.subTitleFn = (tr: ITransactionHistory) => `${this.datePipe.transform(tr.transactedAt, 'dd/MM/yyyy')}`;
    this.priceLabelFn = (tr: ITransactionHistory) => {
      const value = tr.pointsAmount || 0;
      const absVal = String(Math.abs(value));
      return value < 0 ? this.pointsSpentTxt.replace('{points}', absVal) : this.pointsEarnedTxt.replace('{points}', absVal);
    };

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
      pageTitle: 'TRANSACTION_HISTORY'
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
