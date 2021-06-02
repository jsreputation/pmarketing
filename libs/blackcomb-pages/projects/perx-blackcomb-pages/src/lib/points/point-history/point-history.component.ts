import { Component, OnInit } from '@angular/core';
import { ILoyaltyTransactionHistory, LoyaltyService } from '@perxtech/core';
@Component({
  selector: 'points-history',
  templateUrl: './point-history.component.html',
  styleUrls: ['./point-history.component.scss']
})
export class PointHistoryComponent implements OnInit {

  public transactions: ILoyaltyTransactionHistory[];
  private pageNumber: number = 2;
  private paginationComplete: boolean = false;

  constructor(private loyaltyService: LoyaltyService) { }

  public ngOnInit(): void {
    this.loyaltyService.getTransactionHistory().subscribe((transactions) => this.transactions = transactions);
  }

  public onScroll(): void {
    // do nothing on scroll if we've arleady fetched all transactions
    if (this.paginationComplete) {
      return;
    }

    this.loyaltyService.getTransactionHistory(this.pageNumber).subscribe((transactions) => {
      if (transactions.length) {
        // if we have new transactions, add to existing list of transactions
        this.transactions = [...this.transactions, ...transactions];
        this.pageNumber++;
      } else {
        // mark pagination ended if no transactions are retuned
        this.paginationComplete = true;
      }
    });
  }
}
