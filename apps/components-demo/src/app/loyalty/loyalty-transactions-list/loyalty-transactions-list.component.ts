import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITransaction, LoyaltyService } from '@perx/core';

@Component({
  selector: 'app-loyalty-transactions-list',
  templateUrl: './loyalty-transactions-list.component.html',
  styleUrls: ['./loyalty-transactions-list.component.scss']
})
export class LoyaltyTransactionsListComponent implements OnInit {
  public transactions: Observable<ITransaction> | undefined;

  constructor(private loyaltyService: LoyaltyService) { }

  public ngOnInit(): void {
    this.loyaltyService.getAllTransactions().subscribe(
        (transactions) => this.transactions = of(transactions),
        () => this.transactions = of(mockTransactions)
      );
  }
}
