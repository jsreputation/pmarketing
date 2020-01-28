import {
  Component,
  OnInit,
} from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';

import { BehaviorSubject, Observable } from 'rxjs';
import {
  map,
  scan,
} from 'rxjs/operators';
import {
  LoyaltyService,
  ITransaction, ConfigService, IConfig,
} from '@perx/core';
import {IAbensonConfig} from '../../../model/IAbenson.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  public transactions$: Observable<ITransaction[]>;
  private transactions: BehaviorSubject<ITransaction[]> = new BehaviorSubject<ITransaction[]>([]);
  public priceLabelFn: (tr: ITransaction) => string;
  public membershipId: number;
  public transactionsLoaded: boolean = false;
  public transactionsEnded: boolean = false;
  private loyaltyId?: number = undefined;
  private activeTabId: number = 0;
  private transactionsPageId: number = 1;
  private tabsId: any = {
    MyCard: 0,
    History: 1,
  };
  public brandingImg: string;

  constructor(
    private loyaltyService: LoyaltyService,
    private configService: ConfigService
  ) {
    this.transactions$ = this.transactions.asObservable().pipe(
      scan((acc, curr) => [...acc, ...curr ? curr : []], [])
    );
  }

  public ngOnInit(): void {
    this.loyaltyService.getLoyalties().pipe(
      map(loyalties => loyalties && loyalties.length && loyalties[0])
    ).subscribe((loyalty) => {
      if (loyalty) {
        this.loyaltyId = loyalty.id;
        this.membershipId = parseInt(loyalty.membershipIdentifier || '0', 10);
      }
      this.priceLabelFn = (tr: ITransaction) => `Points ${tr.points < 0 ? 'spent' : 'earned'}`;
      this.getTransactions();
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
