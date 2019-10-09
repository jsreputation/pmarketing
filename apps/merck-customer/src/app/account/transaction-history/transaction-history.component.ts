import { Component, OnInit } from '@angular/core';
import { PageAppearence, PageProperties, BarSelectedItem } from '../../page-properties';
import { Observable, of } from 'rxjs';
import {LoyaltyService, ITransactionHistory} from '@perx/core';

@Component({
  selector: 'mc-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit, PageAppearence {

  public transactions: Observable<ITransactionHistory[]>;

  constructor(private loyaltyService: LoyaltyService) { }

  public ngOnInit(): void {
    this.loyaltyService.getTransactionHistory().subscribe(
        (transactions: ITransactionHistory[]) => this.transactions = of(transactions),
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
