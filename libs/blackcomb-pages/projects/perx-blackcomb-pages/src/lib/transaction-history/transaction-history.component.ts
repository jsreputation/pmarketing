import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable, forkJoin, of } from 'rxjs';

import {
  LoyaltyService,
  ILoyaltyTransactionHistory,
  IRewardTransactionHistory,
  SettingsService,
  IFlags,
} from '@perxtech/core';
import { oc } from 'ts-optchain';
import { map } from 'rxjs/operators';

@Component({
  selector: 'perx-blackcomb-pages-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit/*, ShowTitleInHeader */ {
  public transactions: Observable<ILoyaltyTransactionHistory[]>;
  public purchasesTitleFn: (tr: ILoyaltyTransactionHistory) => Observable<string>;
  public redemptionsTitleFn: (tr: ILoyaltyTransactionHistory) => Observable<string>;
  public descFn: (tr: ILoyaltyTransactionHistory) => Observable<string>;
  public subTitleFn: (tr: ILoyaltyTransactionHistory) => Observable<string>;
  public priceLabelFn: (tr: ILoyaltyTransactionHistory) => Observable<string>;

  private pageNumber: number = 2;
  private pageSize: number = 10;
  private complitePagination: boolean = false;
  constructor(
    private loyaltyService: LoyaltyService,
    private translate: TranslateService,
    private settingsService: SettingsService,
    private datePipe: DatePipe
  ) { }

  public ngOnInit(): void {
    this.transactions = this.loyaltyService.getTransactionHistory(this.pageNumber - 1, this.pageSize);
    this.settingsService.getRemoteFlagsSettings().subscribe((flags: IFlags) => {
      if (flags.rebateDemoFlow) {
        this.priceLabelFn = (tr: ILoyaltyTransactionHistory) => this.translate.get(['WALLET.CASHBACK_EARNED', 'WALLET.CASHBACK_SPENT']).pipe(
          map(res => {
            let cashbackSpentTxt = res['WALLET.CASHBACK_EARNED'];
            let cashbackEarnedTxt = res['WALLET.CASHBACK_SPENT'];
            const value = tr.pointsAmount || 0;
            const absVal = String(Math.abs(value));
            return value < 0 ? cashbackSpentTxt.replace('{points}', absVal) : cashbackEarnedTxt.replace('{points}', absVal);
          })
        );
        this.descFn = (tr: ILoyaltyTransactionHistory) => {
          let text = '';
          const properties = oc(tr).transactionDetails.data.properties();
          if (properties) {
            text = properties.storeName ? `${properties.storeName}` : '';
          }
          return of(text);
        };
        this.purchasesTitleFn = (tr: ILoyaltyTransactionHistory) => {
          let text = '';
          const properties = oc(tr).transactionDetails.data.properties();
          if (properties) {
            text = properties.storeCode ? properties.storeCode : '';
          }
          return of(text);
        };
      } else {
        this.priceLabelFn = (tr: ILoyaltyTransactionHistory) => this.translate.get(['WALLET.POINT_EARNED', 'WALLET.POINT_SPENT']).pipe(
          map(res => {
            let pointSpentTxt = res['WALLET.POINT_EARNED'];
            let pointEarnedTxt = res['WALLET.POINT_SPENT'];
            const value = tr.pointsAmount || 0;
            const absVal = String(Math.abs(value));
            return value < 0 ? pointSpentTxt.replace('{points}', absVal) : pointEarnedTxt.replace('{points}', absVal);
          })
        );
        this.descFn = (tr: ILoyaltyTransactionHistory) => {
          let text = '';
          const properties = oc(tr).transactionDetails.data.properties();
          if (properties) {
            text = properties.storeName ? properties.storeName : '';
          }
          return of(text);
        };
        this.purchasesTitleFn = (tr: ILoyaltyTransactionHistory) => {
          let text = '';
          const properties = oc(tr).transactionDetails.data.properties();
          if (properties) {
            text = properties.productName ? properties.productName : '';
          }
          return of(text);
        };
      }
    });

    this.redemptionsTitleFn = (tr: ILoyaltyTransactionHistory) =>
      of(`${(tr.transactionDetails && tr.transactionDetails.data) ?
        (tr.transactionDetails.data as IRewardTransactionHistory).rewardName : ''}`);

    this.subTitleFn = (tr: ILoyaltyTransactionHistory) => of(`${this.datePipe.transform(tr.transactedAt, 'dd/MM/yyyy')}`);
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
}
