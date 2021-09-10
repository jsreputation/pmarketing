import { TranslateService } from '@ngx-translate/core';
import { OnInit, Component } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { Observable, of, forkJoin } from 'rxjs';
import {
  IMerchantAdminService,
  IMerchantTransactionHistory,
  IMerchantPurchaseTransactionHistory,
  IMerchantRewardTransactionHistory,
  ConfigService, ITheme, ThemesService
} from '@perxtech/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit {
  public purchaseTransactions: Observable<IMerchantPurchaseTransactionHistory[]>;
  public rewardTransactions: Observable<IMerchantRewardTransactionHistory[]>;
  public salesTitleFn: (tr: IMerchantPurchaseTransactionHistory) => Observable<string>;
  public salesDescFn: (tr: IMerchantTransactionHistory) => Observable<string>;
  public salesSubTitleFn: (tr: IMerchantTransactionHistory) => Observable<string>;
  public salespriceLabelFn: (tr: IMerchantTransactionHistory) => Observable<string>;
  public redemptionsTitleFn: (tr: IMerchantRewardTransactionHistory) => Observable<string>;
  public redemptionsSubTitleFn: (tr: IMerchantRewardTransactionHistory) => Observable<string>;
  public redemptionsPriceLabelFn: (tr: IMerchantRewardTransactionHistory) => Observable<string>;
  public salesTxt: string;
  public redemptionTxt: string;
  private pageNumberPurchase: number = 2;
  private pageSizePurchase: number = 10;
  private complitePaginationPurchase: boolean = false;
  private pageNumberReward: number = 2;
  private pageSizeReward: number = 10;
  private complitePaginationReward: boolean = false;
  private currentSelectedLanguage: string = 'en';
  public theme: ITheme;

  constructor(
    private location: Location,
    private datePipe: DatePipe,
    private merchantAdminService: IMerchantAdminService,
    private translate: TranslateService,
    protected configService: ConfigService,
    private themesService: ThemesService,
  ) { }

  public ngOnInit(): void {
    // MER-262: ensures config is ready before initing component
    this.configService
      .readAppConfig<void>()
      .subscribe(
        () => this.initComponent(),
        (error) => {
          console.error(error);
        }
      );
    this.themesService.getThemeSetting().subscribe((theme) => {
      this.theme = theme;
    });
  }

  private initComponent(): void {
    this.currentSelectedLanguage = this.translate.currentLang || this.translate.defaultLang;
    this.initTranslate();
    this.salesTitleFn = (tr: IMerchantPurchaseTransactionHistory) =>
      of(`${tr.pharmacyName}`);
    this.salesDescFn = (tr: IMerchantPurchaseTransactionHistory) =>
      of(`${tr.productName}`);
    this.salesSubTitleFn = (tr: IMerchantPurchaseTransactionHistory) =>
      of(`${this.datePipe.transform(tr.transactionDate, 'dd/MM/yyyy')}`);
    this.redemptionsTitleFn = (tr: IMerchantRewardTransactionHistory) =>
      of(`${tr.rewardName}`);
    this.redemptionsSubTitleFn = (tr: IMerchantRewardTransactionHistory) =>
      of(`${this.datePipe.transform(tr.issuedDate, 'dd/MM/yyyy')}`);
    this.redemptionsPriceLabelFn = (tr: IMerchantRewardTransactionHistory) =>
      of(`${tr.customerName}`);
    this.merchantAdminService.getTransactionHistory(this.pageNumberPurchase - 1, this.pageSizePurchase).subscribe(
      (transactions: IMerchantPurchaseTransactionHistory[]) => this.purchaseTransactions = of(transactions),
      (err) => console.log(err)
    );
    this.merchantAdminService.getRewardTransactionHistory(this.pageNumberReward - 1, this.pageSizeReward).subscribe(
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
    forkJoin([
      this.purchaseTransactions,
      this.merchantAdminService.getTransactionHistory(this.pageNumberPurchase, this.pageSizePurchase, this.currentSelectedLanguage)
    ]).subscribe((val) => {
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
    forkJoin([
      this.rewardTransactions,
      this.merchantAdminService.getRewardTransactionHistory(this.pageNumberReward, this.pageSizeReward, this.currentSelectedLanguage)
    ]).subscribe((val) => {
      if (val[1].length < this.pageSizeReward) {
        this.complitePaginationReward = true;
      }
      this.rewardTransactions = of([...val[0], ...val[1]]);
    });
    this.pageNumberReward++;
  }

  private initTranslate(): void {
    this.translate.get(['SALES_TXT', 'REDEMPTION_TXT']).subscribe((res: any) => {
      this.salesTxt = res.SALES_TXT;
      this.redemptionTxt = res.REDEMPTION_TXT;
    });
    this.salespriceLabelFn = (tr: IMerchantPurchaseTransactionHistory) =>
      this.translate.get(['TRANSACTION_HISTORY.POINT_EARNED', 'TRANSACTION_HISTORY.POINT_SPENT']).pipe(
        map(res => {
          const pointsSpentTxt = res['TRANSACTION_HISTORY.POINT_SPENT'];
          const pointsEarnedTxt = res['TRANSACTION_HISTORY.POINT_EARNED'];
          const value = tr.pointsIssued || 0;
          const absVal = String(Math.abs(value));
          return value < 0 ? pointsSpentTxt.replace('{points}', absVal) : pointsEarnedTxt.replace('{points}', absVal);
        })
      );
  }

}
