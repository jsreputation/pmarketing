import { Component, OnInit } from '@angular/core';
import { PageAppearence, PageProperties, BarSelectedItem } from '../../page-properties';
import { Observable, of } from 'rxjs';
import {ILoyalty, ITransaction, LoyaltyService} from '@perx/core';
import {mergeMap} from 'rxjs/operators';

@Component({
  selector: 'mc-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit, PageAppearence {

  public transactions: Observable<ITransaction[]>;

  constructor(private loyaltyService: LoyaltyService) { }

  public ngOnInit(): void {
    this.loyaltyService.getLoyalty().pipe(
      mergeMap((loyalty: ILoyalty) => this.loyaltyService.getAllTransactions(loyalty.id))
    ).subscribe(
        (transactions) => this.transactions = of(transactions),
        (err) => console.log(err)
      );
  }

  public getPageProperties(): PageProperties {
    return {
      header: true,
      backButtonEnabled: true,
      bottomSelectedItem: BarSelectedItem.ACCOUNT,
      pageTitle: 'Transaction History'
    };
  }
}
