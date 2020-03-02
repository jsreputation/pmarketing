import {
  OnInit
} from '@angular/core';

import { Observable } from 'rxjs';

import {
  ITransaction,
  ILoyalty
} from '@perx/core';


export class CardComponentMock implements OnInit {
  public transactions$: Observable<ITransaction[]>;
  public priceLabelFn: (tr: ITransaction) => string;
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
