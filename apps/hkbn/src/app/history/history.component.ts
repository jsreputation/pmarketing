import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ITransaction, LoyaltyService } from '@perx/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'hkbn-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  public accrued: Observable<ITransaction[]>;
  public redeemed: Observable<ITransaction[]>;
  private transactions: Observable<ITransaction[]>;

  constructor(private loyaltyService: LoyaltyService) { }

  public ngOnInit(): void {
    this.transactions = this.loyaltyService.getAllTransactions();
    this.accrued = this.transactions.pipe(
      map((transactions: ITransaction[]) => transactions.filter(transaction => transaction.pointsBalance > 0))
    );
    this.redeemed = this.transactions.pipe(
      map((transactions: ITransaction[]) => transactions.filter(transaction => transaction.pointsBalance <= 0))
    );
  }
}
