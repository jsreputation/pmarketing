import {
  Component,
  OnInit,
} from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  map,
  scan,
} from 'rxjs/operators';
import {
  LoyaltyService,
  ILoyaltyTransaction, ILoyalty, ConfigService, IConfig,
} from '@perxtech/core';
import { IAbensonConfig } from '../../../model/IAbenson.model';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  public transactions$: Observable<ILoyaltyTransaction[]>;
  private transactions: BehaviorSubject<ILoyaltyTransaction[]> = new BehaviorSubject<ILoyaltyTransaction[]>([]);
  public priceLabelFn: (tr: ILoyaltyTransaction) => Observable<string>;
  public membershipId: number;
  public transactionsLoaded: boolean = false;
  public transactionsEnded: boolean = false;
  private loyaltyId?: number = undefined;
  // private loyaltyCurrency?: string = undefined;
  private activeTabId: number = 0;
  private transactionsPageId: number = 1;
  private tabsId: any = {
    MyCard: 0,
    History: 1,
  };
  public brandingImg: string;
  public subTitleFn: (loyalty: ILoyalty) => Observable<string>;
  public summaryExpiringFn: (loyalty: ILoyalty) => Observable<string>;
  public skuFn: (tr: ILoyaltyTransaction) => Observable<{
    sku: string | undefined;
    qty: string | undefined,
    untprc: string | undefined;
  }>;

  constructor(
    private loyaltyService: LoyaltyService,
    private configService: ConfigService,
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe) {
    this.transactions$ = this.transactions.asObservable().pipe(
      scan((acc, curr) => [...acc, ...curr ? curr : []], [])
    );
    // AB-599: returns rounded down result for points balance / currency rate
    const getBalance = (loyalty: ILoyalty) =>
      Math.floor(loyalty.pointsBalance / (loyalty.pointsToCurrencyRate ? loyalty.pointsToCurrencyRate : 1));
    this.subTitleFn = (loyalty: ILoyalty) => of(`Equivalent to ${this.currencyPipe.transform(getBalance(loyalty), loyalty.currency, 'symbol-narrow', '1.0-0', 'en-PH')} e-Cash`);
    this.summaryExpiringFn = () => of(`Your total points as of ${this.datePipe.transform(new Date(), 'mediumDate')}`);
  }

  public ngOnInit(): void {
    this.loyaltyService.getLoyalties().pipe(
      map(loyalties => loyalties && loyalties.length && loyalties[0])
    ).subscribe((loyalty) => {
      if (loyalty) {
        this.loyaltyId = loyalty.id;
        // this.loyaltyCurrency = loyalty.currency;
        this.membershipId = parseInt(loyalty.membershipIdentifier || '0', 10);
      }
      this.priceLabelFn = (tr: ILoyaltyTransaction) => of(`Points ${tr.points < 0 ? 'spent' : 'earned'}`);
      this.getTransactions();

      // this.skuFn = (tr: ILoyaltyTransaction) => of({
      //   sku: tr.sku ? `sku${tr.sku}` : undefined,
      //   qty: tr.quantity ? (parseInt(tr.quantity, 10) > 1 ? `${tr.quantity} items` : `${tr.quantity} item`) : undefined,
      //   untprc: tr.purchaseAmount ?
      //     `${this.currencyPipe.transform(tr.purchaseAmount, this.loyaltyCurrency, 'symbol-narrow', '1.0-0', 'en-PH')}` : undefined
      // });
      this.skuFn = () => of({
        sku: undefined,
        qty: undefined,
        untprc: undefined
      });
    });

    this.configService.readAppConfig<IAbensonConfig>().subscribe((config: IConfig<IAbensonConfig>) => {
      this.brandingImg = config.custom && config.custom.cardBrandingImage ? config.custom.cardBrandingImage : '';
    });
  }

  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.activeTabId = tabChangeEvent.index;
  }

  public onScroll(): void {
    if (this.activeTabId === this.tabsId.History && !this.transactionsEnded) {
      this.transactionsPageId++;
      this.getTransactions();
    }
  }

  private getTransactions(): void {
    this.transactionsLoaded = false;
    if (!this.loyaltyId) {
      return;
    }
    this.loyaltyService.getTransactions(this.loyaltyId, this.transactionsPageId)
      .subscribe((transactions) => {
        transactions = transactions && transactions.length ? transactions.filter(tr => tr.points > 0) : [];
        this.transactions.next(transactions);
        this.transactionsLoaded = true;
        if (transactions && transactions.length < 3) {
          this.transactionsEnded = true;
        }
      });
  }
}
