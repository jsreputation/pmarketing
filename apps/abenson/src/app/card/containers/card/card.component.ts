import { Component, OnInit } from '@angular/core';
import { LoyaltyService, ITransaction } from '@perx/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  public transactions: Observable<ITransaction[]>;
  public priceLabelFn: (tr: ITransaction) => string;
  public membershipId: number;
  public loyaltyId: number = null;

  constructor(private loyaltyService: LoyaltyService) { }

  public ngOnInit(): void {
    this.loyaltyService.getLoyalties().pipe(
      map(loyalties => loyalties && loyalties.length > 0 && loyalties[0])
    ).subscribe( (loyalty) => {
      this.loyaltyId = loyalty.id;
      this.membershipId = +loyalty.membershipIdentifier;
      this.transactions = this.loyaltyService.getTransactions(this.loyaltyId, 1, 3);
      this.priceLabelFn = (tr: ITransaction) => `Points ${tr.points < 0 ? 'spent' : 'earned'}`;
    });
  }

  public transactionsScrolled(): void {
    console.log('transactionsScrolled!!');
  }
}
