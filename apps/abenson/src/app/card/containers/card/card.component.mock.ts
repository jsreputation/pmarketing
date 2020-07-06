import {
  OnInit
} from '@angular/core';

import { Observable } from 'rxjs';

import {
  ILoyaltyTransaction,
  ILoyalty
} from '@perxtech/core';


export class CardComponentMock implements OnInit {
  public transactions$: Observable<ILoyaltyTransaction[]>;
  public priceLabelFn: (tr: ILoyaltyTransaction) => string;
  public membershipId: number;
  public transactionsLoaded: boolean = false;
  public transactionsEnded: boolean = false;

  public brandingImg: string;
  public subTitleFn: (loyalty: ILoyalty) => string;
  public summaryExpiringFn: (loyalty: ILoyalty) => string;

  public ngOnInit(): void {
    this.getTransactions();
  }

  public tabChanged(): void {
  }

  public onScroll(): void {
  }

  private getTransactions(): void {
  }
}
