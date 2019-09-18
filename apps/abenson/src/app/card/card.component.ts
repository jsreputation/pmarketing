import { Component, OnInit } from '@angular/core';
import { LoyaltyService, ITransaction } from '@perx/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  public transactions: Observable<ITransaction[]>;
  public priceLabelFn: (tr: ITransaction) => string;

  constructor(private loyaltyService: LoyaltyService) { }

  public ngOnInit(): void {
    this.transactions = this.loyaltyService.getAllTransactions();

    this.priceLabelFn = (tr: ITransaction) => `Points ${tr.points < 0 ? 'spent' : 'earned'}`;
  }
}
