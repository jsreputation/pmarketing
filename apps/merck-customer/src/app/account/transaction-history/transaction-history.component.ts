import { Component, OnInit } from '@angular/core';
import { PageAppearence, PageProperties, BarSelectedItem } from '../../page-properties';
import { Observable, of } from 'rxjs';
import { ITransaction, LoyaltyService } from '@perx/core';
import { mockLoyalty, mockTransactions } from './loyalty-mock';

@Component({
  selector: 'mc-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit, PageAppearence {

  public transactions: Observable<ITransaction[]>;

  constructor(private loyaltyService: LoyaltyService) { }

  public ngOnInit(): void {
    this.loyaltyService.getAllTransactions(mockLoyalty.id).subscribe(
        (transactions) => this.transactions = of(transactions),
        () => this.transactions = of(mockTransactions)
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
